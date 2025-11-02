const getPublicIdFromUrl = (url) => {
  if (!url || typeof url !== "string") return null;
  const parts = url.split("/upload/");
  if (parts.length <= 1) return null;
  let publicId = parts[1];
  publicId = publicId.replace(/^v\d+\//, "");
  publicId = publicId.replace(/\.[a-zA-Z0-9]+$/, "");
  return publicId;
};

module.exports = { getPublicIdFromUrl };
