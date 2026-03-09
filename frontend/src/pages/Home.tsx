import WasteScanner from "../components/WasteScanner"

export default function Home(){

 return(

  <div style={{padding:40}}>

   <h1>WasteAI</h1>

   <p>
    AI Powered Smart Waste Segregation Platform
   </p>

   <p>
    WasteAI helps citizens identify the correct way to dispose of waste using artificial intelligence.
    Upload a photo of waste and get instant guidance on recycling, composting, or safe disposal.
   </p>

   <WasteScanner/>

  </div>

 )

}