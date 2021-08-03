

const getCoords =  async (address) => {
  const { street, city, state } = address

  try {
    const response = await fetch(
      `http://api.positionstack.com/v1/forward?access_key=5b2544143f1b94eec98d8be57890397d&query=${street} ${city} ${state}`
    );
      
      const body = await response.json()
      const latitude = body.data[0].latitude.toString();
      const longitude = body.data[0].longitude.toString();
    return { latitude, longitude } 
  } catch (error) {
    
  }
};
  
export default getCoords 