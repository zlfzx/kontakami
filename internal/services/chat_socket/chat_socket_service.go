package chatsocket

import (
	"context"
	"kontakami/internal/contracts"
	"sync"
	"time"

	"golang.org/x/time/rate"
	"nhooyr.io/websocket"
	"nhooyr.io/websocket/wsjson"
)

// type Subscriber struct {
// 	ID        int64
// 	Message   chan interface{}
// 	CloseSlow func()
// }

type Service struct {
	*contracts.App
	SubscriberMessageBuffer int
	Subscribers             map[*contracts.Subscriber]struct{}
	SubscribersMutex        *sync.Mutex
	PublishLimiter          *rate.Limiter
}

func Init(a *contracts.App) contracts.ChatSocketService {
	s := &Service{
		App:                     a,
		SubscriberMessageBuffer: 16,
		Subscribers:             make(map[*contracts.Subscriber]struct{}),
		SubscribersMutex:        &sync.Mutex{},
		PublishLimiter:          rate.NewLimiter(rate.Every(time.Millisecond*100), 8),
	}

	return s
}

func (s *Service) Subscribe(ctx context.Context, c *websocket.Conn, id int) error {
	ctx = c.CloseRead(ctx)

	sub := &contracts.Subscriber{
		ID:      int64(id),
		Message: make(chan interface{}, s.SubscriberMessageBuffer),
		CloseSlow: func() {
			c.Close(websocket.StatusGoingAway, "server is busy")
		},
	}
	s.addSubscriber(sub)
	defer s.deleteSubscriber(sub)

	for {
		select {
		case msg := <-sub.Message:
			err := wsjson.Write(ctx, c, msg)
			if err != nil {
				return err
			}
		case <-ctx.Done():
			return ctx.Err()
		}
	}
}

func (s *Service) addSubscriber(sub *contracts.Subscriber) {
	s.SubscribersMutex.Lock()
	s.Subscribers[sub] = struct{}{}
	s.SubscribersMutex.Unlock()

	// if the first subscriber, send all chats
	if sub.ID == 0 {
		chats := s.Services.Chat.GetChats()
		s.Publish(sub, chats)
	}
}

func (s *Service) deleteSubscriber(sub *contracts.Subscriber) {
	s.SubscribersMutex.Lock()
	delete(s.Subscribers, sub)
	s.SubscribersMutex.Unlock()
}

func (s *Service) Publish(sub *contracts.Subscriber, msg any) {
	s.SubscribersMutex.Lock()
	defer s.SubscribersMutex.Unlock()

	s.PublishLimiter.Wait(context.Background())

	if sub != nil {
		select {
		case sub.Message <- msg:
		default:
			go sub.CloseSlow()
		}
	} else {
		for sub := range s.Subscribers {
			select {
			case sub.Message <- msg:
			default:
				go sub.CloseSlow()
			}
		}
	}
}
