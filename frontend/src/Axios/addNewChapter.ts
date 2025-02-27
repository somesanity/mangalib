import axios from "axios"
import env from "react-dotenv";

export const addNewChapter = async (titleid: string, chapterNumber: number, chapterName: string) => {
    const url = `${env.REACT_APP_API_URL}/api/title/${titleid}/chapter`
    try {
        const request = await axios.post<string>(url, 
            { 
                chapterName: chapterName,
                chapterNumber: chapterNumber
            }, 
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        return request;
    } catch (error) {
        console.log(error);
    }
}