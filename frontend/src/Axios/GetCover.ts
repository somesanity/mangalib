import axios from "axios"
import env from "react-dotenv";

export const GetCover = async (titleId: string | undefined) => {
    const url = `${env.REACT_APP_API_URL}/api/title/${titleId}/cover`
    try {
        const response = await axios.get<string>(url)
        return response.data
    } catch (error) {
        console.log(error)
    }
}