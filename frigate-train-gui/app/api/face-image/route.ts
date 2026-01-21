import { existsSync, readFileSync } from "fs";

function getSavedToken(): string | null {
    try {
        if (existsSync(".token-cache")) {
            return readFileSync(".token-cache", "utf-8").trim();
        }
    } catch (err) {
        console.error("Error reading token cache:", err);
    }
    return null;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const faceName = searchParams.get("faceName");
    const face = searchParams.get("face");

    const FRIGATE_TOKEN = getSavedToken() || process.env.FRIGATE_TOKEN || "";
    const imageURL = `${process.env.FRIGATE_URL}/clips/faces/${faceName}/${face}`;

    const res = await fetch(imageURL, {
        headers: {
            Authorization: `Bearer ${FRIGATE_TOKEN}`,
        },
    });
    if (!res.ok) {
        return new Response("Failed to fetch face image", {
            status: res.status,
        });
    }
    return new Response(res.body, {
        headers: {
            "Content-Type": res.headers.get("Content-Type") || "image/webp",
        },
    });
}
