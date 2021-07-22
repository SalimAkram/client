const editRoll = async (roll) => {
  try {
    const response = await fetch(`/api/v1/rolls/${roll.id}`, {
      method: "PATCH",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(roll)
    })
    
    if (!response.ok) {
      const errorMessaage = `${response.status} (${response.statusText})`
      const error = new Error(errorMessaage)
      throw error
    } else {
      console.log('edit roll', response)
      return response
    }
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`);
  }
};
  
export default editRoll