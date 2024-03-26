package contracts

type Services struct {
	Bot       BotService
	Chat      ChatService
	WebSocket WebSocketService
	Command   CommandService
	// MessageService MessageService
}
