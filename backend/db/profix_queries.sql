SELECT id,
       CONCAT(first_name,' ',last_name) as name,
       loan_type,
       loan_amount,
       DATE(created_at) as application_date
from loans
WHERE status = 'pending';


SELECT 
    COUNT(*) as pending_requests 
FROM loans
WHERE status = 'pending';

SELECT 
    COUNT(*) as pending_requests 
FROM loans
WHERE status = 'active';

SELECT 
    COUNT(*) as pending_requests 
FROM loans
WHERE status = 'closed';