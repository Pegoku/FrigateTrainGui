import Image from "next/image";
import Face from "@/components/Face";
import { main } from "bun";
import { getFaceData } from "@/utils/main";
import type  { FacesMap, FaceData} from "@/types";

export default async function Home() {
  const faceName = "train";
  const faces: string[] = (await getFaceData())[faceName].sort().reverse();
  console.log(faces);

  // group by timestamp
  const groupedFaces: Record<string, string[]> = {};
  for (const face of faces) {
      const timestamp: string = face.split("-")[0] as string;
      if (!groupedFaces[timestamp]) {
          groupedFaces[timestamp] = [];
      }
      groupedFaces[timestamp].push(face);
  }

  return (
    <main>
      {Object.entries(groupedFaces).map(([timestamp, faceList]) => (
        <div key={timestamp} className="m-1 bg-zinc-900 rounded-lg inline-block">
        {faceList.map((face) => {
          const faceData: FaceData =
            face.split("-") as FaceData;
          return (
            <Face
              key={face}
              img={`/api/face-image?faceName=${faceName}&face=${face}`}
              name={faceData[3]}
              percent={parseFloat(faceData[4].split(".webp")[0]) * 100}
            />
          );
        })}
        </div>
      ))}
    </main>
  );
}
