export function getOperatingSystem(userAgent = navigator.userAgent) {
  // if (userAgent.includes("Windows")) {
  //   return "Windows";
  // } else if (userAgent.includes("Macintosh")) {
  //   return "macOS";
  // } else {
  //   return "";
  // }
  return userAgent.includes('Macintosh') ? 'macOS' : 'Windows'
}
