# DCS Frontend

This project is an Angular application for managing Charge Data Records (CDR) for electric vehicle charging. The application includes the following features:
- Login Page
- Display charging records in a table with pagination
- Sorting the table by Start Time, End Time, and Total Cost in ascending and descending order
- Filtering table records by ID
- Welcome message with the user's name at the top right corner
- Uses NgRx Signal Store for state management
- Uses Bootstrap for styling

## Prerequisites

- Node.js and npm installed
- Angular CLI installed (`npm install -g @angular/cli`)

## Installation

1. Install dependencies:

    npm install

## Running the Application

1. Start the development server:

    npm start


## Configuration

### Application Configuration

The application uses `src/environments/environment.ts` for configuration. Make sure to update the API endpoints and other configurations as needed.

### Mock Data

Mock data for records is stored in `src/assets/mock-records.json`. The application can switch between live API mode and mock data mode.

## Features

### Login Page

The login page allows users to log in using their credentials. After successful login, the user is redirected to the records list page.

username : testUser
password: testPassword

### Records List

The records list page displays a table of charging records with the following functionalities:
- **Pagination**: Navigate through pages of records.
- **Sorting**: Sort records by Start Time, End Time, and Total Cost in both ascending and descending order.
- **Filtering**: Filter records by Charging Session ID.

### Welcome Message

Displays a welcome message with the username of the logged-in user at the top right corner. A logout button is also provided.

## Known Issues

- The filtering mechanism still has some issues where removing the filter does not restore all records. This needs to be addressed in future updates.

- Dockerization of the Angular app has some issue related to paths and accessiblity for the nginx server

## State Management

The application uses NgRx Signal Store for state management. The state is persisted across page reloads using local storage.

## CSS Framework

The application uses Bootstrap for styling. Ensure Bootstrap is correctly installed and imported in `src/styles.css`:
```css
@import '~bootstrap/dist/css/bootstrap.min.css';
