package api

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"profix.com/main/backend/auth"
	"profix.com/main/backend/models"
)

var db *sql.DB

// NewServer initializes and starts a new server
func NewServer() error {
	var err error
	// Database connection parameters
	host := "localhost"
	port := "5500"
	user := "postgres"
	password := "1590"
	dbname := "zikos"

	// Connection string for PostgreSQL
	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)

	// Open a connection to the database
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		return err // Return error if connection fails
	}

	// Ping the database to ensure the connection is established
	err = db.Ping()
	if err != nil {
		panic(err) // Panic if ping fails
	}

	// Initialize a new Gin router
	r := gin.Default()

	// Serve static files from the "./frontend/static" directory
	r.Static("/static", "./frontend/static")
	r.LoadHTMLGlob("./frontend/pages/*.html")

	r.GET("/", func(c *gin.Context) {

		c.HTML(200, "index.html", nil)
	})
	r.GET("/about", func(c *gin.Context) {

		c.HTML(200, "about.html", nil)
	})
	r.GET("/apply", func(c *gin.Context) {

		c.HTML(200, "apply.html", nil)
	})
	r.GET("/login", func(ctx *gin.Context) {
		ctx.HTML(200, "login.html", nil)
	})
	r.POST("/login", auth.Login(db))
	r.GET("/dashboard", auth.AuthMiddleware(), func(c *gin.Context) {
		c.HTML(200, "dashboard.html", nil)
	})

	r.GET("/dashboard/data", fetchDashboardData)
	r.POST("/api/loan-application", LoanRequest)
	r.POST("/register", auth.Register(db))

	err = r.Run(":8080")

	if err != nil {

		return err
	}
	return nil // Return nil if everything is successful
}

func LoanRequest(c *gin.Context) {

	log.Println("Received loan application request")

	var loanRequest models.LoanRequest
	loanRequest.FirstName = c.PostForm("firstName")
	loanRequest.LastName = c.PostForm("lastName")
	loanRequest.Email = c.PostForm("email")
	loanRequest.PhoneNumber = c.PostForm("phoneNumber")
	loanRequest.MaritalStatus = c.PostForm("maritalStatus")
	loanRequest.Address = c.PostForm("address")
	loanRequest.NrcOrLicense = c.PostForm("nrcOrLicense")
	loanRequest.AadhaarNumber = c.PostForm("aadhaarNumber")
	loanRequest.LoanAmount = c.PostForm("loanAmount")
	loanRequest.LoanType = c.PostForm("loanType")
	loanRequest.CurrentOccupation = c.PostForm("currentOccupation")
	loanRequest.NetMonthlyIncome = c.PostForm("netMonthlyIncome")
	loanRequest.Gender = c.PostForm("gender")

	fmt.Println(loanRequest)
	log.Println("Loan request bound successfully")

	//convert phone number
	//Save the uploaded file
	file, err := c.FormFile("fileUpload")
	if err != nil {
		log.Printf("Error getting uploaded file: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "File upload failed"})
		return
	}
	log.Println("File upload received successfully")
	log.Println(file.Filename)

	filePath := fmt.Sprintf("./uploads/%s", file.Filename)
	if err := c.SaveUploadedFile(file, filePath); err != nil {
		log.Printf("Error saving uploaded file: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file"})
		return
	}
	log.Println("File saved successfully")
	loanRequest.FileUpload = filePath
	log.Println("Attempting to save loan request to database")
	log.Println(loanRequest)

	// Insert the loan request into the database

	_, err = db.Exec(`INSERT INTO 
	loans (
	first_name,
	last_name, 
	email,
	phone_number, 
	marital_status,
	address, 
	nrc_or_license, 
	aadhaar_number, 
	loan_amount, 
	loan_type, 
	current_occupation, 
	net_monthly_income, 
	gender, 
	file_upload, 
	status)
	 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, 'pending')`, loanRequest.FirstName, loanRequest.LastName, loanRequest.Email, loanRequest.PhoneNumber, loanRequest.MaritalStatus, loanRequest.Address, loanRequest.NrcOrLicense, loanRequest.AadhaarNumber, loanRequest.LoanAmount, loanRequest.LoanType, loanRequest.CurrentOccupation, loanRequest.NetMonthlyIncome, loanRequest.Gender, loanRequest.FileUpload)
	if err != nil {
		log.Printf("Error inserting loan request into database: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save loan request"})
		return
	}
	log.Println("Loan request saved to database successfully")

	c.JSON(http.StatusOK, gin.H{"message": "Loan request saved successfully"})

}

func fetchDashboardData(c *gin.Context) {

	var dashboardData models.DashboardData

	var pendingLoans int
	var activeLoans int
	var closedLoans int

	// Fetch pending loans
	rows, err := db.Query(`SELECT COUNT(*) as pending_requests FROM loans WHERE status = 'pending'`)
	if err != nil {
		log.Printf("Error querying pending loans: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch pending loans"})
		return
	}
	defer rows.Close()

	if rows.Next() {
		if err := rows.Scan(&pendingLoans); err != nil {
			log.Printf("Error scanning pending loans: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch pending loans"})
			return
		}
	}

	rows2, err := db.Query(`SELECT COUNT(*) as pending_requests FROM loans WHERE status = 'active'`)
	if err != nil {
		log.Printf("Error querying pending loans: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch active loans"})
		return
	}
	defer rows2.Close()

	if rows2.Next() {
		if err := rows2.Scan(&activeLoans); err != nil {
			log.Printf("Error scanning pending loans: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch active loans"})
			return
		}
	}

	rows3, err := db.Query(`SELECT COUNT(*) as pending_requests FROM loans WHERE status = 'closed'`)
	if err != nil {
		log.Printf("Error querying pending loans: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch pending closed"})
		return
	}
	defer rows3.Close()

	if rows3.Next() {
		if err := rows3.Scan(&closedLoans); err != nil {
			log.Printf("Error scanning pending loans: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch closed loans"})
			return
		}
	}

	dashboardData.TotalLoansRequested = pendingLoans
	dashboardData.TotalLoansApproved = activeLoans
	dashboardData.TotalLoansClosed = closedLoans
	log.Println("Added total loans requested, approved and closed to dashboard data")

	rows4, err := db.Query(`SELECT id,
       CONCAT(first_name,' ',last_name) as name,
       loan_type,
       loan_amount,
       DATE(created_at) as application_date
from loans
WHERE status = 'pending';`)

	defer rows4.Close()

	for rows4.Next() {
		var dashboardPendingLoans models.DashboardPendingLoans
		if err := rows4.Scan(&dashboardPendingLoans.Id, &dashboardPendingLoans.Name, &dashboardPendingLoans.LoanType, &dashboardPendingLoans.LoanAmount, &dashboardPendingLoans.DateRequested); err != nil {
			log.Printf("Error scanning pending loans: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch pending loans"})
			return
		}
		dashboardData.PendingLoans = append(dashboardData.PendingLoans, dashboardPendingLoans)
	}

	c.JSON(http.StatusOK, dashboardData)

}
