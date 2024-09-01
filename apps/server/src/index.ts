import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import router from './router'


const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

//TODO: RUTAS
app.use('/api/products', router)


//TODO: PUERTO
const port = process.env.PORT || 5001
app.listen(port, () => {
  console.log(`Server API running on http://localhost:${port}`)
})
