package command

import (
	"kontakami/internal/contracts"
	"kontakami/internal/models"
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

	return command, nil
}

func (s *Service) UpdateStatus(id int64, status bool) (command models.Command) {
	s.DB.First(&command, id)
	command.IsActive = status
	s.DB.Save(&command)

	// command.ID = id
	// s.DB.Model(&command).Update("is_active", status)

	return
}

func (s *Service) DeleteCommand(id int64) error {
	s.DB.Delete(&models.Command{}, id)

	return nil
}
