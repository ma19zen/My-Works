# Image Processing Web App
## Table of Contents
- [Project Overview](##project-overview)
- [Setup Instructions](##setup-instructions)
- [How to test and run the project](##How-to-test-and-run-the-project)
- [Project Structure](##project-structure)
- [Backend Features](##backend-features)
- [Frontend Features](##Frontend-Features)
- [Contributing](#contributing)


## Project-Overview

This project is a scalable Node.js application built with Express and TypeScript that allows users to upload JPG images, resize them via an API, and serves both original and resized images. It features:

* **Responsive Frontend**: A simple, user-friendly frontend interface for interacting with the API.
* **Placeholder Image Generator**: Generate images with customized dimensions on-demand.
* **Cached Image Library**: Stores uploaded images (image gallery) to avoid redundant uploading.
* **Image Uploads**: Upload new JPG images via API and view them in a dynamic frontend image gallery.
* **Image resizing**: Resize JPG images via API and view them in a dynamic frontend form after resizing.


This project demonstrates best practices in backend API development, TypeScript typing, unit testing, linting, formatting, and client-server integration.

---

## Setup Instructions

### Prerequisites

* Node.js (v14 or higher)
* npm (Node package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url> 
   cd image-processing-web-app
   ----------------------------
   [or download the zip file]
   ```
    
2. Install Dependencies If It Does Not Exist:

   ```bash
   npm install
   ```

### Running the server

1. Start the backend server:

   ```bash
   npm run server
   ```

   This will start the backend server on `http://localhost:3000`.
### How to test and run the project

- `npm run build` – Compile TypeScript into JavaScript
- `npm run server` – TO Start the backend using ts-node Normally
- `npm run dev` – TO Start the backend in dev mode with hot reloading (ts-node-dev)
- `npm run test` – Run Jasmine unit tests
- `npm run lint` – Lint TypeScript and JavaScript files
- `npm run lint:fix` – TO Automatically fix linting issues
- `npm run format` – TO Format all relevant source files using Prettier
- `npm run check-format` – Check formatting consistency using Prettier
---

   Open `http://localhost:3000` in your browser to access the frontend interface.

---

## Project Structure

The project is organized into a clear structure to maintain scalability and modularity:

* **`src/`**: Contains the source code for backend

        1. app.ts: Backend server using Express and TypeScript.
        2. routes/: (imageRoutes.ts) API routes for image processing and uploading.
        3. controllers/: (imageController.ts) Contains the functions including image resizing and caching.
        4. tests/: Unit tests using Jasmine for backend functionality.
        5. uploads/:Contains both the photos uploaded by user and the resized ones
                 The photos uploaded by the user and some templates
                 resized/: Contains The resized photos by the api
---
* **`front/`**: Frontend assets.
        1. **`assets`**: Contains client-side scripts (`script.js`) and styles (`style.css`).
---
* **`index.html`** Main HTML file for the frontend, for interacting with the API.
---
* `tsconfig.json`The TYPESCRIPT configuration file
* `package.json`the heart of this Node project
* `.eslintrc.json` ESLint testing
* `.prettierrc`Prettier testing
* **`README.md`** 
---



## API Endpoints IN this project

### 1. **Upload Image**

**Endpoint**: `POST /upload`

**Description**: Upload a JPG image to the server.

**Request**:

* Content-Type: `multipart/form-data`
* Form Field: `image` (JPG only)

**Responses**:

* `201 Created`: Image uploaded successfully
* `400 Bad Request`: No file uploaded
* `415 Unsupported Media Type`: Only JPG/JPEG supported

### 2. **Resize Image**

**Endpoint**: `GET /resize`

**Query Parameters**:

* `filename`: Original image filename (e.g., `photo.jpg`)
* `width`: Target width (positive integer)
* `height`: Target height (positive integer)

**Description**: Resize an uploaded image. If the resized version exists, it returns the cached image.

**Responses**:

* `200 OK`: Returns the resized image file
* `400 Bad Request`: Missing or invalid parameters
* `404 Not Found`: Original image not found
* `500 Internal Server Error`: Error during processing

### 3. **List Images**

**Endpoint**: `GET /list`

**Description**: Returns a list of all original JPG images stored to the Frontend UI (excluding resized versions).

**Responses**:

* `200 OK`: Array of image filenames
* `500 Internal Server Error`: Error reading the uploads directory

---



### Backend Features

* **Image Resizing**: Resize JPG images on-the-fly using query parameters.
* **Image Upload**: API endpoint for uploading JPG images.
* **Caching**: Store resized images to improve performance and reduce redundant processing.

### Frontend Features

* **Image Gallery**: Display uploaded images with options to view original and resized versions.
* **Placeholder Images**: Generate placeholder images with custom dimensions.
* **User-friendly Interface**: Simple and responsive design for easy navigation and interaction.

---

## Contributing

Feel free to edit the project , comment on it , and document any changes.

---

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)