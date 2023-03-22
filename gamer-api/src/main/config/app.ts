import express from 'express'
import setupRoutes from '@/main/config/routes'

const app = express()

app.use(express.json())

setupRoutes(app)

export default app
