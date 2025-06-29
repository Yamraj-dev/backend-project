# Backend Project

A personal backend project built with Node.js, Express, and MongoDB.

## Features

- User registration and authentication (JWT-based)
- File uploads (avatar, cover image) using Multer and Cloudinary
- User session management with cookies
- Modular code structure (controllers, models, routes, middlewares)
- MongoDB integration with Mongoose
- Error handling and API response utilities

## Project Structure

```
.
├── public/
│   └── temp/
├── src/
│   ├── app.js
│   ├── constants.js
│   ├── index.js
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── utils/
├── .env
├── package.json
└── Readme.md
```

## Getting Started

### Prerequisites

- Node.js >= 18.x
- MongoDB instance (local or cloud)
- Cloudinary account (for file uploads)

### Installation

1. Clone the repository:
    ```sh
    git clone <repo-url>
    cd backend-project
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory with the following variables:
    ```
    PORT=5000
    MONGODB_URL=mongodb://localhost:27017
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ACCESS_TOKEN_SECRET=your_access_token_secret
    ACCESS_TOKEN_EXPIRY=1d
    REFRESH_TOKEN_SECRET=your_refresh_token_secret
    REFRESH_TOKEN_EXPIRY=7d
    CORS_ORIGIN=http://localhost:3000
    ```

4. Start the development server:
    ```sh
    npm run dev
    ```

## API Endpoints

- `POST /api/v1/users/register` — Register a new user (with avatar and optional cover image)
- `POST /api/v1/users/login` — Login with username/email and password
- `POST /api/v1/users/logout` — Logout the current user (requires authentication)

## License

ISC

---

**Author:** Prathamesh Monde