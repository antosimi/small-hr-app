-- extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create employee table
CREATE TABLE IF NOT EXISTS employee (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    first_name VARCHAR(255) NOT NULL,
    last_name  VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL UNIQUE,
    phone      VARCHAR(50)  NOT NULL,
    birthday   DATE         NOT NULL,
    job_title  VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    manager    VARCHAR(255),
    hiring_date   DATE NOT NULL,
    starting_date DATE NOT NULL,
    deleted_at TIMESTAMP DEFAULT NULL,
    image BYTEA
);

-- unique index on employee email where employee is not deleted
CREATE UNIQUE INDEX IF NOT EXISTS  idx_employee_email_active ON employee (email) WHERE (deleted_at IS NULL);
