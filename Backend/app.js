import express from "express"
import cors from "cors"
import { errorMiddleware } from "./middleware/error.middleware"
const app = express()
app.use(errorMiddleware)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extends:true}))

app.get("/health",(_,res)=>{
  res.status(200).json({status:"OK"})
})

export default app