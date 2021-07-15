const getRoll = async (id) => {
  try {
    const response = await fetch(`/api/v1/rolls/${id}`);
    if(!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`;
      error = new Error(errorMessage);
      throw error;
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`);
  }
};

export default getRoll;