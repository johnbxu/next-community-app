export default function parseCookie(cookieInput) {
  const result = {};
  const cookies = cookieInput.split(';');
  cookies.forEach((cookie) => {
    const cookieResult = cookie.split('=');
    result[cookieResult[0].replace(' ', '')] = cookieResult[1];
  });
  return result;
}
