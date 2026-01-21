"use client";
import { classifyFace } from "@/utils/main";
import { on } from "events";
import { DropdownMenu, Tooltip } from "radix-ui";
import { useState } from "react";

interface HeaderProps {
    faces: Record<string, number>;
    selectedFace: string;
    setSelectedFace: (face: string) => void;
    selectedFaces?: string[];
    onClassified?: () => void;
}

export default function Header({ faces, selectedFace, setSelectedFace, selectedFaces, onClassified }: HeaderProps) {

    // const [selectedFace, setSelectedFace] = useState("train");
    return (
        <header className="sticky top-0 z-10 bg-zinc-900">
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <button className="p-2 m-2 bg-zinc-800 rounded-lg capitalize">
                        {selectedFace}: {faces[selectedFace] || 0}
                        </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content className="bg-zinc-800 p-2 rounded-lg mt-1 border-2 border-zinc-700 z-50" align="start">
                        <DropdownMenu.Item onSelect={() => setSelectedFace("train")} className="h-9 flex items-center justify-between min-w-50 hover:bg-zinc-700">
                            Train: {faces["train"] || 0}
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator className="my-2 h-px w-full bg-zinc-700" />
                        <DropdownMenu.Label className="text-zinc-400 mb-2 text-sm">Collections</DropdownMenu.Label>
                        {
                            Object.entries(faces).map(([name, count]) => (
                                name !== "train" && (
                                    <DropdownMenu.Item onSelect={() => setSelectedFace(name)} key={name} className="h-9 flex items-center justify-between min-w-50 hover:bg-zinc-700">
                                        <span className="capitalize blur">{name}</span>
                                        <span className="text-xs text-zinc-400"> ({count})</span>
                                    </DropdownMenu.Item>
                                )
                            ))

                        }
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
            {selectedFaces && selectedFaces.length > 0 && (
            <DropdownMenu.Root >
                <DropdownMenu.Trigger asChild>
                    <button className="bg-zinc-800 p-2 mt-2 hover:bg-zinc-700 rounded-lg">
                        Classify ({selectedFaces.length}) faces
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content className="bg-zinc-800 p-2 rounded-lg mt-1 border-2 border-zinc-700 z-50" align="start">
                        {/* <DropdownMenu.Label className="text-zinc-400 mb-2 text-b">Train face as:</DropdownMenu.Label> */}
                        {
                            Object.entries(faces).map(([name, _]) => name).filter(name => name !== "train").map((name) => (
                                <DropdownMenu.Item onSelect={() => {
                                    selectedFaces.forEach(face => {
                                        console.log(`Classifying face ${face} as ${name}`);
                                        classifyFace(face, name);
                                    });
                                    onClassified?.();
                                }} key={name} className="h-9 flex items-center justify-between min-w-50 hover:bg-zinc-700">
                                    {/* <DropdownMenu.Item onSelect={async () => {
                                        await classifyFace(img.split("face=")[1], name);
                                        onClassified?.();
                                    }} key={name} className="h-9 flex items-center justify-between min-w-50"> */}
                                        <span className="capitalize ">{name}</span>
                                    </DropdownMenu.Item>
                            ))

                        }
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
            )}
        </header>

    )
    
}