const { jwtVerify } = require('../../utils/jwt')

const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization
  if (authorizationHeader) {
    return res.status(401).json({
      code: 401,
      message: 'Token no proporcionado'
    })
  }
  const { bearer, token } = authorizationHeader.split(' ')
  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({
      code: 401,
      message: 'Formato del token inválido.'
    })
  }
  try {
    jwtVerify(token) && next()
  } catch (error) {
    return res.status(401).json({
      code: 401,
      message: 'Token inválido'
    })
  }
}

module.exports = verifyToken
