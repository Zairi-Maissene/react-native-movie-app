# Movie Search and Details App

This is a React Native application built with Expo that allows users to search for movies and view detailed information about them using the OMDB API.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Features

- Search for movies by title
- Paginated search results through a large collection of movies
- View detailed information about movies, including title, year, genre, director, actors, plot, ratings, and more
- Responsive design suitable for mobile devices
- Light and dark mode support

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Zairi-Maissene/react-native-movie-app.git
    ```
2. Navigate to the project directory:
    ```bash
    cd react-native-movie-app
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Install the Expo CLI if you haven't already:
    ```bash
    npm install -g expo-cli
    ```

## Usage

1. Obtain an API key from [OMDB API](http://www.omdbapi.com/apikey.aspx).
2. Create a `.env` file in the root directory and add your API key:
    ```plaintext
    EXPO_PUBLIC_MOVIES_API_KEY=your_api_key_here
    ```
3. Start the Expo development server:
    ```bash
    expo start
    ```
4. Open the Expo Go app on your mobile device and scan the QR code to run the application.

