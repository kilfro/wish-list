import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import v1Router from './routers/v1'

const app = express()
const port = process.env.SERVER_PORT || 3001

app.use(cors({
    origin: 'http://localhost:3000',
}))
app.use(express.json())
app.use(morgan('common'))

app.use('/api/v1', v1Router)

app.listen(port, () => console.log(`Started listening on port ${port}`))