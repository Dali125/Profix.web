package models

// LoanRequest represents the structure of a loan application
type LoanRequest struct {
	FirstName         string `form:"firstName"`
	LastName          string `form:"lastName"`
	Email             string `form:"email"`
	PhoneNumber       string `form:"phoneNumber"`
	MaritalStatus     string `form:"maritalStatus"`
	Address           string `form:"address"`
	NrcOrLicense      string `form:"nrcOrLicense"`
	AadhaarNumber     string `form:"aadhaarNumber"`
	LoanAmount        string `form:"loanAmount"`
	LoanType          string `form:"loanType"`
	CurrentOccupation string `form:"currentOccupation"`
	NetMonthlyIncome  string `form:"netMonthlyIncome"`
	Gender            string `form:"gender"`
	FileUpload        string `form:"fileUpload"`
}
