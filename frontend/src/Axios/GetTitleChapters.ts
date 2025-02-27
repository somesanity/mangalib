import axios from "axios"
import env from "react-dotenv";

export interface GetChaptersApi {
    id: number;
    chapter_number: number;
    chapter_title: string;
    created_at: Date;
}

export const GetTitleChapters = async (titleId: string | undefined) => {
    const url = `${env.API_URL}/title/${titleId}/chapters`
    try {
        const response = await axios.get<GetChaptersApi[]>(url)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

