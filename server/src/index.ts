import express from 'express'
import cors from 'cors'
import {buildSchema} from 'graphql'
import {graphqlHTTP} from 'express-graphql'
import { fetchPokemon } from './pokemon'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/message', (req, res) => {
  res.json({ message: "Hello from server!" })
})

app.get('/pokemon', async (req, res) => {
  const { error, data } = await fetchPokemon()
  if (error) {
    res.json({error})
  }
  res.json(data)
})

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`)
})
