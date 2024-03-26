package handlers

import (
	"fmt"
	"kontakami/internal/helpers"
	"kontakami/internal/models"
	"os"
	"strings"
	"time"

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

			// user
			user := app.Services.Bot.SaveUser(&update)

			// chat
			chat := app.Services.Bot.SaveChat(&update)

			// message
			msg := app.Services.Bot.SaveMessage(user.ID, &update)

			chat.Message = &msg

			// app.Services.WebSocket.Publish(msg, update.Message.Chat.ID)
			app.Services.WebSocket.Publish(nil, chat)

			// command
			if update.Message.IsCommand() {

				if update.Message.Command() == "start" {
					initMessage := app.Services.Command.GetInitMessage()
					if initMessage.IsInitMessage {
						msg := tgbotapi.NewMessage(update.Message.Chat.ID, *initMessage.InitMessage)
						msg.ReplyToMessageID = update.Message.MessageID

						send, _ := bot.Send(msg)

						update.Message.ReplyToMessage = &tgbotapi.Message{
							MessageID: msg.ReplyToMessageID,
						}
						update.Message.MessageID = send.MessageID
						update.Message.Text = *initMessage.InitMessage
						app.Services.Bot.SaveMessage(0, &update)

						botMsg := models.Message{
							ID:        send.MessageID,
							MessageID: msg.ReplyToMessageID,
							ChatID:    chat.ID,
							Text:      *initMessage.InitMessage,
							Date:      int(time.Now().Unix()),
						}
						chat.Message = &botMsg
						app.Services.WebSocket.Publish(nil, chat)
					}
				} else {
					// list of commands
					commands := app.Services.Command.GetActiveCommand()
					for _, command := range commands {
						if update.Message.Command() == command.Command {
							msg := tgbotapi.NewMessage(update.Message.Chat.ID, command.Message)
							msg.ReplyToMessageID = update.Message.MessageID

							send, _ := bot.Send(msg)

							update.Message.ReplyToMessage = &tgbotapi.Message{
								MessageID: msg.ReplyToMessageID,
							}
							update.Message.MessageID = send.MessageID
							update.Message.Text = command.Message
							app.Services.Bot.SaveMessage(0, &update)

							botMsg := models.Message{
								ID:        send.MessageID,
								MessageID: msg.ReplyToMessageID,
								ChatID:    chat.ID,
								Text:      command.Message,
								Date:      int(time.Now().Unix()),
							}
							chat.Message = &botMsg
							app.Services.WebSocket.Publish(nil, chat)
						}
					}
				}

			}
		}

		receiveImage(update)

		// msg := tgbotapi.NewMessage(update.Message.Chat.ID, update.Message.Text)
		// msg.ReplyToMessageID = update.Message.MessageID

		// bot.Send(msg)
	}
}

func receiveImage(update tgbotapi.Update) {

	if update.Message.Photo != nil {
		photo := update.Message.Photo[len(update.Message.Photo)-1]
		getFile, _ := app.Bot.GetFile(tgbotapi.FileConfig{
			FileID: photo.FileID,
		})

		link := getFile.Link(app.BotToken)

		ext := strings.Split(getFile.FilePath, ".")[1]
		filename := fmt.Sprintf("%s.%s", getFile.FileUniqueID, ext)
		path := fmt.Sprintf("storage/files/%d/photo", update.Message.From.ID)

		if err := os.MkdirAll(path, os.ModePerm); err != nil {
			panic(err)
		}
		path = fmt.Sprintf("%s/%s", path, filename)

		go helpers.DownloadFile(path, link)

		// user
		user := app.Services.Bot.SaveUser(&update)

		// chat
		chat := app.Services.Bot.SaveChat(&update)

		// message
		if update.Message.Caption != "" {
			update.Message.Text = update.Message.Caption
		}
		msg := app.Services.Bot.SaveMessage(user.ID, &update)
		file := models.File{
			MessageID:    msg.ID,
			Type:         models.FileTypePhoto,
			FileName:     path,
			FileID:       getFile.FileID,
			FileUniqueID: getFile.FileUniqueID,
			FileSize:     getFile.FileSize,
		}
		file = app.Services.Bot.SaveMessageFile(file)

		msg.File = &file
		chat.Message = &msg
		app.Services.WebSocket.Publish(nil, chat)
	}
}
