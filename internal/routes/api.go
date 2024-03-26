package routes

import (
	"kontakami/internal/handlers"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func api() (r *chi.Mux) {

	r = chi.NewRouter()

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

	r.Use(middleware.Logger)

	r.Route("/v1", func(r chi.Router) {
		r.Get("/chat", handlers.GetChats)
		r.Get("/chat/{id}", handlers.GetChat)
		r.Post("/chat/{id}", handlers.PostChat)
		r.Post("/chat/{id}/read", handlers.ReadChat)

		r.Get("/command", handlers.GetCommands)
		r.Post("/command", handlers.PostCommand)
		r.Put("/command/{id}/update-status", handlers.UpdateStatusCommand)
		r.Put("/command/{id}", handlers.PutCommand)
		r.Delete("/command/{id}", handlers.DeleteCommand)

		r.Get("/init-message", handlers.GetInitMessage)
		r.Put("/init-message", handlers.PutInitMessage)
	})

	return
}
