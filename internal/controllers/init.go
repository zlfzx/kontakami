package controllers

import "kontakami/internal/contracts"

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
