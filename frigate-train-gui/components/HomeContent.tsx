"use client";
// https://cam.pegoku.com/clips/faces/train/1768738225.678005-wb4vpn-1768738226.801436-unknown-0.36.webp
// https://cam.pegoku.com/clips/faces/Jose/Jose-1767451698.756786.webp
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./Header";
import Face from "./Face";
import { FaceData as TrainFaceData, HomeContentProps, FaceData } from "@/types";
import { randomInt } from "crypto";
import { deleteFace } from "@/utils/main";

export default function HomeContent({ faceData, faceCount }: HomeContentProps) {
    const [selectedFace, setSelectedFace] = useState("train");
    const [selectedFaces, setSelectedFaces] = useState<string[]>([]);
    const router = useRouter();

    const handleRefresh = () => {
        router.refresh();
        setSelectedFaces([]);
    };

    const handleDelete = async () => {
      console.log("Deleting faces:", selectedFaces);
      await deleteFace(selectedFaces, selectedFace);
      handleRefresh();
    };

    const faceNames: string[] = Object.keys(faceData);
    const faces: string[] = faceData[selectedFace].sort().reverse();
    // console.log(faces);
    // group by timestamp
    // const facesMap: Record<string, number> = {};
    const groupedFaces: Record<string, string[]> = {};
    const maxName: Record<string, string> = {};
    const percentMap: Record<string, number> = {};
    const timestamps: string[] = [];

    for (const face of faces) {
        // const name: string = face.split("-")[3];
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
                : NaN,
        )) {
            if (!Number.isNaN(pc)) {
                faceNum += 1;
                maxPercent += pc;
                // console.log(pc);
            }
        }
        maxPercent = parseInt((maxPercent / faceNum).toFixed(0));

        percentMap[ts] = maxPercent;
        // console.log(
        //   `Timestamp: ${ts}, Names: ${JSON.stringify(names)}, Max name: ${
        //     maxName[ts]
        //   }, Max count: ${maxCount}, Max percent: ${maxPercent}, Face num: ${faceNum}`,
        // );
    }
    // console.log(groupedFaces);

    const handleFaceClick = (face: string) => {
        setSelectedFaces((prev) => {
            if (prev.includes(face)) {
                const newSelection = prev.filter((f) => f !== face);
                console.log("Deselected face:", face);
                console.log("Total selected faces:", newSelection);
                return newSelection;
            } else {
                console.log("Selected face:", face);
                console.log("Total selected faces:", [...prev, face]);
                return [...prev, face];
            }
        });
    };
    const allSelected = (timestamp: string) => {
        const facesInGroup = groupedFaces[timestamp];
        return facesInGroup.every((face) => selectedFaces.includes(face));
    };
    const handleGroupClick = (timestamp: string) => {
        const facesInGroup = groupedFaces[timestamp];
        if (allSelected(timestamp)) {
            // Deselect all
            facesInGroup.forEach((face) => {
                setSelectedFaces((prev) => {
                    return prev.filter((f) => f !== face);
                });
            });
        } else {
            facesInGroup.forEach((face) => {
                if (selectedFaces.includes(face)) return;
                setSelectedFaces((prev) => {
                    return [...prev, face];
                });
            });
        }
    };


    return (
        <>
            <Header
                faces={faceCount}
                selectedFace={selectedFace}
                setSelectedFace={setSelectedFace}
                selectedFaces={selectedFaces}
                setSelectedFaces={setSelectedFaces}
                onClassified={handleRefresh}
                onDelete={handleDelete}
            />
            <main>
                {Object.entries(groupedFaces).map(([timestamp, faceList]) =>
                    selectedFace === "train" ? (
                        <div
                            key={timestamp}
                            className={`m-1 p-2 bg-zinc-800 rounded-lg inline-block ${allSelected(timestamp) ? "outline-2 outline-red-400 rounded-lg" : ""}`}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleGroupClick(timestamp);
                            }}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                handleGroupClick(timestamp);
                            }}
                        >
                            <h3 className="mb-1 capitalize blur">
                                Person: {maxName[timestamp]}{" "}
                                {maxName[timestamp] != "unknown"
                                    ? "(" + percentMap[timestamp] + "%)"
                                    : ""}
                            </h3>

                            {faceList.map((face) => {
                                const parts = face.split("-");
                                const name = parts[3];
                                const confidence = (
                                    parseFloat(parts[4].split(".webp")[0]) * 100
                                ).toFixed(0) as unknown as number;

                                return (
                                    <Face
                                        key={face}
                                        img={`/api/face-image?faceName=${selectedFace}&face=${face}`}
                                        name={name}
                                        allSelected={allSelected(timestamp)}
                                        percent={confidence}
                                        faceNames={faceNames}
                                        onClassified={handleRefresh}
                                        selectedFace={selectedFace}
                                        onClick={() => handleFaceClick(face)}
                                        isSelected={selectedFaces.includes(face)}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        faceList.map((face) => {
                            const parts = face.split("-");
                            const name = parts[0];
                            const confidence = -1;

                            return (
                                <div
                                    key={face}
                                    className="m-1 p-2 bg-zinc-800 rounded-lg inline-block"
                                >
                                    <Face
                                        img={`/api/face-image?faceName=${selectedFace}&face=${face}`}
                                        name={name}
                                        percent={confidence}
                                        faceNames={faceNames}
                                        onClassified={handleRefresh}
                                    />
                                </div>
                            );
                        })
                    ),
                )}
            </main>
        </>
    );
}
