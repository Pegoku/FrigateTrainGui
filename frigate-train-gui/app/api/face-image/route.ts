export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const faceName = searchParams.get("faceName");
    const face = searchParams.get("face");

    const imageURL = `${process.env.FRIGATE_URL}/clips/faces/${faceName}/${face}`

    const res = await fetch(imageURL, 
        {headers: {
            Authorization: `Bearer ${process.env.FRIGATE_TOKEN}`
        }}
    );

    return new Response(res.body, {
        headers: {"Content-Type": res.headers.get("Content-Type") || "image/webp"}
    });

}