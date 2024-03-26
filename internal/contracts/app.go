package contracts

import (
	"embed"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
	"gorm.io/gorm"
)

type App struct {
	BotToken string
	Bot      *tgbotapi.BotAPI
	DB       *gorm.DB
	Services *Services
	Web      embed.FS
}
