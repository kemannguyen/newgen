// API
export const apiFetch = async (endpoint) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`);
  
      return await response.json();
    } catch {
      return undefined;
    }
  };
  
  export const getApiData = async (endpoint) => {
    return apiFetch(endpoint, {
      method: "GET",
    });
  };