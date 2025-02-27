import axios from "axios"
import env from "react-dotenv";

export interface GetPagesForChapterApi {
    page_number: number;
    image_url: string;
}

export const GetPagesForChapter = async (titleId: string | undefined, chapterId: string | undefined) => {
    const url = `${env.REACT_APP_API_URL}/api/title/${titleId}/chapter/${chapterId}`
    try {
        const response = await axios.get<GetPagesForChapterApi[]>(url)
        return response.data
    } catch (error) {
        console.log(error)
    }
}