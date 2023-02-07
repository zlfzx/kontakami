package models

type Chat struct {
	ID           int64     `json:"id" gorm:"type:bigint(20);primaryKey;autoIncrement:false"`
	FirstName    string    `json:"first_name" gorm:"type:varchar(255);default:null"`
	LastName     string    `json:"last_name" gorm:"type:varchar(255);default:null"`
	Username     string    `json:"username" gorm:"type:varchar(255);default:null"`
	Type         string    `json:"type" gorm:"type:varchar(50);default:null"`
	Message      *Message  `json:"message,omitempty" gorm:"foreignKey:ChatID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Messages     []Message `json:"messages,omitempty" gorm:"foreignKey:ChatID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	LastSent     int       `json:"last_sent,omitempty" gorm:"type:int(16);default:null"`
	ProfilePhoto *string   `json:"profile_photo" gorm:"type:varchar(255);default:null"`
}
