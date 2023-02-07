package controllers

import (
	"context"
	"encoding/json"
	"errors"
	"kontakami/internal/models"
	"log"
	"net/http"
	"strconv"

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

	if err := json.NewDecoder(r.Body).Decode(&message); err != nil {
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, Response{
			Status:  "error",
			Code:    http.StatusBadRequest,
			Message: "Invalid request payload",
		})
		return
	}

	app.Services.Chat.SaveMessage(id, &message)

	render.JSON(w, r, Response{
		Status: "success",
		Code:   http.StatusOK,
		Data:   message,
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
