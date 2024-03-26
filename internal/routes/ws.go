package routes

import (
	"kontakami/internal/handlers"

	"github.com/go-chi/chi/v5"
)

func ws() *chi.Mux {
	r := chi.NewRouter()
	r.HandleFunc("/chat", handlers.ChatSocket)
	r.HandleFunc("/chat/{id}", handlers.ChatSocket)

	return r
}
