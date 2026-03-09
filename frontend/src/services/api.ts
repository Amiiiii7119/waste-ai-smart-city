import axios from "axios"

export async function scanWaste(file: File) {

 const formData = new FormData()
 formData.append("image", file)

 const response = await axios.post(
  "http://localhost:5000/api/scan",
  formData,
  {
   headers: {
    "Content-Type": "multipart/form-data"
   }
  }
 )

 return response.data
}