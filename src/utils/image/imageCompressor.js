import imageCompression from "browser-image-compression";

const imgCompressor = async (image) => {
  const imageFile = image;
  const options = {
    maxSizeMB: 1.5,
    maxWidthOrHeight: undefined,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(imageFile, options);
    const convertedBlobFile = new File([compressedFile], image.name, {
      type: image.type,
      lastModified: Date.now(),
    });
    return convertedBlobFile;
  } catch (error) {
    console.log("Failed to compress.");
    return;
  }
};

export { imgCompressor };
