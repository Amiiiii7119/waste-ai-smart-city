import {Link} from "react-router-dom"

export default function Navbar(){
 return(
  <div style={{display:"flex",gap:20,padding:20,background:"#0f172a",color:"white"}}>
   <Link to="/">Home</Link>
   <Link to="/dashboard">Dashboard</Link>
   <Link to="/leaderboard">Leaderboard</Link>
   <Link to="/marketplace">Marketplace</Link>
   <Link to="/education">Education</Link>
   <Link to="/game">AR Game</Link>
  </div>
 )
}