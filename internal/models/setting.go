package models

type Setting struct {
	ID       int    `json:"id" gorm:"type:tinyint(1);primaryKey;autoIncrement"`
	BotToken string `json:"bot_token" gorm:"type:varchar(255);default:null"`
	Timezone string `json:"timezone" gorm:"type:varchar(100);default:null"`
}
