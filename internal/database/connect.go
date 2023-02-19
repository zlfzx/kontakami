package database

import (
	"errors"
	"kontakami/internal/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func Connect() *gorm.DB {

	dsn := "root@tcp(127.0.0.1:3306)/kontakami"

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	err = db.AutoMigrate(
		&models.Setting{},
		&models.User{},
		&models.Chat{},
		&models.Message{},
		&models.Command{},
	)

	if err == nil && db.Migrator().HasTable(&models.Setting{}) {
		if err := db.First(&models.Setting{}).Error; errors.Is(err, gorm.ErrRecordNotFound) {
			//Insert seed data
			botToken := ""
			timeZone := "Asia/Jakarta"
			db.Create(&models.Setting{
				BotToken: &botToken,
				Timezone: &timeZone,
			})
		}
	}

	return db
}
