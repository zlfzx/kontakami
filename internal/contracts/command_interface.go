package contracts

import "kontakami/internal/models"

type CommandService interface {
	GetCommands() (commands []models.Command)
	GetCommand(id int64) (command models.Command)
	GetActiveCommand() (commands []models.Command)
	SaveCommand(command *models.Command) (*models.Command, error)
	UpdateStatus(id int64, status bool) (command models.Command)
	DeleteCommand(id int64) error

	GetInitMessage() (initMessage models.Setting)
	SaveInitMessage(initMessage *models.Setting)
}
