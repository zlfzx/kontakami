package controllers

import (
	"encoding/json"
	"fmt"
	"kontakami/internal/models"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
)

func GetCommands(w http.ResponseWriter, r *http.Request) {
	commands := app.Services.Command.GetCommands()

	render.JSON(w, r, Response{
		Status: "success",
		Code:   http.StatusOK,
		Data:   commands,
	})
}

func PostCommand(w http.ResponseWriter, r *http.Request) {
	var command models.Command

	if err := json.NewDecoder(r.Body).Decode(&command); err != nil {
		ResponseError(w, r, http.StatusBadRequest, err.Error())
		return
	}

	app.Services.Command.SaveCommand(&command)

	render.JSON(w, r, Response{
		Status: "success",
		Code:   http.StatusOK,
		Data:   command,
	})
}

func UpdateStatusCommand(w http.ResponseWriter, r *http.Request) {
	paramId := chi.URLParam(r, "id")
	id, err := strconv.ParseInt(paramId, 10, 64)

	if err != nil {
		ResponseError(w, r, http.StatusBadRequest, err.Error())
		return
	}

	if err = r.ParseForm(); err != nil {
		ResponseError(w, r, http.StatusBadRequest, err.Error())
		return
	}

	var command models.Command
	if err := json.NewDecoder(r.Body).Decode(&command); err != nil {
		ResponseError(w, r, http.StatusBadRequest, err.Error())
		return
	}

	command = app.Services.Command.UpdateStatus(id, command.IsActive)

	render.JSON(w, r, Response{
		Status: "success",
		Code:   http.StatusOK,
		Data:   command,
	})
}

func PutCommand(w http.ResponseWriter, r *http.Request) {

	paramId := chi.URLParam(r, "id")
	id, err := strconv.ParseInt(paramId, 10, 64)

	if err != nil {
		ResponseError(w, r, http.StatusBadRequest, err.Error())
		return
	}

	var command models.Command

	command.ID = id

	if err := json.NewDecoder(r.Body).Decode(&command); err != nil {
		ResponseError(w, r, http.StatusBadRequest, err.Error())
		return
	}

	fmt.Println(command)

	app.Services.Command.SaveCommand(&command)

	render.JSON(w, r, Response{
		Status: "success",
		Code:   http.StatusOK,
		Data:   command,
	})
}
