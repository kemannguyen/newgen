// API
export const apiFetch = async (endpoint, options) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/${endpoint}`,
        {
          ...options,
          headers: {
            "X-API-Key": process.env.REACT_APP_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
  
      return await response.json();
    } catch {
      return undefined;
    }
  };
  
  export const postApiData = async (endpoint, data) => {
    return apiFetch(endpoint, {
      method: "POST",
      body: data && JSON.stringify(data),
    });
  };
  
  export const patchApiData = async (url, data) => {
    return apiFetch(url, {
      method: "PATCH",
      body: data && JSON.stringify(data),
    });
  };