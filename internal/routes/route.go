package routes

import (
	"io/fs"
	"kontakami/internal/contracts"
	"kontakami/internal/handlers"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/go-chi/chi/v5"
)

var app *contracts.App

func LoadRoutes(a *contracts.App) (r *chi.Mux) {

	app = a

	handlers.Init(app)

	r = chi.NewRouter()
	// r.Use(middleware.Logger)

	api := api()
	r.Mount("/api", api)

	ws := ws()
	r.Mount("/ws", ws)

	web, err := fs.Sub(fs.FS(a.Web), "web")
	if err != nil {
		log.Fatal("failed to load web directory: " + err.Error())
	}

	// fs := http.FileServer(http.Dir("./web"))
	fileServer := http.FileServer(http.FS(web))
	r.HandleFunc("/*", func(w http.ResponseWriter, r *http.Request) {
		path := strings.TrimPrefix(r.URL.Path, "/")
		if _, err := fs.ReadFile(web, path); err != nil {
			http.StripPrefix(r.URL.Path, fileServer).ServeHTTP(w, r)
		} else {
			fileServer.ServeHTTP(w, r)
		}

		// if _, err := os.Stat("./web" + r.URL.Path); os.IsNotExist(err) {
		// 	http.StripPrefix(r.URL.Path, fileServer).ServeHTTP(w, r)
		// } else {
		// 	fileServer.ServeHTTP(w, r)
		// }
	})

	// storage
	if _, err := os.Stat("./storage"); os.IsNotExist(err) {
		os.Mkdir("./storage", os.ModePerm)
	}

	r.Get("/storage/*", func(w http.ResponseWriter, r *http.Request) {
		rctx := chi.RouteContext(r.Context())
		pathPrefix := strings.TrimSuffix(rctx.RoutePattern(), "/*")
		fs := http.StripPrefix(pathPrefix, http.FileServer(http.Dir("./storage")))
		fs.ServeHTTP(w, r)
	})

	return
}
