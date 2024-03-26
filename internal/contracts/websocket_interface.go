package contracts

import (
	"context"

	"nhooyr.io/websocket"
)

type Subscriber struct {
	ID        int64
	Message   chan interface{}
	CloseSlow func()
}

type WebSocketService interface {
	Subscribe(ctx context.Context, c *websocket.Conn, id int) error
	Publish(sub *Subscriber, msg any)
}
