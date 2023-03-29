const validateImage = (file) => {
  if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
    return "Image must of jpeg, png or gif format.";
  }

  return true;
};

export { validateImage };
