const clearForm = (formPayload) => {
  let clearedPayload = {}
  const formFields = Object.keys(formPayload)
  for (const singleFormField of formFields) {
    clearedPayload[singleFormField] = ""
  }
  return clearedPayload
};
  
export default clearForm