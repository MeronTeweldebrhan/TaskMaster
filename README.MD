# Task Master 
A backend app ready to full-stack-REST API for managing Users, Projects, and Tasks. Built with Express, MongoDB, and JWT-based authentication.


## Project Structure
```project-root/
├── config/             # DB connection
├── controllers/        # Route handler logic
├── models/             # Mongoose schemas
├── routes/
│   └── api/
│       ├── userRoutes.js
│       ├── projectRoutes.js
│       └── taskRoutes.js
├── utils/              # auth (JWT middleware)
├── .env
├── .gitignore
├── server.js           # Entry point
```
## Setup Instructions
1.Clone the repository.
2.Run npm install
3.Create a .env file
```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_super_secret
PORT=3000
npm run start
```

##  Authentication
- Uses JWT tokens for secure authentication.
- Protected routes require the token in the Authorization header:
- Authorization: Bearer <your_token_here>
## API Endpoints

``` 
 - Users
Method	   Endpoint	         Description
POST	/api/users/register	 Register new user
POST	/api/users/login	 Login and receive token

-Projects (Protected)
Method	  Endpoint	          Description
POST	/api/projects	      Create new project
GET	    /api/projects	       Get all user's projects
GET	   /api/projects/:id	    Get a specific project
PUT	     /api/projects/:id	    Update a project
DELETE	/api/projects/:id	  Delete a project

Tasks (Nested under projects, all protected)
Method	   Endpoint	                Description
POST	  /api/tasks/:projectId	     Create task for a project
GET	    /api/tasks/:projectId	     Get all tasks for a project
PUT	    /api/tasks/:taskId	          Update a task
DELETE	 /api/tasks/:taskId	         Delete a task
```
### Notes
- Ensure all project/task operations are performed only by the owner.
- Passwords are hashed with bcrypt.
- JWT tokens are issued for session-less authentication
### Tech Stack
- Node.js
- Express.js
- MongoDB & Mongoose
- bcrypt
- JWT (jsonwebtoken)
- dotenv