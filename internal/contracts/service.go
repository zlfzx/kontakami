package contracts

type Services struct {
	Bot        BotService
	Chat       ChatService
	ChatSocket ChatSocketService
	Command    CommandService
	// MessageService MessageService
}
