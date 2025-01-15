CREATE TABLE loans (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    marital_status VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    nrc_or_license VARCHAR(50) NOT NULL,
    aadhaar_number VARCHAR(50) NOT NULL,
    loan_amount VARCHAR(50) NOT NULL,
    loan_type VARCHAR(50) NOT NULL,
    current_occupation VARCHAR(50) NOT NULL,
    net_monthly_income VARCHAR(50) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    file_upload TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);