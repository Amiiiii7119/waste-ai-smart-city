import express from "express"
import fetch from "node-fetch"

const router = express.Router()

router.post("/", async (req,res)=>{

  const {message} = req.body

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions",{

    method:"POST",

    headers:{
      "Authorization":`Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type":"application/json"
    },

    body:JSON.stringify({
      model:"openai/gpt-3.5-turbo",
      messages:[{role:"user",content:message}]
    })

  })

  const data = await response.json()

  res.json(data)

})

export default router