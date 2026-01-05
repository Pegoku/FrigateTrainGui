import Image from "next/image";
import Face from "@/components/Face";
import { main } from "bun";
import { getFaceData } from "@/utils/main";

export default async function Home() {
  const faceName = "train";
  const faces = await getFaceData(faceName);
  console.log(faces);
  return (
    <main>
      {faces.map((face) => {
        const faceData: [number, string, number, string, string] =
          face.split("-");
        return (
          <Face
            img={`/api/face-image?faceName=${faceName}&face=${face}`}
            name={faceData[4]}
            percent={75}
          />
        );
      })}
    </main>
  );
}
