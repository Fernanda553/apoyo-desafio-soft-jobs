require('dotenv')
const express = require('express')
const cors = require('cors')
const { forRoutes } = require('./middleware/index')
const { createUser, verifyUserCredentials, jwtSign, readUser } = require('../utils/jwt')
const { verifyToken } = require('./middleware/usuarios.middleware')

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(forRoutes)

// registrar un usuario
app.post('/usuarios', (req, res) => {
  console.log('pase')
  createUser(req.body.email, req.body.password, req.body.rol, req.body.lenguage)
    .then(([user]) => res.status(201).json({ email: user.email }))
    .catch((error) => res.status(500).json(error))
})

// recibir credenciales y devolver un token
app.post('/login', verifyToken, (req, res) => {
  verifyUserCredentials(req.body.email, req.body.password)
    .then((user) => {
      user.length > 0
        ? res.status(200).json({ token: jwtSign({ email: req.body.email }) })
        : res.status(404).json({ code: 404, message: 'Recurso no encontrado' })
    })
    .catch((error) => res.status(500).json(error))
})

// devolver los datos de un usuario
app.get('/usuarios', verifyToken, (req, res) => {
  readUser(req.body.email, req.body.rol, req.body.lenguage)
    .then((user) => {
      user.length > 0
        ? res.status(200).json({ token: jwtSign({ email: req.body.email }) })
        : res.status(404).json({ code: 404, message: 'Recurso no encontrado' })
    })
    .catch((error) => res.status(500).json(error))
})

app.all('*', (_, res) => res.status(404).json({ code: 404, message: 'Esta ruta no existe 🧐' }))

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
