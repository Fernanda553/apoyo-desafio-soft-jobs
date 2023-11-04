import bcrypt from 'bcryptjs'

export const encrypt = (password) => bcrypt.hashSync(password)

export const compare = (password, pass) => bcrypt.compare(password, pass)
