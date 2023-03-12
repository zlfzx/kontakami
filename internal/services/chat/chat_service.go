package chat

import (
	"errors"
	"kontakami/internal/contracts"
	"kontakami/internal/models"
	"time"

	"gorm.io/gorm"
)

type Service struct {
	*contracts.App
}

func Init(a *contracts.App) (s contracts.ChatService) {
	s = &Service{
		App: a,
	}

	return
}

func (s *Service) GetChats() (chats []models.Chat) {
	s.DB.Preload("Message", func(tx *gorm.DB) *gorm.DB {
		return tx.Order("messages.date ASC")
	}).Order("last_sent DESC").Find(&chats)

	return
}

func (s *Service) GetChat(id int64, withMessage bool) (chat models.Chat) {
	if withMessage {
		s.DB.Preload("Messages", func(tx *gorm.DB) *gorm.DB {
			return tx.Preload("File")
		}).First(&chat, id)
	} else {
		s.DB.First(&chat, id)
	}

	return
}

func (s *Service) SaveMessage(chatID int64, message *models.Message) (*models.Message, error) {
	chat := s.GetChat(chatID, false)

	if chat.ID == 0 {
		return message, errors.New("chat not found")
	}

	if message.Text == "" && message.File == nil {
		return message, errors.New("message text is empty")
	}

	messageID, err := s.Services.Bot.SendMessage(chatID, message)
	if err != nil {
		return message, err
	}

	message.ID = messageID
	message.ChatID = chatID
	message.Date = int(time.Now().Unix())

	s.DB.Create(message)

	return message, nil
}

func (s *Service) GetMessage(chatID int64) (chat models.Chat) {
	s.DB.Preload("Message", func(tx *gorm.DB) *gorm.DB {
		return tx.Order("date ASC")
	}).Where("id = ?", chatID).First(&chat)

	return
}
