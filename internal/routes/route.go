package routes

import (
	"kontakami/internal/contracts"
	"kontakami/internal/controllers"
	"net/http"
	"os"
	"strings"

	"github.com/go-chi/chi/v5"
)

var app *contracts.App

func LoadRoutes(a *contracts.App) (r *chi.Mux) {

	app = a

	controllers.Init(app)

	r = chi.NewRouter()
	// r.Use(middleware.Logger)

	api := api()
	r.Mount("/api", api)

	ws := ws()
	r.Mount("/ws", ws)

	fs := http.FileServer(http.Dir("./web"))
	r.Get("/*", func(w http.ResponseWriter, r *http.Request) {
		if _, err := os.Stat("./web" + r.URL.Path); os.IsNotExist(err) {
			http.StripPrefix(r.URL.Path, fs).ServeHTTP(w, r)
		} else {
			fs.ServeHTTP(w, r)
		}
	})

	// storage
	r.Get("/storage/*", func(w http.ResponseWriter, r *http.Request) {
		rctx := chi.RouteContext(r.Context())
		pathPrefix := strings.TrimSuffix(rctx.RoutePattern(), "/*")
		fs := http.StripPrefix(pathPrefix, http.FileServer(http.Dir("./storage")))
		fs.ServeHTTP(w, r)
	})

	return
}
