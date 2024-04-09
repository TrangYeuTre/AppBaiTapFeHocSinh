export function isValidImageUrl(url) {
  let valid = false;
  if (
    url.toString().toLowerCase().includes("http://") ||
    url.toString().toLowerCase().includes("https://")
  ) {
    valid = true;
  }
  return valid;
}
