-- Insert default administrator employee only if not exists
INSERT INTO employee (
    first_name,
    last_name,
    email,
    phone,
    birthday,
    job_title,
    department,
    manager,
    hiring_date,
    starting_date,
    image
)
SELECT
    'Administrator',
    'System',
    'admin@company.com',
    '0000000000',
    DATE '1990-01-01',
    'System Administrator',
    'IT',
    NULL,
    CURRENT_DATE,
    CURRENT_DATE,
    NULL
WHERE NOT EXISTS (
    SELECT 1 FROM employee WHERE email = 'admin@company.com'
);
