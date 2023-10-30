import express from 'express'
import * as usuarios from '../controllers/usuarios.controller.js'

const router = express.Router()
// Login y registro de usuarios
router.post('/usuarios', usuarios.registerUser)
router.post('/login', usuarios.login)

// Obtener usuario por token
router.get('/usuarios', usuarios.returnUser)

export default router
