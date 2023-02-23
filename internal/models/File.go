package models

const (
	FileTypeDocument = "document"
	FileTypePhoto    = "photo"
	FileTypeVideo    = "video"
	FileTypeAudio    = "audio"
	FileTypeVoice    = "voice"
	FileTypeSticker  = "sticker"
)

type File struct {
	ID           int     `json:"id" gorm:"primaryKey;autoIncrement"`
	MessageID    int     `json:"message_id" gorm:"type:bigint(20);default:null"`
	Type         string  `json:"type" gorm:"type:varchar(50);default:null"`
	FileName     string  `json:"file_name" gorm:"type:varchar(255);default:null"`
	MimeType     *string `json:"mime_type" gorm:"type:varchar(255);default:null"`
	FileID       string  `json:"file_id" gorm:"type:varchar(255);default:null"`
	FileUniqueID string  `json:"file_unique_id" gorm:"type:varchar(255);default:null"`
	FileSize     int     `json:"file_size" gorm:"type:int(16);default:null"`
	Duration     *int    `json:"duration" gorm:"type:int(16);default:null"`
	IsAnimated   *bool   `json:"is_animated" gorm:"default:null"`
	IsVideo      *bool   `json:"is_video" gorm:"default:null"`
}
