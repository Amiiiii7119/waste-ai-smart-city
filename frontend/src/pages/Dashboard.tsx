import { useEffect, useState } from "react"

export default function Dashboard() {

  const [stats, setStats] = useState<any>({})

  const load = async () => {

    try {

      const res = await fetch("http://localhost:5000/api/category-stats")

      const data = await res.json()

      setStats(data)

    } catch (err) {

      console.error("Dashboard fetch error", err)

    }

  }

  useEffect(() => {

    load()

    const interval = setInterval(load, 3000)

    return () => clearInterval(interval)

  }, [])

  return (

    <div style={{ padding: 40 }}>

      <h1>City Waste Analytics</h1>

      <p>Total scans: {stats.total_scans || 0}</p>

    </div>

  )

}