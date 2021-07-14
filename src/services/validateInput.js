const validateInput = (payload) => {
    let submitErrors = {};
    const requiredFields = [
      "cameraBrand",
      "cameraModel",
      "lenseType",
      "lenseBrand",
      "lenseModel",
      "focalLength",
      "lenseAperature",
      "notes",
      "focusType"
    ];
    requiredFields.forEach((field) => {
      if (userBrewMethodData[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "is blank",
        };
      }
    });
    return _.isEmpty(submitErrors);
};

export default validateInput