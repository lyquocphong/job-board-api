# Job Board API

REST API that exposes endpoints for the Job Board frontend.

- Repository: [job-board-board](https://github.com/lyquocphong/job-board-api)

## Table of Contents

- [Dependencies](##dependencies)
- [Author](##author)
- [Features](#features)
- [Installation](#installation)
- [Testing](##testing)
- [License](#license)

## Dependencies
------------

-   Node.js (v18)
-   Docker
-  

## Author

- Phong Ly
- Email: lyquocphong@gmail.com
- GitHub: [phong ly](https://github.com/lyquocphong)

## Features

- Fetch all jobs
- Fetch job by ID
- Create a new job
- Update an existing job
- Delete a job
- Generate job descriptions

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Prisma
- Docker
- Docker Compose

## Requirements

- Node.js
- Docker
- Docker Compose

## Getting Started

1. Clone the repository. `git clone https://github.com/your-username/job-board-board.git`
2. Navigate to the project directory.
3. Install dependencies: `npm install`
4. Set up environment variables by create .env from example.env
5. Start the application using Docker Compose: `npm run docker:dev`

The API will be accessible at `http://localhost:port`. The port is the one config in .env

## API Documentation

- Access the Swagger UI to explore and interact with API endpoints at `http://localhost:port/swagger`. The port is the one config in .env

## Future Work

- Implement user authentication and authorization.
- Add pagination and sorting for job listings.
- Implement search functionality.
- Enhance error handling and validation.
- Tuning way to generate description better
- Caching to save the token when working with openai

## Testing

The API includes unit tests using the Jest framework.

To run the tests, use the following command: `npm run test`

## License

This project is licensed under the MIT License.