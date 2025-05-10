# CoRider Chat Screen Assignment

A modern chat interface implementation for the CoRider ride-sharing application, built with React Native and Expo.

## Demo Video
[Watch Demo Video](./Corider1.mp4)

## Features

- **Real-time Chat Interface**
  - Message bubbles with different styles for sender and receiver
  - Support for multi-line messages
  - Timestamp display
  - Avatar support for non-self messages

- **Trip Information Display**
  - Trip name
  - Source and destination
  - Group member avatars
  - Date separator

- **Interactive UI Elements**
  - Floating action pad for media attachments
  - Message input bar with attachment and send buttons
  - Overflow menu with options (Members, Share Number, Report)
  - Back navigation

- **Performance Optimizations**
  - Infinite scroll with pagination
  - Efficient message rendering
  - Loading indicators
  - Smooth scrolling experience

## Tech Stack

- React Native
- Expo
- React Native Vector Icons
- Axios for API calls
- React Native Safe Area Context

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/Devansh-Bhagania/coRider-1
cd coRider-1
```

2. Install dependencies:
```bash
npm install
```

3. Install vector icons:
```bash
npm install react-native-vector-icons
```

4. Start the development server:
```bash
npx expo start
```

## API Integration

The chat screen integrates with the CoRider API endpoint:
```
https://qa.corider.in/assignment/chat
```

The API supports pagination with the `page` query parameter.

## Contact

Email - devanshbhagania19@gmail.com