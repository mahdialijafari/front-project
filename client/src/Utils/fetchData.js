const fetchData = async (url, option = {}) => {
    try {
        const fullUrl = import.meta.env.VITE_BASE_API + url;
        console.log("📡 Fetching from:", fullUrl);
        console.log("📩 Options:", option);

        const res = await fetch(fullUrl, option);
        console.log("📜 Response status:", res.status);

        const data = await res.json();
        console.log("✅ Data received:", data);

        if (!res.ok) {
            throw new Error(data.message || `HTTP error! Status: ${res.status}`);
        }

        return data;
    } catch (error) {
        console.error("❌ Fetch error:", error.message);
        return { success: false, message: error.message };
    }
};
export default fetchData