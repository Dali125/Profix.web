package main

import "profix.com/main/backend/api"

func main() {
	// Start the server
	err := api.NewServer()

	if err != nil {

		panic(err.Error())
	}

}
