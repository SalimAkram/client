const editSetUp = async (setUp) => {
  try {
    const response = await fetch(`/api/v1/setups/${setUp.id}`, {
      method: "PATCH",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(setUp)
    })

    if (!response.ok) {
      const errorMessaage = `${response.status} (${response.statusText})`;
      const error = new Error(errorMessaage);
      throw error;
    } else {
      console.log("edit setup", response);
      return response;
    }
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`);
  }
};
  
export default editSetUp