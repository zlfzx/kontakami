package contracts

import (
	"kontakami/internal/models"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
)

type BotService interface {
	ReceiveMessage(update *tgbotapi.Update)
	SaveUser(update *tgbotapi.Update) (user models.User)
	SaveChat(update *tgbotapi.Update) (chat models.Chat)
	SaveMessage(userID int64, update *tgbotapi.Update) (message models.Message)
	SendMessage(chatID int64, text string) (int, error)
	GetUserProfilePhoto(userID int64) *string
}
