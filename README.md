MERN Stack Task Manager Project
This is a task manager web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The app allows users to create, read, update, and delete tasks.

Technologies Used
MongoDB: a NoSQL document database used to store task data.
Express.js: a Node.js web application framework used to build the backend API.
React.js: a JavaScript library used to build the frontend UI.
Node.js: a JavaScript runtime environment used to run the server-side code.
Bootstrap: a popular CSS framework used to style the UI.
Getting Started
Clone the repository

git clone https://github.com/your-username/mern-task-manager.git
Install dependencies in both the api and task-client folders

Copy code
cd api
npm install
cd ../task-client
npm install
Create a .env file in the server folder with the following environment variables:
makefile
Copy code
PORT=8000
MONGODB_URI=<your-mongodb-uri>
Start the server and client

Copy code
cd ../api
npm start
cd ../task-client
npm start
Open http://localhost:3000 in your browser to see the app.


