export const BASE_URL = "http://localhost:3000/api/v1";

// Helper function to get auth headers dynamically
export const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` })
    };
};
