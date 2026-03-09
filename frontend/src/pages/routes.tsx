import { useEffect, useState } from "react"

interface RouteData {
  ward: string
  scans: number
  total_points: number
}

export default function Routes() {

  const [routes, setRoutes] = useState<RouteData[]>([])

  const loadRoutes = async () => {
    const res = await fetch("http://localhost:5000/api/routes")
    const data = await res.json()
    setRoutes(data.routes)
  }

  useEffect(() => {

    loadRoutes()

    const interval = setInterval(loadRoutes, 3000)

    return () => clearInterval(interval)

  }, [])

  return (

    <div style={{ padding: "40px" }}>

      <h1>Waste Collection Route Priority</h1>

      <table style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Ward</th>
            <th>Scans</th>
            <th>Total Points</th>
          </tr>
        </thead>

        <tbody>

          {routes.map((r, i) => (

            <tr key={i}>
              <td>{r.ward}</td>
              <td>{r.scans}</td>
              <td>{r.total_points}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )
}