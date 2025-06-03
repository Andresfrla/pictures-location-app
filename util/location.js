function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap
    &markers=color:red%7Clabel:S%7C${lat},${lng}&key=AIzaSyDhgeaShYy_LG2BrjNve8t-pG48-zqi0Yc`;
  return imagePreviewUrl;
}

export default getMapPreview;
