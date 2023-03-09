import express from 'express'

const app = express()

app.get('/teste', (req, res) => {
  return res.send('ok')
})

export default app
