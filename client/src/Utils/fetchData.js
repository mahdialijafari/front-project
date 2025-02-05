const fetchData = async (url, option = {}) => {
    try {
        const fullUrl = import.meta.env.VITE_BASE_API + url;
        const response = await fetch(fullUrl, option);
        const data = await response.json();
        return data;
    } catch (error) {
        return { success: false, message: error.message };
    }
};
export default fetchData