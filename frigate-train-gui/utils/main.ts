// type FaceData = {
  // 
// }

type FacesMap = Record<string, string[]>;

export async function getFaceData(personName?: string) {
  
  const FRIGATE_URL = process.env.FRIGATE_URL || "";
  var FRIGATE_TOKEN = process.env.FRIGATE_TOKEN || "";

  if (!FRIGATE_TOKEN) {
    const FRIGATE_USERNAME = process.env.FRIGATE_USERNAME || "";
    const FRIGATE_PASSWORD = process.env.FRIGATE_PASSWORD || "";

    var tokenReq = await fetch(FRIGATE_URL + "/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: FRIGATE_USERNAME,
        password: FRIGATE_PASSWORD,
      }),
    });

    if (!tokenReq.ok) {
      throw new Error("Failed to fetch token: " + tokenReq.statusText);
    }
    const cookieHeader = tokenReq.headers.get("set-cookie") || "";
    const cookiePart = cookieHeader.split(";")[0];
    const cookieParts = cookiePart?.split("=") || [];
    process.env.FRIGATE_TOKEN = cookieParts[1] || "";
    console.log("Logged in successfully: " + process.env.FRIGATE_TOKEN);
    FRIGATE_TOKEN = process.env.FRIGATE_TOKEN;
  }

  var facesFetch = await fetch(FRIGATE_URL + "/api/faces", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + FRIGATE_TOKEN,
    },
  });
  var facesData: FacesMap = await facesFetch.json()

  console.log("Fetched faces data: ", facesData[personName]);
}
