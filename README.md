# NestJS CRUD Application with TypeORM, PostgreSQL, Docker, JWT, Passport, and Class Validator

This repository contains a CRUD (Create, Read, Update, Delete) application built using NestJS framework. It utilizes TypeORM as the database toolkit, PostgreSQL as the database engine, Docker for containerization, JWT for authorization, Passport for authentication, and the Class Validator library for user input validation.

## API'S Endpoints

List the available APIs and their endpoints:

- GET /users Retrieves all users.
- POST /users/signup Creates a new user.
- POST /users/signin Authenticates a user.
- PATCH /users/:id Updates a user's information.
- PATCH /users/changepassword/:id Changes a user's password.
- GET /users/:id Retrieves a specific user by ID.
- DELETE /users/:id Deletes a specific user by ID.
- DELETE /users Deletes all users.

For each API, provide the required data to send in the request body or as parameters.

## Getting Started

### Prerequisites

Before you start, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/download/): A JavaScript runtime for running the Next.js application.
- [Docker]([https://nodejs.org/en/download/]): A Docker to containerize the Postgres DB.
- [Postman]([[https://nodejs.org/en/download/](https://docs.docker.com/engine/install/]): A Postman to test Apis.
- [PNPM](https://pnpm.io/): A package manager (optional) for installing project dependencies.
- [Visual Studio Code (VSCode)](https://code.visualstudio.com/download) or your preferred Integrated Development Environment (IDE): A code editor with extensions that enhance your development experience.
- 

### Installation

1. **Install Node.js:**

   If you haven't already, download and install Node.js from the [official website](https://nodejs.org/en/download/) for your Windows operating system.

2. **Install PNPM (Optional):**

   While not required, you can install PNPM for managing project dependencies. To install PNPM globally, run:

   ```bash
   npm install -g pnpm

3. **Install Visual Studio Code (VSCode) or Your Preferred IDE:**

   Download and install Visual Studio Code from the official website or your preferred Integrated Development Environment (IDE). Ensure you have the necessary extensions and plugins installed for a seamless development experience.

4. **Create Folder and Open with VSCode:**

   - Create a new folder named "queue-management" on your desktop or any preferred location.
   - Open the "queue-management" folder using your Visual Studio Code (VSCode) or your preferred IDE.

5. **Pull Git Repository from GitHub:**

   To clone a Git repository from GitHub to your local machine, run the following command (replace <repository_url> with the actual repository URL):

   ```bash
   git clone https://github.com/iprime2/queue-system.git


This will create a local copy of the GitHub repository on your machine, which you can then work with.

6. **Install Project Dependencies:**

   Navigate to the project directory and run the following command to install project dependencies using npm or pnpm:

   ```bash
   # Using NPM (Node Package Manager)
   npm install

   # OR Using PNPM (Package Manager)
   pnpm install

7. **Create .env File:**

   Create a .env file in the project root and define your environment variables. Example:

   ```bash
   DB_USERNAME= db username
   DB_PASSWORD=db password
   DB_NAME= db name
   JWT_SECRET= jwt secret

### Start the Development Server

   To start the development server, run the following command:

    #Using NPM 
    npm run start:dev
      
    #OR Using PNPM
    pnpm run start:dev

The application should now be accessible in your browser at http://localhost:3000.
