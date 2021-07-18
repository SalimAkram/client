const deleteFrame = async (rollId, frameId) => {
  try {
    const response = await fetch(`/api/v1/rolls/${rollId}/frames/${frameId}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })

    if (!response.ok) {
      if (response.status === 422) {
        const body = await response.json()
        return { errors: body.errors }
      } else {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
    } else {
      return response
    }
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`)
  }
};
  
export default deleteFrame