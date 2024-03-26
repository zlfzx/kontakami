package handlers

import (
	"kontakami/internal/contracts"
	"net/http"

	"github.com/go-chi/render"
)

var app *contracts.App

type Response struct {
	Status  string      `json:"status"`
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

func Init(a *contracts.App) {
	app = a

	// init telegram bot
	go InitBot()
}

func ResponseError(w http.ResponseWriter, r *http.Request, code int, message string) {
	render.Status(r, code)
	render.JSON(w, r, Response{
		Status:  "error",
		Code:    code,
		Message: message,
	})
}
