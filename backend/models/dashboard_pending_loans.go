package models

type DashboardPendingLoans struct {
	Id            int    `json:"id"`
	Name          string `json:"name"`
	LoanType      string `json:"loanType"`
	LoanAmount    string `json:"loanAmount"`
	LoanStatus    string `json:"loanStatus"`
	DateRequested string `json:"dateRequested"`
}
