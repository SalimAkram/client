const getRoll = async (id) => {
  try {
    const response = await fetch(`/api/v1/rolls/${id}`);

    if (response.status === 404) {
      const errorMessage = "this roll doesnt exist!" 
      const error = new Error(errorMessage)
      throw error;
    }
    
    if (response.status === 403) {
      const errorMessage = "you dont have access to this roll"
      const error = new Error(errorMessage)
      throw error;
    }

    if(!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`;
      const error = new Error(errorMessage);
      throw error;
    }
    const body = await response.json();
    return body;
  } catch (error) {
    return { error: `Error in fetch: ${error.message}` }
  }
};

export default getRoll;