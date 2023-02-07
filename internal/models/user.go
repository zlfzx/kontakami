package models

type User struct {
	ID        int64  `json:"id" gorm:"type:bigint(20);primaryKey;autoIncrement:false"`
	FirstName string `json:"first_name" gorm:"type:varchar(255);default:null"`
	LastName  string `json:"last_name" gorm:"type:varchar(255);default:null"`
	Username  string `json:"username" gorm:"type:varchar(255);default:null"`
	IsBot     bool   `json:"is_bot" gorm:"type:boolean;default:0"`
}
