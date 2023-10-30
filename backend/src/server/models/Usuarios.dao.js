import 'dotenv/config'
import genericSqlQuery from '../databases/db.js'

export const createUser = async (email, password, rol, lenguage) => await genericSqlQuery('INSERT INTO usuarios (id, email, password, rol, lenguage) VALUES (DEFAULT ,$1, $2, $3, $4) RETURNING *;', [email, password, rol, lenguage])

export const verifyUserCredentials = async (email, password) => await genericSqlQuery('SELECT * FROM usuarios WHERE email = $1 AND password = $2;', [email, password])

export const getUser = async (email, rol, lenguage) => await genericSqlQuery('SELECT * FROM usuarios WHERE email = $1 AND rol AND = $2 lenguage = $3;', [email, rol, lenguage])
