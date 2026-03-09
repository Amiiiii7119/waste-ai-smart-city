import { useState } from "react"
import { scanWaste } from "../services/api"

export default function WasteScanner() {

 const [image,setImage] = useState<string | null>(null)
 const [file,setFile] = useState<File | null>(null)
 const [result,setResult] = useState<any>(null)
 const [points,setPoints] = useState<number>(0)

 const handleUpload = (e:any)=>{
  const f = e.target.files?.[0]
  if(!f) return

  setFile(f)
  setImage(URL.createObjectURL(f))
  setResult(null)
 }

 const handleScan = async ()=>{
  if(!file) return

  const res = await scanWaste(file)

  setResult(res)
  setPoints(prev => prev + 10)
 }

 return (

  <div style={{marginTop:30}}>

   <h2>Waste Scanner</h2>

   <input type="file" onChange={handleUpload} />

   {image && (
    <div style={{marginTop:20}}>
     <img
      src={image}
      alt="preview"
      style={{width:300,borderRadius:8}}
     />
    </div>
   )}

   <div style={{marginTop:20}}>
    <button onClick={handleScan}>Scan Waste</button>
   </div>

   <div style={{marginTop:20}}>
    <b>Total Points:</b> {points}
   </div>

   {result && (
    <div
     style={{
      marginTop:30,
      padding:20,
      background:"#111",
      color:"white",
      width:"320px",
      borderRadius:8
     }}
    >
     <h3>Classification Result</h3>

     <p><b>Waste Type:</b> {result.category}</p>
     <p><b>Confidence:</b> {result.confidence}</p>
     <p><b>Recommended Bin:</b> {result.bin}</p>

     <hr/>

     <h4>Environmental Impact</h4>

     <p>CO₂ Saved: {result.carbon_saved}</p>
     <p>Water Saved: {result.water_saved}</p>

     <hr/>

     <p>{result.instructions}</p>

    </div>
   )}

  </div>

 )

}