# small-hr-app


This project is a simple HR application with a Spring Boot backend and a React frontend. Database migrations are handled using Flyway with PostgreSQL.

---

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [Build and Run with Docker](#build-and-run-with-docker)
3. [Accessing the Application](#accessing-the-application)
4. [Stopping the Application](#stopping-the-application)
5. [Viewing the Database](#viewing-the-database)
6. [Project Structure](#project-structure)

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
### 2. Build and Run with Docker

From the project root:

```bash
docker-compose up --build
```

This will:

1. Build the backend Spring Boot JAR using Maven inside a Docker container.

2. Start PostgreSQL with a database and user defined in docker-compose.yml.

3. Run Flyway migrations automatically to create tables and insert initial data.

4. Start the backend server on port 9001.

5. Start the frontend React app on port 5173.

6. Start pgAdmin on port 5050 to manage the database.


### 3. Accessing the Application

- Backend API: http://localhost:9001

- Frontend: http://localhost:5173

- pgAdmin: http://localhost:5050

- Email: admin@admin.com

- Password: admin

- Connect to database server db (defined in Docker Compose) with user postgres and password 12345678.

### 4.Stopping the Application

To stop the application, run:

```bash
docker-compose down
```

### 5.Viewing the Database

ou have two options:

**Using pgAdmin**

- Go to `http://localhost:5050`
- Login with:
    - Email: `admin@admin.com`
    - Password: `admin`
- Add a server connection:
    1. **General Tab**
        - **Name:** `hr_app_db`  *(this is just a label in pgAdmin)*
    2. **Connection Tab**
        - **Hostname/address:** `db`
        - **Port:** `5432`
        - **Username:** `postgres`
        - **Password:** `12345678`
- Navigate to the `public` schema under the `hr_app_db` database.
- You will find the **`employee`** table created by Flyway migrations.
- You can now browse tables, data, and run queries.



### 6.Project Structure

```bash

HRAPP/
├── backend/
│   ├── src/main/java        # Java source code
│   ├── src/main/resources   # Application properties & Flyway migrations
│   └── pom.xml              # Maven configuration
├── frontend/                # React frontend
├── Dockerfile               # Backend Dockerfile (multi-stage)
└── docker-compose.yaml      # Compose file for backend, DB, frontend, pgAdmin

```


