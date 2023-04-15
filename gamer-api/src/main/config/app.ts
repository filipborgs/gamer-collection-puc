import express from 'express'
import setupRoutes from '@/main/config/routes'
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cors())
setupRoutes(app)

export default app
