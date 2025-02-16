import axios from "axios"

export const GetCover = async (titleId: string | undefined) => {
    const url = `http://localhost:2000/title/${titleId}/cover`
    try {
        const response = await axios.get<string>(url)
        return response.data
    } catch (error) {
        console.log(error)
    }
}