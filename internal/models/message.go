package models

type Message struct {
	ID        int    `json:"id" gorm:"primaryKey;autoIncrement:false"`
	MessageID int    `json:"message_id" gorm:"type:int(16);default:null"`
	ChatID    int64  `json:"chat_id" gorm:"type:bigint(20);default:null"`
	UserID    *int64 `json:"user_id" gorm:"type:bigint(20);default:null"`
	Text      string `json:"text" gorm:"type:text;default:null"`
	Date      int    `json:"date" gorm:"type:int(16);default:null"`
	SeenAt    *int   `json:"seen_at" gorm:"type:int(16);default:null"`
}
