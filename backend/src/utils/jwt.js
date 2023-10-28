require('dotenv').config()
const jwt = require('jsonwebtoken')
const KEY = process.env.JWT_SECRET_KEY
const { genericSqlQuery } = require('../server/databases/db')

const createUser = async (email, password, rol, lenguage) => {
  const query = 'INSERT INTO usuarios(id, email, password, rol, lenguage) VALUES (DEFAULT ,$1, $2, $3, $4) RETURNING *;'
  const values = [email, password, rol, lenguage]
  return await genericSqlQuery(query, values)
}

const verifyUserCredentials = async (email, password) => await genericSqlQuery('SELECT * FROM usuarios WHERE email = $1 AND password = $2;', [email, password])

const jwtVerify = (token) => jwt.verify(token, KEY, (err, decoded) => {
  if (err) throw err
  return decoded
})

const jwtSign = (payload) => jwt.sign(payload, KEY, { expiresIn: 60 * 5 })

const readUser = async (email, rol, lenguage) => await genericSqlQuery('SELECT * FROM usuarios WHERE email = $1 AND rol AND = $2 lenguage = $3;', [email, rol, lenguage])

module.exports = {
  createUser,
  verifyUserCredentials,
  jwtVerify,
  jwtSign,
  readUser
}
