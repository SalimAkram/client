const editFrame = async (frame) => {
  try {
    const response = await fetch(`/api/v1/rolls/${frame.rollId}/frames/${frame.id}`, {
      method: "PATCH",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(frame)
    });

    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`
      const error = new Error(errorMessage)
      throw error
    } else {
      console.log('edited frame', response)
      return response
    }
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`);
  }
};
  
export default editFrame