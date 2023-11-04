import * as sql from '../models/Usuarios.dao.js'
import HTTP_STATUS from '../../config/constants.js'
import { jwtSign } from '../../utils/jwt.js'
import { encrypt, compare } from '../../utils/crypt.js'

// registrar un usuario
export const registerUser = (req, res) => {
  const { email, password, rol, lenguage } = req.body
  console.log(password)
  const passEncrypted = encrypt(password)
  sql.createUser(email, passEncrypted, rol, lenguage)
    .then(([user]) => res.status(HTTP_STATUS.created.code).json({ id: user.id, email: user.email }))
    .catch((error) => res.status(HTTP_STATUS.internal_server_error.code).json(error))
}

// recibir credenciales y devolver un token
export const login = async (req, res) => {
  const { email, password } = req.body
  const response = await sql.verifyUser(email)
  if (!response.length) return res.status(HTTP_STATUS.not_found.code).json({ code: HTTP_STATUS.not_found.code, message: HTTP_STATUS.not_found.text })
  const [{ password: pass }] = response
  compare(password, pass)
    .then((userValid) => {
      userValid
        ? res.status(HTTP_STATUS.ok.code).json({ token: jwtSign({ email: req.body.email }) })
        : res.status(HTTP_STATUS.not_found.code).json({ code: HTTP_STATUS.not_found.code, message: HTTP_STATUS.not_found.text })
    })
    .catch((error) => res.status(500).json(error))
}

// devolver los datos de un usuario
export const returnUser = (req, res) => {
  sql.getUser(req.body.email, req.body.rol, req.body.lenguage)
    .then(([user]) => {
      user.length > 0
        ? res.status(HTTP_STATUS.ok.code).json({ token: jwtSign({ email: req.body.email }) })
        : res.status(HTTP_STATUS.not_found.code).json({ code: HTTP_STATUS.not_found.code, message: HTTP_STATUS.not_found.text })
    })
    .catch((error) => res.status(HTTP_STATUS.internal_server_error.code).json(error))
}
