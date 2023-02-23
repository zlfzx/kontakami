package bot

import (
	"fmt"
	"kontakami/internal/contracts"
	"kontakami/internal/helpers"
	"kontakami/internal/models"
	"os"
	"strings"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
	"gorm.io/gorm/clause"
)

type Service struct {
	*contracts.App
}

func Init(a *contracts.App) (s contracts.BotService) {
	s = &Service{
		App: a,
	}

	return
}

func (s *Service) ReceiveMessage(update *tgbotapi.Update) {

}

func (s *Service) SaveUser(update *tgbotapi.Update) (user models.User) {
	user = models.User{
		ID:        update.Message.From.ID,
		FirstName: update.Message.From.FirstName,
		LastName:  update.Message.From.LastName,
		Username:  update.Message.From.UserName,
		IsBot:     update.Message.From.IsBot,
	}

	// upsert
	s.DB.Clauses(clause.OnConflict{
		Columns:   []clause.Column{{Name: "id"}},
		DoUpdates: clause.AssignmentColumns([]string{"first_name", "last_name", "username", "is_bot"}),
	}).Create(&user)

	return
}

func (s *Service) SaveChat(update *tgbotapi.Update) (chat models.Chat) {

	profilePhoto := s.GetUserProfilePhoto(update.Message.Chat.ID)

	chat = models.Chat{
		ID:           update.Message.Chat.ID,
		FirstName:    update.Message.Chat.FirstName,
		LastName:     update.Message.Chat.LastName,
		Username:     update.Message.Chat.UserName,
		Type:         update.Message.Chat.Type,
		LastSent:     update.Message.Date,
		ProfilePhoto: profilePhoto,
	}

	// upsert
	s.DB.Clauses(clause.OnConflict{
		Columns:   []clause.Column{{Name: "id"}},
		DoUpdates: clause.AssignmentColumns([]string{"first_name", "last_name", "username", "type", "last_sent", "profile_photo"}),
	}).Create(&chat)

	return
}

func (s *Service) SaveMessage(userID int64, update *tgbotapi.Update) (message models.Message) {
	message = models.Message{
		ID:     update.Message.MessageID,
		ChatID: update.Message.Chat.ID,
		Text:   update.Message.Text,
		Date:   update.Message.Date,
	}

	if update.Message.ReplyToMessage != nil && update.Message.ReplyToMessage.MessageID != 0 {
		message.MessageID = update.Message.ReplyToMessage.MessageID
	}

	if userID != 0 {
		message.UserID = &userID
	}

	// insert
	s.DB.Create(&message)

	return
}

func (s *Service) SaveMessageFile(file models.File) models.File {

	s.DB.Create(&file)

	return file
}

func (s *Service) SendMessage(chatID int64, message models.Message) (int, error) {
	msg := tgbotapi.NewMessage(chatID, message.Text)
	if message.MessageID != 0 {
		msg.ReplyToMessageID = message.MessageID
	}
	sendMsg, err := s.Bot.Send(msg)

	if err != nil {
		return 0, err
	}

	return sendMsg.MessageID, nil
}

func (s *Service) GetUserProfilePhoto(userID int64) *string {

	pp, err := s.Bot.GetUserProfilePhotos(tgbotapi.UserProfilePhotosConfig{
		UserID: userID,
	})

	if err != nil {
		fmt.Println(err)
	}

	if len(pp.Photos) > 0 {
		fileID := pp.Photos[0][0].FileID

		ff, err := s.Bot.GetFile(tgbotapi.FileConfig{
			FileID: fileID,
		})

		if err != nil {
			fmt.Println(err)
		}

		link := ff.Link(s.BotToken)

		ext := strings.Split(ff.FilePath, ".")[1]
		filename := fmt.Sprintf("%d.%s", userID, ext)
		path := "storage/profiles"

		if err = os.MkdirAll(path, os.ModePerm); err != nil {
			panic(err)
		}
		path = fmt.Sprintf("%s/%s", path, filename)

		go helpers.DownloadFile(path, link)

		return &filename
	}

	return nil
}

// func downloadFile(filepath, url string) {
// 	// Get the data
// 	resp, err := http.Get(url)
// 	if err != nil {
// 		panic(err)
// 	}
// 	defer resp.Body.Close()

// 	// Create the file
// 	out, err := os.Create(filepath)
// 	if err != nil {
// 		panic(err)
// 	}
// 	defer out.Close()

// 	// Write the body to file
// 	_, err = io.Copy(out, resp.Body)

// 	if err != nil {
// 		panic(err)
// 	}

// 	fmt.Println("Downloaded", filepath)
// }
