const getCenterPosition = (locations) => {
  const center = []
  const latitude = parseFloat(locations[0].latitude); 
  const longtiude = parseFloat(locations[0].longitude);
  center.push(longtiude)
  center.push(latitude)
  
  return center
};
  
export default getCenterPosition