import axios from "axios";
import env from "react-dotenv";

export interface getTitleDataApi {
    id: number;
    title_name: string;
    title_cover: string;
}

const url = `${env.API_URL}/title`

export const getTitles = async () => {
    try {
     const response = await axios.get<getTitleDataApi[]>(url);
     return response.data;
    } catch (error) {
        console.log(error)
    }
};