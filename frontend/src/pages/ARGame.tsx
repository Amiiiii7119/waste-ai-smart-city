import { useState } from "react"

const items = [
  { name: "Banana Peel", type: "Organic" },
  { name: "Plastic Bottle", type: "Recyclable" },
  { name: "Battery", type: "Hazardous" }
]

export default function ARGame() {

  const [score, setScore] = useState(0)

  const check = (correct: string, chosen: string) => {

    if (correct === chosen) setScore(score + 10)

  }

  return (
    <div style={{ padding: 40 }}>

      <h1>Waste Sorting Game</h1>

      <h2>Score: {score}</h2>

      {items.map((item, i) => (

        <div key={i}>

          <p>{item.name}</p>

          <button onClick={() => check(item.type, "Organic")}>Green Bin</button>
          <button onClick={() => check(item.type, "Recyclable")}>Blue Bin</button>
          <button onClick={() => check(item.type, "Hazardous")}>Red Bin</button>

        </div>

      ))}

    </div>
  )
}