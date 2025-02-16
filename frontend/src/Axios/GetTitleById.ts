import axios from "axios"
import { getTitleDataApi } from "./GetTitles"

export const GetTitleById = async (titleId: string | undefined) => {
    const url = `http://localhost:2000/title/${titleId}`
    try {
        const response = await axios.get<getTitleDataApi[]>(url)
        return response.data
    } catch (error) {
        console.log(error)
    }
}