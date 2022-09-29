import axios from "axios";

export const fetchData = async (query, page) => {
    const BASEURL = 'https://pixabay.com/api/'
    const KEY = '28946050-edbdf2e2dca91bf63c1cc8e01';
    const URL = `${BASEURL}?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    try {
        const response = await axios.get(URL)
        return response.data;
    }
    catch(error) {
        console.log(error)
    }
};

export default fetchData;