import Image from "next/image";
import Face from "@/components/Face";
import { main } from "bun";
import { getFaceData } from "@/utils/main";
import type { FacesMap, FaceData } from "@/types";

export default async function Home() {
  const faceName = "train";
  const faces: string[] = (await getFaceData())[faceName].sort().reverse();
  console.log(faces);

  // group by timestamp
  const groupedFaces: Record<string, string[]> = {};
  const timestamps: string[] = [];
  for (const face of faces) {
    const timestamp: string = face.split("-")[0] as string;
    if (!groupedFaces[timestamp]) {
      groupedFaces[timestamp] = [];
      timestamps.push(timestamp);
    }
    groupedFaces[timestamp].push(face);
  }
  for (const ts of timestamps) {
    // const names = groupedFaces[ts].map((face) => face.split("-")[3]);
    const names: Record<string, number> = {};
    for (const face of groupedFaces[ts].map((face) => face.split("-")[3])) {
      if (!names[face]) {
        names[face] = 0;
      }
      names[face] += 1;
    }

    const maxCount = Math.max(...Object.values(names), 0);
    const maxName = Object.entries(names)
      .filter(([, count]) => count == maxCount)
      .map(([name]) => name)[0];

    console.log(
      `Timestamp: ${ts}, Names: ${JSON.stringify(names)}, Max name: ${maxName}, Max count: ${maxCount}`
    );
  }

  return (
    <main>
      {Object.entries(groupedFaces).map(([timestamp, faceList]) => (
        <div
          key={timestamp}
          className="m-1 bg-zinc-900 rounded-lg inline-block"
        >
          {faceList.map((face) => {
            const faceData: FaceData = face.split("-") as FaceData;
            return (
              <Face
                key={face}
                img={`/api/face-image?faceName=${faceName}&face=${face}`}
                name={faceData[3]}
                percent={
                  (parseFloat(faceData[4].split(".webp")[0]) * 100).toFixed(
                    0
                  ) as unknown as number
                }
              />
            );
          })}
        </div>
      ))}
    </main>
  );
}
