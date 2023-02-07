package contracts

import (
	"context"

	"nhooyr.io/websocket"
)

type ChatSocketService interface {
	Subscribe(ctx context.Context, c *websocket.Conn, id int) error
	Publish(msg any)
}
