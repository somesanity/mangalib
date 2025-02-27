import axios from "axios"

export const addNewChapter = async (titleid: string, chapterNumber: number, chapterName: string) => {
    const url = `http://localhost:2000/title/${titleid}/chapter`
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