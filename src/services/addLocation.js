const addLocation = async (coords, id) => {
  try {
    const response = await fetch(`/api/v1/rolls/${id}/locations`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(coords),
    });
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`);
  }
};
  
export default addLocation