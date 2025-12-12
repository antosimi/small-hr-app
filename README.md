# small-hr-app



HRAPP is a full-stack Human Resources application built with **Spring Boot**, **PostgreSQL**, and **React**.

---

## Prerequisites

- **Java 17** or higher  
- **Maven**  
- **Node.js 18+** and **npm**  
- **PostgreSQL**  

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/username/HRAPP.git
cd HRAPP
```

You should see this folder structure:
```
HRAPP/
├── backend/    # Spring Boot backend project
└── frontend/   # React frontend project
```
### 2. Install PostgreSQL
On Windows / macOS:

Download from https://www.postgresql.org/download/

Follow the installer instructions and set a username/password (remember these for backend configuration)

Command to create the database : 
```
// create table :
CREATE TABLE public.employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50) NOT NULL,
    birthday DATE NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    manager VARCHAR(255) ,
    hiring_date DATE NOT NULL,
    starting_date DATE NOT NULL,
    image BYTEA
);

```

### 3. Backend Setup

1. Navigate to backend folder:
2. Open src/main/resources/application.properties and set your PostgreSQL credentials:
```
spring.datasource.url=jdbc:postgresql://localhost:5432/hrapp_db
spring.datasource.username=hrapp_user
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

3. Run the backend:

In IntelliJ, open backend as a Maven project and run HrAppApplication.java

### 4. Frontend Setup
1. Navigate to frontend folder.
2. Install dependencies.
```
npm install
```
3. Start the React development server:
```
npm run dev
```

### 5. Summary

Install PostgreSQL and create a database/user

Configure backend application.properties

Run backend (http://localhost:9001)

Run frontend the port will appear in the Terminal when server started.

Project is now ready to use


