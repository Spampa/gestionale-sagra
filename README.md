# My Sagra

This repository includes:

1. **Express Server** (backend API)
2. **Next.js App** (frontend web)

Database access uses **Prisma ORM** with **MariaDB**.

---

## Environment Variables

### 1. Express (.env)
Create a `.env` file in your Express server folder:

```env
PORT=3001
DATABASE_URL="mysql://USERNAME:PASSWORD@HOST:PORT/DATABASENAME"
PEPPER=xxxxxx
JWT_SECRET=diegoredondi
WEBAPP_DOMAIN="mysite.com"
```

### 2. Next.js (.env)
Create a `.env` file in your Next.js frontend folder:

```env
API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=my sagra
```
If deploying to production, update `API_URL` accordingly.

---

## Installation

### Express Server

```bash
cd server
npm install
npx prisma generate
npx prisma migrate deploy #db prdouction
```

### Next.js App

```bash
cd webapp
npm install
```

---

## Build & Run

You MUST build and run both servers:

### Express

```bash
cd server
npm run build
npm run start
```

### Next.js

```bash
cd webapp
npm run build
npm run start
```
---

## Entity Relationship Diagram

```mermaid
erDiagram
  CATEGORY {
    INT id
    STRING name
  }
  FOOD {
    INT id
    STRING name
    STRING description
    DECIMAL price
    INT categoryId
  }
  ORDER {
    STRING id
    DATETIME dateTime
    STRING table
    STRING customer
  }
  FOODSORDERED {
    INT quantity
    STRING orderId
    INT foodId
  }
  ROLE {
    INT id
    STRING name
  }
  USER {
    INT id
    STRING username
    STRING password
    INT roleId
  }

  CATEGORY ||--o{ FOOD : has
  FOOD ||--o{ FOODSORDERED : is_ordered_in
  ORDER ||--o{ FOODSORDERED : includes
  ROLE ||--o{ USER : has
  USER }o--|| ROLE : assigned
```
---

## Seeding the First User

To seed your database (e.g., to create your first admin user), i created a first seed with username: admin and password: admin, is recommended to delete it after create the first admin user

To run the seed:
```bash
npx prisma db seed
```
For more info, see the [Prisma seeding docs](https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding).

---

## API Documentation

You can find the API documentation made with SwaggerUI at the endpoint

```bash
http://[YOUR_URL]/api-docs
```

Feel free to open an issue if you need help. Enjoy building! 🚀
