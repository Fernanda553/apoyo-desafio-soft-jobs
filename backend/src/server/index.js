import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import * as routes from './routes/index.js'
import forRoutes from './middlewares/index.js'

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(forRoutes)

app.use(routes.usuarios)

app.all('*', (_, res) => res.status(404).json({ code: 404, message: 'Esta ruta no existe 🧐' }))

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))

export default app
