package models

type Command struct {
	ID        int64  `json:"id"`
	Command   string `json:"command"`
	Message   string `json:"message"`
	IsActive  bool   `json:"is_active"`
	CreatedAt int64  `json:"created_at"`
	UpdatedAt int64  `json:"updated_at"`
}
