package models

type Setting struct {
	ID            int     `json:"id" gorm:"type:tinyint(1);primaryKey;autoIncrement"`
	BotToken      *string `json:"bot_token,omitempty" gorm:"type:varchar(255);default:null"`
	Timezone      *string `json:"timezone,omitempty" gorm:"type:varchar(100);default:null"`
	IsInitMessage bool    `json:"is_init_message" gorm:"default:false"`
	InitMessage   *string `json:"init_message,omitempty" gorm:"type:text;default:null"`
}
