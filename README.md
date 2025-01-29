# scramble-grazac
# Word Scramble Game API

## Description
This is a **Word Scramble Game API** built with **Node.js, Express.js, and MongoDB**. The API allows users to fetch words, scramble them, guess the original word, and maintain a simple game session with scoring.

## Features
- Add new words to the database.
- Fetch all words from the database.
- Scramble words and start a game session.
- Guess the original word from the scrambled version.
- Maintain a score for each session.
- Automatic session timeout after 60 seconds.

## Technologies Used
- **Node.js** - Backend runtime environment
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database for storing words
- **Mongoose** - MongoDB ODM for schema modeling
- **dotenv** - Environment variable management
- **Cors** - Cross-Origin Resource Sharing

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/khaybee24/scramble-grazac.git
   cd scramble-grazac
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file and add the following:
   ```env
   PORT=4900
   MONGO_URI=your_mongodb_connection_string
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:4900/`

## API Endpoints

### Word Management
| Method | Endpoint        | Description |
|--------|---------------|-------------|
| POST   | `/api/v1/word/postwords` | Add a new word to the database |
| GET    | `/api/v1/word/fetchwords` | Fetch all words from the database |

### Game Routes
| Method | Endpoint        | Description |
|--------|---------------|-------------|
| GET    | `/api/v1/game/scramble?username=John` | Get a scrambled word to start a game session |
| POST   | `/api/v1/game/guess` | Submit a word guess |

#### Sample Request for `/guess`
```json
{
  "username": "John",
  "guess": "example"
}
```

#### Sample Response
```json
{
  "correct": true,
  "message": "Correct! 🎉",
  "score": 10,
  "scrambled": "xemlpae",
  "timeLimit": 60
}
```

## Folder Structure
```
project-folder/
├── controller/
│   ├── wordController.js
│   ├── gameController.js
│
├── helper/
│   ├── scramble.js
│
├── model/
│   ├── wordSchema.js
│
├── router/
│   ├── wordRouter.js
│   ├── gameRouter.js
│
├── Database/
│   ├── db.js
│
├── public/
│   ├── index.html
│
├── .env
├── server.js
├── package.json
└── README.md
```

## Error Handling
- **400 Bad Request** - Missing required fields (e.g., username, guess)
- **404 Not Found** - No words found in the database
- **500 Internal Server Error** - Unexpected issues with the database or server

## Deployment
This project can be deployed using **Vercel** or **Heroku**. Ensure to set up environment variables in the respective platform.

## Author
Developed by **Okeowo Abdulkabir** ([GitHub](https://github.com/khaybee24))

## License
This project is open-source and available under the MIT License.

