import express from 'express'
import dotenv from 'dotenv'
import connection from './config/connection.js'
import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import taskRoutes from './routes/taskRoutes.js';

const app=express()
dotenv.config()
app.use(express.json())
const PORT = process.env.PORT || 3000

connection()

app.use('/api/users',userRoutes)
app.use('/api/projects',projectRoutes)
app.use('/api/tasks', taskRoutes); 

app.listen(PORT,()=>{
    console.log(`Server is runinig on port :${PORT}`)
})
