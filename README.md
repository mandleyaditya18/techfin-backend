# Overview - TechFin Backend

The TechFin backend is a service designed for managing financial transactions securely and efficiently. It's built to handle a large volume of transactions per user, with a strong emphasis on data integrity and scalability.

## Key Features

- **User Authentication:** Secure login using JWT.
- **Transaction Management:**
  - Create, view, edit, and "soft" delete transactions.
  - Transactions include payee, amount, category, and date.

## Tech Stack

- TypeScript
- Node.js
- Fastify
- bcryptjs
- jsonwebtoken
- dotenv

## Architecture

The backend is structured with a clear separation of concerns:

- **Controllers:** Handle HTTP requests.
- **Services:** Implement business logic.
- **Repositories:** Manage data access (currently in-memory).
- **Models:** Define data structures.
- **Middlewares:** Handle authentication and common tasks.
- **Utils:** Provide utility functions.
- **Types:** Define TypeScript types.

For now, we're using an in-memory database (`src/repositories/database.ts`) for simplicity. This is designed to be easily swapped out for a real database later.

## Setup

1.  **Clone:**

    ```bash
    git clone <repository-url>
    cd techfin-backend
    ```

2.  **Install Node.js and npm:**
    Make sure you have Node.js and npm installed. You can download them from [nodejs.org](https://nodejs.org/).

3.  **Install Dependencies:**

    ```bash
    npm install
    ```

4.  **Configure Environment:**

    - Create a `.env` file in the project root.
    - Add `JWT_SECRET=<your_jwt_secret>` to the `.env` file. **Important:** Use a strong, random secret!

## Running Locally

1.  **Start the Dev Server:**
    ```bash
    npm run dev
    ```
    This fires up the server using `ts-node` at `http://localhost:3000`.

## API Endpoints

All API endpoints are located under `http://localhost:3000`. Remember to replace `<your_jwt_token>` and `<resource_id>` with the appropriate values.

**Authentication**

- **`POST /signup`** - Register a new user

  - Body:
    ```json
    {
      "username": "<desired_username>",
      "password": "<desired_password>"
    }
    ```
  - Requires: No JWT token

- **`POST /login`** - Log in an existing user
  - Body:
    ```json
    {
      "username": "<your_username>",
      "password": "<your_password>"
    }
    ```
  - Requires: No JWT token
  - Returns:
    ```json
    {
      "token": "<JWT_token>",
      "user": {
        "id": "<user_id>",
        "createdAt": "<timestamp>",
        "updatedAt": "<timestamp>",
        "username": "<username>"
      }
    }
    ```

**Transactions**

- **`POST /transactions`** - Create a new transaction

  - Headers: `Authorization: Bearer <your_jwt_token>`
  - Body:
    ```json
    {
        "payee": "<payee_name>",
        "amount": <amount_in_number>,
        "category": "<transaction_category>",
        "date": "<YYYY-MM-DD>"
    }
    ```
  - Requires: Valid JWT token

- **`GET /transactions`** - Get all transactions for the authenticated user

  - Headers: `Authorization: Bearer <your_jwt_token>`
  - Requires: Valid JWT token

- **`GET /transactions/:id`** - Get a specific transaction by ID

  - Headers: `Authorization: Bearer <your_jwt_token>`
  - Requires: Valid JWT token
  - Path Parameter:
    - `id`: The ID of the transaction

- **`PUT /transactions/:id`** - Update an existing transaction

  - Headers: `Authorization: Bearer <your_jwt_token>`
  - Requires: Valid JWT token
  - Path Parameter:
    - `id`: The ID of the transaction
  - Body:
    ```json
    {
        "payee": "<payee_name>",
        "amount": <amount_in_number>,
        "category": "<transaction_category>",
        "date": "<YYYY-MM-DD>"
    }
    ```

- **`DELETE /transactions/:id`** - Soft delete a transaction
  - Headers: `Authorization: Bearer <your_jwt_token>`
  - Requires: Valid JWT token
  - Path Parameter:
    - `id`: The ID of the transaction
