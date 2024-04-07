# Multi Step Form

# Structure

```
root
├── src
│   ├── index.ts
│   ├── config
│   │   ├── env_config.md
│   │   └── Multi Step Form.postman_collection.json
│   ├── controllers
│   │   ├── AuthController.ts
│   │   ├── SubscribeController.ts
│   │   └── UserController.ts
│   ├── Database
│   │   └── ConnectMongoDB.ts
│   ├── middlewares
│   │   ├── authMiddleware.ts
│   │   ├── authRateLimiter.ts
│   │   ├── emailVerificationRateLimiter.ts
│   │   ├── errorMiddleware.ts
│   │   └── verificationCheckRateLimiter.ts
│   ├── models
│   │   ├── Subscription.ts
│   │   └── User.ts
│   ├── routes
│   │   ├── authRoutes.ts
│   │   ├── subscribeRoutes.ts
│   │   └── userRoutes.ts
│   ├── services
│   │   ├── AuthServices.ts
│   │   ├── SubscribeServices.ts
│   │   └── UserServices.ts
│   └── utils
│       ├── auth.ts
│       ├── sendEmail.ts
│       └── validation.ts
├── .env
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

Explanation of each directory and file:

- `src`: Contains the source code of the application.
  - `index.ts`: Entry point of the application.
- `config`: Configuration files for the application.
  - `env_config.md`: Documentation for environment variables configuration.
  - `Multi Step Form.postman_collection.json`: Postman collection file.
- `controllers`: Controllers responsible for handling HTTP requests and responses.
  - `AuthController.ts`: Controller for authentication-related endpoints.
  - `SubscribeController.ts`: Controller for subscription-related endpoints.
  - `UserController.ts`: Controller for user-related endpoints.
- `Database`: Contains files related to database connection.
  - `ConnectMongoDB.ts`: File to establish connection with MongoDB.
- `middlewares`: Middleware functions used in the application.
  - `authMiddleware.ts`: Middleware for user authentication.
  - `authRateLimiter.ts`: Middleware for rate limiting authentication requests.
  - `emailVerificationRateLimiter.ts`: Middleware for rate limiting email verification requests.
  - `errorMiddleware.ts`: Middleware for error handling.
  - `verificationCheckRateLimiter.ts`: Middleware for rate limiting verification check requests.
- `models`: Data models representing entities in the application.
  - `Subscription.ts`: Model for subscription data.
  - `User.ts`: Model for user data.
- `routes`: Route definitions for different API endpoints.
  - `authRoutes.ts`: Routes for authentication endpoints.
  - `subscribeRoutes.ts`: Routes for subscription endpoints.
  - `userRoutes.ts`: Routes for user endpoints.
- `services`: Service layer containing business logic.
  - `AuthServices.ts`: Services related to authentication.
  - `SubscribeServices.ts`: Services related to subscriptions.
  - `UserServices.ts`: Services related to users.
- `utils`: Utility functions used throughout the application.
  - `auth.ts`: Utility functions related to authentication.
  - `sendEmail.ts`: Utility functions for sending emails.
  - `validation.ts`: Utility functions for input validation.
- `.env`: Environment variables file.
- `package-lock.json`: File automatically generated for any operations where npm modifies either the node_modules tree, or package.json.
- `package.json`: Contains metadata about the project and dependencies.
- `README.md`: Documentation file for the project.
- `tsconfig.json`: TypeScript configuration file.

## Authentication

The authentication in this API collection is based on JSON Web Tokens (JWT). To utilize the endpoints requiring authentication, you need to obtain a JWT token by successfully logging in.

### Endpoints

- **Login**: `POST /auth/login`
  - Description: This endpoint is used to authenticate users and obtain a JWT token.
  - Request Body:
    ```json
    {
        "username": "",
        "password": ""
    }
    ```
- **Registration**: `POST /auth/register`
  - Description: This endpoint is used to register new users.
  - Request Body:
    ```json
    {
        "username": "",
        "email": "",
        "password": ""
    }
    ```

## User

The user-related endpoints allow interactions with user data, including fetching user details, updating user information, and deleting users.

### Endpoints

- **User Details**: `GET /users/details`
  - Description: Fetch user details.
- **Send Email**: `POST /users/sendEmail`
  - Description: Send an email.
- **Verify Email**: `POST /users/verifyEmail`
  - Description: Verify user email.
  - Request Body:
    ```json
    {
        "verificationCode": ""
    }
    ```
- **Update User**: `PUT /users/update`
  - Description: Update user information.
  - Request Body:
    ```json
    {
        "username": "",
        "email": "",
        "password": ""
    }
    ```
- **Delete User**: `DELETE /users/`
  - Description: Delete user.

## Subscription

The subscription endpoints handle subscription-related functionalities such as subscribing and unsubscribing.

### Endpoints

- **Subscribe**: `POST /subscription/subscribe`
  - Description: Subscribe to a service.
  - Request Body:
    ```json
    {
        "name": "arcade",
        "type": 1,
        "monthlyPrice": 9,
        "addOns": [
            {
                "name": "arcade",
                "price": 2,
                "description": "test"
            }
        ]
    }
    ```
- **Unsubscribe**: `DELETE /subscription/unsubscribe`
  - Description: Unsubscribe from a service.

## Environment Variables

- `base_url`: `http://localhost:5050/api`

## Authorization

The collection includes JWT authorization. Upon successful login, a JWT token is generated and stored in the collection's environment variables. This token is then automatically included in subsequent requests requiring authentication.

---

Feel free to explore and utilize these endpoints for testing your multi-step form application. If you have any questions or need further assistance, please let me know!