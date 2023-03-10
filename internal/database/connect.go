package database

import (
	"errors"
	"fmt"
	"kontakami/internal/models"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func Connect() *gorm.DB {

	// Connect to database
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWD")
	dbName := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", user, password, host, port, dbName)

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
		&models.File{},
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
