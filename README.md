# Shortit - URL Shortener

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Example Request/Response](#example-requestresponse)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

**Shortit** is a URL shortening service that allows users to generate custom and compact URLs from long, cumbersome links. Users can create unique short URLs with custom aliases, making it ideal for sharing across platforms.

The project is built using **Node.js**, **Express.js**, **MongoDB**, and includes custom error handling and validation with `express-validator` and custom middleware. The service allows both standard and customized URL shortening, with a simple and scalable backend structure.

## Features

- Shorten any URL.
- Custom alias support (e.g., `shortit/custom-alias`).
- Automatically generate random short URLs.
- Track original URLs and their shortened counterparts.
- Detailed error handling for invalid or duplicate entries.
- Easy-to-use API for integration with other services.

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (version 20 or later)
- MongoDB (version 8 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mosidrum/url_shortner.git
   cd url_shortner
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

### Running the Project

To start the server, make sure MongoDB is running locally or on a cloud instance.

1. Create a `.env` file in the project root:
   ```bash

   ```
2. PORT=5000
   MONGODB_URI=mongodb://localhost:27017/shortit
   BASE_URL=https://shortit

   ```

   ```

3. Start the application:

   ```bash
   npm run dev
   ```

4. The application will be running on `http://localhost:5000`.

## Usage

### API Endpoints

```bash
- **POST** `/api/v1/urls/`: Shortens a given URL.
- **GET** `/api/v1/urls/`: Redirects the user to the original URL.
- **PATCH** `/api/v1/urls/:id`: Update the original URL for a specific shortened URL.
- **DELETE** `/api/v1/urls//:id`: Deletes a shortened URL by ID.

```

### Example Request/Response

**Create a Shortened URL**

```bash
POST /shorten
{
"originalUrl": "https://www.example-of-a-long-url-shortit-project.com",
"customName": "my project"
}
```

**Response**

```json
{
  "data": {
    "shortUrl": "https://shortit/my-project",
    "originalUrl": "https://www.example-of-a-long-url-shortit-project.com",
    "createdAt": "2024-08-28T12:00:00Z"
  }
}
```

## Project Structure

```
shortit/
├── src/
│ ├── controllers/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── index.ts
├── tests/
├── .env
├── .gitignore
├── README.md
├── package.json
└── tsconfig.json
```

- **`controllers/`**: Contains the business logic for handling requests and responses.
- **`middlewares/`**: Custom middleware for validation, error handling, etc.
- **`models/`**: Mongoose models for storing URLs in the MongoDB database.
- **`routes/`**: Route definitions for handling API requests.
- **`utils/`**: Utility functions like custom error handling and response formatting.

## Technologies

- **Node.js** - Backend runtime environment.
- **Express.js** - Web framework for building REST APIs.
- **MongoDB** - NoSQL database for storing URLs.
- **Mongoose** - ODM for managing MongoDB.
- **TypeScript** - Type safety for the backend.
- **express-validator** - Middleware for handling validation logic.
- **Winston** - Logging utility for error and request tracking.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, feel free to reach out:

- **Name**: Isaac Ayodele
- **Email**: [isaacmosiayodele@gmail.com](mailto:isaacmosiayodele@gmail.com)
- **GitHub**: [mosidrum](https://github.com/mosidrum)
