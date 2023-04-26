import express from 'express'
import cors from 'cors'
import { useRouter } from './router/useRouter'
import { postRouter } from './router/postRouter'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.use("/users", useRouter)
app.use("/posts", postRouter)