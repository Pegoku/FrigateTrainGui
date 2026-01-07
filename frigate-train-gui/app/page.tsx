import Image from "next/image";
import Face from "@/components/Face";
import Header from "@/components/Header"
import { main } from "bun";
import { getFaceData } from "@/utils/main";
import type { FacesMap, FaceData } from "@/types";

export default async function Home() {
  const faceName = "train";
  const faces: string[] = (await getFaceData())[faceName].sort().reverse();
  console.log(faces);

  // group by timestamp
  const facesMap: Record<string, number> = {};
  const groupedFaces: Record<string, string[]> = {};
  const maxName: Record<string, string> = {};
  const percentMap: Record<string, number> = {};
  const timestamps: string[] = [];
  for (const face of faces) {
    const name: string = face.split("-")[3];
    facesMap[name] = (facesMap[name] || 0) + 1;
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
    maxName[ts] = Object.entries(names)
      .filter(([, count]) => count == maxCount)
      .map(([name]) => name)
      .sort()[0];

    let maxPercent = 0;
    let faceNum = 0;
    for (const pc of groupedFaces[ts].map((face) =>
      face.split("-")[3] == maxName[ts]
        ? parseFloat(face.split("-")[4].split(".webp")[0]) * 100
        : NaN
    )) {
      if (!Number.isNaN(pc)) {
        faceNum += 1;
        maxPercent += pc;
        console.log(pc);
      }
    }
    maxPercent = parseInt((maxPercent / faceNum).toFixed(0));

    percentMap[ts] = maxPercent;
    console.log(
      `Timestamp: ${ts}, Names: ${JSON.stringify(names)}, Max name: ${
        maxName[ts]
      }, Max count: ${maxCount}, Max percent: ${maxPercent}, Face num: ${faceNum}`
    );
  }

  return (

    <main>

      <Header faces={facesMap} />

      {Object.entries(groupedFaces).map(([timestamp, faceList]) => (
        <div
          key={timestamp}
          className="m-1 p-2 bg-zinc-800 rounded-lg inline-block"
        >
          <h3 className="mb-1  capitalize">
            Person: {maxName[timestamp]}{" "}
            {maxName[timestamp] != "unknown"
              ? "(" + percentMap[timestamp] + "%)"
              : ""}
          </h3>
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
