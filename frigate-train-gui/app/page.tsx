import Image from "next/image";
import Face from "@/components/Face";
import Header from "@/components/Header";
import { main } from "bun";
import { getFaceData } from "@/utils/main";
import type { FacesMap, FaceData } from "@/types";
import HomeContent from "@/components/HomeContent";

async function getFaceCount(
  faceData: FacesMap
): Promise<Record<string, number>> {
  const faceCount: Record<string, number> = {};
  for (const [name, faces] of Object.entries(faceData)) {
    faceCount[name] = faces.length;
  }
  return faceCount;
}

export default async function Home() {
  const faceData: FacesMap = await getFaceData();


  const faceCount: Record<string, number> = await getFaceCount(faceData);


  return (
    <HomeContent
      faceData={faceData}
      faceCount={faceCount}
    />
  );

}
