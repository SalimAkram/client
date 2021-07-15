import getCurrentUser from "./getCurrentUser";

const getDropdownData = async () => {
  const user = await getCurrentUser().then(body => {
    return body
  })
  try {
    const response = await fetch("/api/v1/films")
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`;
      const error = new Error(errorMessage);
      throw error;
    }
    const films = await response.json();
    return { films: films, cameraSetups: user.setups}
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`);
  }
};

export default getDropdownData;