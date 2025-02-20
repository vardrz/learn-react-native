import axios from "axios";
import Api from "../constants/Api";

const API_BASE_URL = Api.url;

export const registerUser = async (token, body) => {
    const response = await axios.post(`${API_BASE_URL}/api/auth/register`, body, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    return response.data;
};