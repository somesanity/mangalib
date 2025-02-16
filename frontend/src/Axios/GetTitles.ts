import axios from "axios";

export interface getTitleDataApi {
    id: number;
    title_name: string;
    title_cover: string;
}

const url = 'http://localhost:2000/'

export const getTitles = async () => {
    try {
     const response = await axios.get<getTitleDataApi[]>(url);
     return response.data;
    } catch (error) {
        console.log(error)
    }
};