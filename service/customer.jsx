import axios from "axios";
import Api from "../constants/Api";

const API_BASE_URL = Api.url;

export const getCustomers = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/api/customer`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    return response.data.data;
};