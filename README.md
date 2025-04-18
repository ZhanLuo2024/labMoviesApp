# TMDB Client – Movie App

This is a single-page movie web application developed using **React**, **TypeScript**, and **Vite**. It integrates with **The Movie Database (TMDB)** API to display real movie data, while certain pages (like reviews and fantasy movies) interact with a custom **AWS backend**.

## Features

### Public Pages
- **Home (Discover Movies)**: Filter by genre and title using dropdown and text field.
- **Upcoming / Popular**: Lists upcoming and popular movies.
- **Movie Detail Page**: Shows overview, genres, runtime, revenue, release date.
- **Actor Detail Page**: Shows biography and known movies.
- **Search Page**: Allows multi-field search (title, genre, release year range).

### Private (Login Required)
- **My Reviews**: View and edit your own reviews.
- **Create Fantasy Movie**: Submit a fictional movie using a structured form.

## Technologies Used

- **Frontend**: React, TypeScript, React Router, Material UI, React Query, Axios
- **Backend**: AWS API Gateway + Lambda + DynamoDB (custom endpoints)
- **Authentication**: AWS Cognito (Email/Password)
- **Deployment**: AWS S3 (Static Hosting)

## Authentication

- This app uses real **AWS Cognito** authentication.
- After logging in, `token` and `userId` are stored in `localStorage`.
- For testing, open the app in Incognito Mode and manually log in with a valid user.
- No logout button is provided by design.

## Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev
```

## Notes
- All review and fantasy movie data is stored in the author's personal AWS backend.

- After the demo, the backend may be removed. Please refer to the demo video for behavior.

- The login form is fully functional and wired to Cognito, but only a test account is allowed.