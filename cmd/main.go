package main

import (
	"fmt"
	"kontakami/internal/contracts"
	"kontakami/internal/database"
	"kontakami/internal/routes"
	"kontakami/internal/services/bot"
	"kontakami/internal/services/chat"
	chatsocket "kontakami/internal/services/chat_socket"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

var app *contracts.App

func init() {
	godotenv.Load()
}

func main() {

	app = &contracts.App{
		BotToken: os.Getenv("BOT_TOKEN"),
		DB:       database.Connect(),
	}

	app.Services = &contracts.Services{
		Bot:        bot.Init(app),
		Chat:       chat.Init(app),
		ChatSocket: chatsocket.Init(app),
	}

	routes := routes.LoadRoutes(app)

	fmt.Println("Listening on port 8080")
	http.ListenAndServe(":8080", routes)
}
