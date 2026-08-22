# TripNest - Travel Planning & Trip Management Platform

## Included
- JDK 21 Spring Boot backend
- React + Vite frontend starter
- MySQL `tripnest_db` schema and seed data
- JWT dependencies
- Spring Security, JPA, Validation, OAuth2 Client and Actuator

## Structure

```text
TripNest_Project/
├── tripnest-backend/
├── tripnest-frontend/
├── mysql/
└── docs/
```

## MySQL

Create the database/tables by running:

```sql
SOURCE mysql/schema.sql;
SOURCE mysql/seed.sql;
```

Then set your MySQL password in:
`tripnest-backend/src/main/resources/application.properties`

Do not commit a real password to GitHub.

## Backend

```bash
cd tripnest-backend
mvnw.cmd spring-boot:run
```

Backend: http://localhost:8080

## Frontend

```bash
cd tripnest-frontend
npm install
npm run dev
```

Frontend: http://localhost:5173

This package is a clean foundation. The REST controllers, services, entities and full authentication flow can be implemented module-by-module by the team.
