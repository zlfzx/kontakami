package helpers

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

func DownloadFile(filepath, url string) {
	// Get the data
	resp, err := http.Get(url)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	// Create the file
	out, err := os.Create(filepath)
	if err != nil {
		panic(err)
	}
	defer out.Close()

	// Write the body to file
	_, err = io.Copy(out, resp.Body)

	if err != nil {
		panic(err)
	}

	fmt.Println("Downloaded", filepath)
}
