import { useEffect, useState } from "react"

export default function Leaderboard() {

  const [data, setData] = useState<any>({})

  const load = async () => {

    try {

      const res = await fetch("http://localhost:5000/api/leaderboard")

      const json = await res.json()

      setData(json)

    } catch (err) {

      console.error("Leaderboard fetch error", err)

    }

  }

  useEffect(() => {

    load()

    const interval = setInterval(load, 3000)

    return () => clearInterval(interval)

  }, [])

  return (

    <div style={{ padding: 40 }}>

      <h1>Leaderboard</h1>

      <p>Total points: {data.total_points || 0}</p>

      <p>Total scans: {data.scans || 0}</p>

    </div>

  )

}