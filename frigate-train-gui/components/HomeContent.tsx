"use client";

import { useState } from "react";
import Header from "./Header";
import Face from "./Face";
import { FaceData, HomeProps } from "@/types";

export default function HomeContent({ groupedFaces, maxName, percentMap, faceCount}: HomeProps ) {
  const [selectedFace, setSelectedFace] = useState("train");

  return (
    <>
      <Header faces={faceCount} selectedFace={selectedFace} setSelectedFace={setSelectedFace} />
      <main>
        {Object.entries(groupedFaces).map(([timestamp, faceList]) => (
          <div
            key={timestamp}
            className="m-1 p-2 bg-zinc-800 rounded-lg inline-block"
          >
            <h3 className="mb-1 capitalize blur">
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
                  img={`/api/face-image?faceName=${selectedFace}&face=${face}`}
                  name={faceData[3]}
                  percent={
                    (parseFloat(faceData[4].split(".webp")[0]) * 100).toFixed(
                      0,
                    ) as unknown as number
                  }
                />
              );
            })}
          </div>
        ))}
      </main>
    </>
  );
}
