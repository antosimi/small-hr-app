-- create login_user table
CREATE TABLE IF NOT EXISTS login_user (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    enabled BOOLEAN DEFAULT true,
    employee_id UUID NOT NULL,
    CONSTRAINT fk_employee FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE
);


-- create role table
CREATE TABLE IF NOT EXISTS role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- create user_roles junction table
CREATE TABLE IF NOT EXISTS  user_roles (
    user_id UUID NOT NULL,
    role_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES login_user (id) ON DELETE CASCADE,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE
);

-- insert default roles
INSERT INTO role (name)
SELECT 'EMPLOYEE'
WHERE NOT EXISTS (SELECT 1 FROM role WHERE name = 'EMPLOYEE');

INSERT INTO role (name)
SELECT 'ADMIN'
WHERE NOT EXISTS (SELECT 1 FROM role WHERE name = 'ADMIN');

INSERT INTO role (name)
SELECT 'MANAGER'
WHERE NOT EXISTS (SELECT 1 FROM role WHERE name = 'MANAGER');

INSERT INTO role (name)
SELECT 'HR'
WHERE NOT EXISTS (SELECT 1 FROM role WHERE name = 'HR');


-- create admin user linked to administrator employee
INSERT INTO login_user (
    username,
    password_hash,
    enabled,
    employee_id
)
SELECT
    'admin',
    '$2a$12$pr7nfvvqGtKMx4RITRpgbeT6mmI0faMMK1gznFgksWeXDBUp/YSo.', -- admin1234
    TRUE,
    e.id
FROM employee e
WHERE e.email = 'admin@company.com'
  AND NOT EXISTS (
      SELECT 1 FROM login_user WHERE username = 'admin'
  );


-- assign ADMIN role to admin user
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM login_user u
JOIN role r ON r.name = 'ADMIN'
WHERE u.username = 'admin'
  AND NOT EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = u.id
        AND ur.role_id = r.id
  );


