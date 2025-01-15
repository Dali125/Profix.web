package models

type DashboardData struct {
	TotalLoansRequested int `json:"totalLoansRequested"`
	TotalLoansApproved  int `json:"totalLoansApproved"`
	TotalLoansClosed    int `json:"totalLoansClosed"`

	PendingLoans []DashboardPendingLoans `json:"pendingLoans"`
}
