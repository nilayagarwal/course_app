export const BASE_URL = "https://course-app-1sol.onrender.com/api/v1";

// Helper function to get auth headers dynamically
export const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        ...(token && { token: token })
    };
};
