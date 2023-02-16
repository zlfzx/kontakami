package models

type Command struct {
	ID        int64  `json:"id"`
	Command   string `json:"command" gorm:"uniqueIndex;type:varchar(100)"`
	Message   string `json:"message" gorm:"type:text"`
	IsActive  bool   `json:"is_active" gorm:"default:true"`
	CreatedAt int64  `json:"created_at"`
	UpdatedAt int64  `json:"updated_at"`
}
