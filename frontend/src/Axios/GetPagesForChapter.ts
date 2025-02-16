import axios from "axios"

export interface GetPagesForChapterApi {
    page_number: number;
    image_url: string;
}

export const GetPagesForChapter = async (titleId: string | undefined, chapterId: string | undefined) => {
    const url = `http://localhost:2000/title/${titleId}/chapter/${chapterId}`
    try {
        const response = await axios.get<GetPagesForChapterApi[]>(url)
        return response.data
    } catch (error) {
        console.log(error)
    }
}