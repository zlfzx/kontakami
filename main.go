package main

import (
	"embed"
	"fmt"
	"kontakami/internal/contracts"
	"kontakami/internal/database"
	"kontakami/internal/routes"
	"kontakami/internal/services/bot"
	"kontakami/internal/services/chat"
	"kontakami/internal/services/command"
	"kontakami/internal/services/websocket"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

var app *contracts.App

//go:embed web/*
var web embed.FS

func init() {
	godotenv.Load()
}

func main() {

	app = &contracts.App{
		BotToken: os.Getenv("BOT_TOKEN"),
		DB:       database.Connect(),
		Web:      web,
	}

	app.Services = &contracts.Services{
		Bot:       bot.Init(app),
		Chat:      chat.Init(app),
		WebSocket: websocket.Init(app),
		Command:   command.Init(app),
	}

	routes := routes.LoadRoutes(app)

	fmt.Println("Listening on port 8080")
	http.ListenAndServe(":8080", routes)
}
