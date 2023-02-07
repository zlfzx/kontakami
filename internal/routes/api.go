package routes

import (
	"kontakami/internal/controllers"

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
		r.Get("/chat", controllers.GetChats)
		r.Get("/chat/{id}", controllers.GetChat)
		r.Post("/chat/{id}", controllers.PostChat)
	})

	return
}
