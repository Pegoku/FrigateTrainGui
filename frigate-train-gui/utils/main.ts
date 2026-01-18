'use server';

import type { FacesMap } from "@/types";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { jwtDecode } from "jwt-decode";

function getSavedToken(): string | null {
  try {
    if (existsSync(".token-cache")){
      return readFileSync(".token-cache", "utf-8").trim();
    }
  } catch (err) {
    console.error("Error reading token cache:", err);
  }
  return null;
}

function saveToken(token: string): void {
  try {
    writeFileSync(".token-cache", token, "utf-8");
  } catch (err) {
    console.error("Error writing token cache:", err);
  }
}

async function updateToken(): Promise<void> {
    const FRIGATE_URL:string = process.env.FRIGATE_URL || "";
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
    process.env.FRIGATE_TOKEN;
    saveToken(process.env.FRIGATE_TOKEN);
}

export async function getFaceData() {
  
  const FRIGATE_URL:string = process.env.FRIGATE_URL || "";
  let FRIGATE_TOKEN:string = getSavedToken() || process.env.FRIGATE_TOKEN || "";

  let isTokenValid = false;
  if (FRIGATE_TOKEN) {
    try {
      const decodedToken = jwtDecode(FRIGATE_TOKEN);
      if (decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
        console.log("Using cached token, valid until " + new Date(decodedToken.exp * 1000).toLocaleString());
        isTokenValid = true;
      }
    } catch (err) {
      console.log("Invalid token in cache, updating...");
    }
  }

  if (!isTokenValid) {
    console.log("No valid token found, updating token...");
    await updateToken();
    FRIGATE_TOKEN = process.env.FRIGATE_TOKEN || "";
  }

  var facesFetch = await fetch(FRIGATE_URL + "/api/faces", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + FRIGATE_TOKEN,
    },
  });
  var facesData: FacesMap = await facesFetch.json()
  // if (!personName) {
  return facesData;
  // }

  // return facesData[personName];
}

export async function classifyFace(file: string, personName: string) {

  const FRIGATE_URL:string = process.env.FRIGATE_URL || "";
  const FRIGATE_TOKEN:string = getSavedToken() || process.env.FRIGATE_TOKEN || "";

  fetch(FRIGATE_URL + "/api/faces/train/" + encodeURIComponent(personName) + "/classify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + FRIGATE_TOKEN,
    },
    body: JSON.stringify({
      training_file: file
    }),
  }).then(response => {
    if (!response.ok) {
      throw new Error("Failed to classify face: " + response.statusText);
    }
    return response.json();
  }).catch(error => {
    console.error("Error classifying face:", error);
  });
}
