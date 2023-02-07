package routes

import (
	"kontakami/internal/controllers"

	"github.com/go-chi/chi/v5"
)

func ws() *chi.Mux {
	r := chi.NewRouter()

	// r.Get("/publish", func(w http.ResponseWriter, r *http.Request) {
	// 	id := int64(5894325297)
	// 	chats := app.Services.Chat.GetMessage(id)
	// 	app.Services.ChatSocket.Publish(chats, 0)
	// })

	// r.Get("/publish/{id}", func(w http.ResponseWriter, r *http.Request) {
	// 	idParam := chi.URLParam(r, "id")
	// 	id, _ := strconv.Atoi(idParam)

	// 	msg := app.Services.Chat.GetMessage(int64(id))

	// 	app.Services.ChatSocket.Publish(msg, int64(id))
	// })

	r.HandleFunc("/chat", controllers.ChatSocket)
	r.HandleFunc("/chat/{id}", controllers.ChatSocket)

	return r
}
