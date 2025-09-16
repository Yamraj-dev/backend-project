# Backend Project

A personal backend project built with Node.js, Express, and MongoDB.

## Features

- User registration and authentication (JWT-based)
- File uploads (avatar, cover image) using Multer and Cloudinary
- User session management with cookies
- Modular code structure (controllers, models, routes, middlewares)
- MongoDB integration with Mongoose
- Error handling and API response utilities
- Video upload, view tracking, and management
- Playlist creation and management
- Comments, likes, and subscriptions for videos and channels
- Tweet-like functionality for user posts

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
│   │   ├── comment.controller.js
│   │   ├── like.controller.js
│   │   ├── playlist.controller.js
│   │   ├── subscription.controller.js
│   │   ├── tweet.controller.js
│   │   ├── user.controller.js
│   │   └── video.controller.js
│   ├── db/
│   │   └── db.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── multer.middleware.js
│   ├── models/
│   │   ├── comment.model.js
│   │   ├── like.model.js
│   │   ├── playlist.model.js
│   │   ├── subscription.model.js
│   │   ├── tweet.model.js
│   │   ├── user.model.js
│   │   ├── video.model.js
│   │   └── videoView.model.js
│   ├── routes/
│   │   ├── comment.route.js
│   │   ├── like.routes.js
│   │   ├── playlist.routes.js
│   │   ├── subscription.routes.js
│   │   ├── tweet.routes.js
│   │   ├── user.routes.js
│   │   └── video.route.js
│   └── utils/
│       ├── ApiError.js
│       ├── ApiResponse.js
│       ├── asyncHandler.js
│       ├── cloudinary.js
│       └── oldImageDelete.js
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

### User Endpoints
- `POST /api/v1/users/register` — Register a new user (with avatar and optional cover image)
- `POST /api/v1/users/login` — Login with username/email and password
- `POST /api/v1/users/logout` — Logout the current user (requires authentication)
- `GET /api/v1/users/profile/:id` — Get user channel profile
- `GET /api/v1/users/me` — Get current logged-in user
- `PUT /api/v1/users/username` — Update username
- `PUT /api/v1/users/fullname` — Update full name
- `PUT /api/v1/users/avatar` — Update avatar
- `PUT /api/v1/users/cover-image` — Update cover image
- `POST /api/v1/users/refresh-token` — Refresh access token
- `PUT /api/v1/users/change-password` — Change current password
- `GET /api/v1/users/watch-history` — Get user watch history

### Video Endpoints
- `POST /api/v1/videos` — Upload a new video
- `GET /api/v1/videos/:id` — Get video details
- `GET /api/v1/videos` — List all videos
- `PUT /api/v1/videos/:id` — Update video details
- `DELETE /api/v1/videos/:id` — Delete a video

### Playlist Endpoints
- `POST /api/v1/playlists` — Create a new playlist
- `GET /api/v1/playlists/:id` — Get playlist details
- `GET /api/v1/playlists` — List all playlists
- `PUT /api/v1/playlists/:id` — Update playlist
- `DELETE /api/v1/playlists/:id` — Delete playlist

### Comment Endpoints
- `POST /api/v1/comments` — Add a comment to a video
- `GET /api/v1/comments/:videoId` — Get comments for a video
- `GET /api/v1/comments/user/:userId` — Get comments by a user
- `PUT /api/v1/comments/:id` — Update a comment
- `DELETE /api/v1/comments/:id` — Delete a comment
- `GET /api/v1/comments/:id` — Get a specific comment

### Like Endpoints
- `POST /api/v1/likes/video/:videoId` — Like a video
- `POST /api/v1/likes/comment/:commentId` — Like a comment
- `GET /api/v1/likes/video/:videoId` — Get likes for a video
- `GET /api/v1/likes/comment/:commentId` — Get likes for a comment
- `DELETE /api/v1/likes/video/:videoId` — Remove like from a video
- `DELETE /api/v1/likes/comment/:commentId` — Remove like from a comment

### Subscription Endpoints
- `POST /api/v1/subscriptions` — Subscribe to a channel
- `DELETE /api/v1/subscriptions/:id` — Unsubscribe from a channel
- `GET /api/v1/subscriptions` — List subscriptions

### Tweet Endpoints
- `POST /api/v1/tweets` — Post a tweet-like message
- `GET /api/v1/tweets/:id` — Get tweet details
- `GET /api/v1/tweets` — List all tweets
- `PUT /api/v1/tweets/:id` — Update a tweet
- `DELETE /api/v1/tweets/:id` — Delete a tweet

## 📌 Postman Collection

You can test all APIs using my Postman collection.

👉 [Download the Postman Collection](./postman/backend-project-apis.postman_collection.json)

After downloading:
1. Open Postman.
2. Click on **Import** (top-left).
3. Select the downloaded `.json` file.
4. You’re ready to test all the API endpoints.


## License

ISC

---

**Author:** Prathamesh Monde