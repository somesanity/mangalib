import axios from "axios"
import { getTitleDataApi } from "./GetTitles"
import env from "react-dotenv";

export const GetTitleById = async (titleId: string | undefined) => {
    const url = `${env.REACT_APP_API_URL}/api/title/${titleId}`
    try {
        const response = await axios.get<getTitleDataApi[]>(url)
        return response.data
    } catch (error) {
        console.log(error)
    }
}