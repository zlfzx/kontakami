package contracts

import "kontakami/internal/models"

type ChatService interface {
	GetChats() (chats []models.Chat)
	GetChat(id int64, withMessage bool) (chat models.Chat)
	SaveMessage(chatID int64, message *models.Message) (*models.Message, error)
	GetMessage(chatID int64) (chat models.Chat)
}
