package controllers

import (
	"fmt"
	"os"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
)

func InitBot() {

	if app.BotToken == "" {
		fmt.Println("Bot token is empty")
		return
	}

	bot, err := tgbotapi.NewBotAPI(app.BotToken)
	if err != nil {
		panic(err)
	}

	app.Bot = bot

	fmt.Println("Authorized on account", bot.Self.UserName)

	if os.Getenv("APP_ENV") == "development" {
		bot.Debug = true
	}

	u := tgbotapi.NewUpdate(0)
	u.Timeout = 60

	updates := bot.GetUpdatesChan(u)

	for update := range updates {

		if update.Message == nil {
			continue
		}

		if update.Message.Text != "" {
			// fmt.Println(update.Message.Text)

			// user
			user := app.Services.Bot.SaveUser(&update)

			// chat
			chat := app.Services.Bot.SaveChat(&update)

			// message
			msg := app.Services.Bot.SaveMessage(user.ID, &update)

			chat.Message = &msg

			// app.Services.ChatSocket.Publish(msg, update.Message.Chat.ID)
			app.Services.ChatSocket.Publish(chat)
		}

		// msg := tgbotapi.NewMessage(update.Message.Chat.ID, update.Message.Text)
		// msg.ReplyToMessageID = update.Message.MessageID

		// bot.Send(msg)
	}
}
