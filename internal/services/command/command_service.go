package command

import (
	"fmt"
	"kontakami/internal/contracts"
	"kontakami/internal/models"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
)

type Service struct {
	*contracts.App
}

func Init(a *contracts.App) contracts.CommandService {
	return &Service{
		App: a,
	}
}

func (s *Service) GetCommands() (commands []models.Command) {
	s.DB.Find(&commands)
	return
}

func (s *Service) GetCommand(id int64) (command models.Command) {
	s.DB.First(&command, id)
	return
}

func (s *Service) GetActiveCommand() (commands []models.Command) {
	s.DB.Where("is_active = ?", 1).Find(&commands)
	return
}

func (s *Service) SaveCommand(command *models.Command) (*models.Command, error) {
	s.DB.Save(&command)

	go s.setBotCommand()

	return command, nil
}

func (s *Service) UpdateStatus(id int64, status bool) (command models.Command) {
	s.DB.First(&command, id)
	command.IsActive = status
	s.DB.Save(&command)

	go s.setBotCommand()

	// command.ID = id
	// s.DB.Model(&command).Update("is_active", status)

	return
}

func (s *Service) DeleteCommand(id int64) error {
	s.DB.Delete(&models.Command{}, id)

	go s.setBotCommand()

	return nil
}

func (s *Service) setBotCommand() {
	activeCommands := s.GetActiveCommand()

	var commands []tgbotapi.BotCommand
	for _, c := range activeCommands {
		command := tgbotapi.BotCommand{
			Command:     c.Command,
			Description: c.Description,
		}

		commands = append(commands, command)
	}
	_, err := s.Bot.Request(tgbotapi.NewSetMyCommands(commands...))
	if err != nil {
		fmt.Println(err)
	}
}

func (s *Service) GetInitMessage() (initMessage models.Setting) {
	s.DB.First(&initMessage)
	return
}

func (s *Service) SaveInitMessage(initMessage *models.Setting) {
	var setting models.Setting
	s.DB.First(&setting)

	setting.IsInitMessage = initMessage.IsInitMessage
	setting.InitMessage = initMessage.InitMessage

	s.DB.Save(&setting)

	// s.DB.Model(&greeting).Updates(models.Setting{Greeting: greeting.Greeting, GreetingMessage: greeting.GreetingMessage})
}
