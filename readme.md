## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js: [Download Node.js](https://nodejs.org/)
- npm: Included with Node.js installation
- MongoDB: [MongoDB Atlas Account](https://www.mongodb.com/atlas/database)


## Installation

1. Clone the repository:

```bash
git clone https://github.com/shaikat17/crud_validity.git
```
2. Navigate to the project directory:
```bash
cd crud_validity
```
3. Install dependencies:
```bash
npm install
```

## Configuration
1. Create a **.env** file in the root of your project:
```bash
DB_URL=your-mongodb-connection-string
PORT=3000
```
Replace your-mongodb-connection-string with your MongoDB connection string.

## Running the Application
### Development Mode
```bash
npm run start:dev
```
#### To run the application in development mode with automatic restarts:
```bash
npm run build
npm start:prod
```
## Browse

Access the application at http://localhost:3000 in your web browser.