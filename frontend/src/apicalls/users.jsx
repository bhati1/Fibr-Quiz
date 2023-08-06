const { default: axiosInstance } = require(".");

export const registerUser = async (payload) => {
    try {
        const response = await axiosInstance.post('/users/register', payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}