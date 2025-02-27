import axios from "axios"
import { getTitleDataApi } from "./GetTitles"
import env from "react-dotenv";

export const GetTitleById = async (titleId: string | undefined) => {
    const url = `${env.API_URL}/title/${titleId}`
    try {
        const response = await axios.get<getTitleDataApi[]>(url)
        return response.data
    } catch (error) {
        console.log(error)
    }
}