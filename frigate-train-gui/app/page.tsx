import Image from "next/image";
import Face from "@/components/Face";
import { main } from "bun";
import { getFaceData } from "@/utils/main";
import type  { FacesMap, FaceData} from "@/types";

export default async function Home() {
  const faceName = "train";
  const faces: string[] = (await getFaceData())[faceName];
  console.log(faces);
  return (
    <main>
      {faces.map((face) => {
        const faceData: FaceData =
          face.split("-");
        return (
          <Face
            img={`/api/face-image?faceName=${faceName}&face=${face}`}
            name={faceData[3]}
            percent={parseFloat(faceData[4].split(".webp")[0]) * 100}
          />
        );
      })}
    </main>
  );
}
