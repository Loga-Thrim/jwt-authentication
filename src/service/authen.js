export default async function verifyToken() {
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  const token = getCookie("token");
  const res = await fetch("http://localhost:5000/verify-token", {
    headers: {
      token: `Bearer ${token}`,
    },
    method: "GET",
  });

  if (res.status === 200) return true;
  else if (res.status === 401) return false;
}
