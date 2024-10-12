# URL Shortener Web Application

This project is a URL shortener web application that allows users to log in, create, and manage short URLs, while also tracking statistics on their links. Users can generate random short URLs or choose custom short URLs if they are available.

## Features

- **User Authentication**: Users can log in using their email and password.
- **URL Shortening**:
  - Users can paste a long URL to generate a randomly created short URL.
  - Users have the option to enter a custom short URL, which is accepted if it has not been used previously.
- **Link Management**:
  - Users can view all their previously created short URLs.
  - Users can edit their existing short URLs.
  - Users can delete their created short URLs.
- **Statistics Tracking**: Users can track the number of visits for each of their short URLs.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**

    ```bash
    git clone https://github.com/sogalabhi/shrinker.git
    cd shrinker
    ```

2. **Install Dependencies**

    Navigate to both the frontend and backend directories and install the required packages:

    ```bash
    # Frontend setup
    npm i

    # Backend setup
    cd backend
    npm i
    ```

3. **Start the Application**

    ```bash
    # Frontend setup
    npm run dev

    # Backend setup
    cd backend
    nodemon index.js
    # and run the python file in backend folder
    ```

    The frontend will run on `http://localhost:5173` and the backend on `http://localhost:3000`.

## VIdeo demo


https://github.com/user-attachments/assets/bdc04547-d5e5-4ffd-b3e6-eed7baf14db9


