package controllers

import (
	"context"
	"errors"
	"fmt"
	"io"
	"kontakami/internal/models"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	"nhooyr.io/websocket"
)

func GetChats(w http.ResponseWriter, r *http.Request) {
	chats := app.Services.Chat.GetChats()

	render.JSON(w, r, Response{
		Status: "success",
		Code:   http.StatusOK,
		Data:   chats,
	})
}

func GetChat(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")
	id, _ := strconv.ParseInt(idParam, 10, 64)

	chat := app.Services.Chat.GetChat(id, true)

	if chat.ID == 0 {
		render.Status(r, http.StatusNotFound)
		render.JSON(w, r, Response{
			Status:  "error",
			Code:    http.StatusNotFound,
			Message: "Chat not found",
		})
		return
	}

	render.JSON(w, r, Response{
		Status: "success",
		Code:   http.StatusOK,
		Data:   chat,
	})
}

func PostChat(w http.ResponseWriter, r *http.Request) {

	paramId := chi.URLParam(r, "id")
	id, err := strconv.ParseInt(paramId, 10, 64)

	if err != nil {
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, Response{
			Status:  "error",
			Code:    http.StatusBadRequest,
			Message: "Invalid request payload",
		})
		return
	}

	var message models.Message
	message.Text = r.FormValue("text")

	msgID, _ := strconv.ParseInt(r.FormValue("message_id"), 10, 64)
	if msgID != 0 {
		message.MessageID = int(msgID)
	}

	f, h, errFile := r.FormFile("file")

	if errFile != nil && message.Text == "" {
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, Response{
			Status:  "error",
			Code:    http.StatusBadRequest,
			Message: "Invalid request payload",
		})
		return
	}

	if errFile == nil {
		defer f.Close()

		path := "storage/files/photo"
		_ = os.MkdirAll(path, os.ModePerm)
		path = path + "/" + h.Filename

		file, err := os.Create(path)
		if err != nil {
			panic(err)
		}
		defer file.Close()

		_, err = io.Copy(file, f)
		if err != nil {
			panic(err)
		}

		fmt.Println("File uploaded successfully: " + path)

		var fileType string
		mimeType := h.Header.Get("Content-Type")
		if strings.Split(mimeType, "/")[0] == "image" {
			fileType = "photo"
		}

		message.File = &models.File{
			Type:     fileType,
			FileName: h.Filename,
			MimeType: &mimeType,
		}
	}

	_, err = app.Services.Chat.SaveMessage(id, &message)
	if err != nil {
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, Response{
			Status:  "error",
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		})
		return
	}

	render.JSON(w, r, Response{
		Status: "success",
		Code:   http.StatusOK,
		Data:   message,
	})
}

func ReadChat(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")
	id, _ := strconv.ParseInt(idParam, 10, 64)

	chat := app.Services.Chat.GetChat(id, false)

	if chat.ID == 0 {
		render.Status(r, http.StatusNotFound)
		render.JSON(w, r, Response{
			Status:  "error",
			Code:    http.StatusNotFound,
			Message: "Chat not found",
		})
		return
	}

	app.Services.Chat.ReadChat(id)

	render.JSON(w, r, Response{
		Status: "success",
		Code:   http.StatusOK,
	})
}

func ChatSocket(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")
	id, _ := strconv.Atoi(idParam)

	c, err := websocket.Accept(w, r, &websocket.AcceptOptions{
		OriginPatterns: []string{"*"},
	})
	if err != nil {
		log.Println(err)
		return
	}
	defer c.Close(websocket.StatusInternalError, "the sky is falling")

	err = app.Services.ChatSocket.Subscribe(r.Context(), c, id)
	if errors.Is(err, context.Canceled) {
		return
	}
	if websocket.CloseStatus(err) == websocket.StatusNormalClosure ||
		websocket.CloseStatus(err) == websocket.StatusGoingAway {
		return
	}
	if err != nil {
		log.Printf("%v", err)
		return
	}
}
