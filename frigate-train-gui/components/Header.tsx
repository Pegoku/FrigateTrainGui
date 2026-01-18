"use client";
import { DropdownMenu, Tooltip } from "radix-ui";
import { useState } from "react";

interface HeaderProps {
    faces: Record<string, number>;
    // selectedFace: string;
}

export default function Header({ faces}: HeaderProps) {

    const [selectedFace, setSelectedFace] = useState("train");
    return (
        <header>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <button className="p-2 m-2 bg-zinc-800 rounded-lg capitalize">
                        {selectedFace}: {faces[selectedFace] || 0}
                        </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content className="bg-zinc-800 p-2 rounded-lg mt-1 border-2 border-zinc-700" align="start">
                        <DropdownMenu.Item onSelect={() => setSelectedFace("train")} className="h-9 flex items-center justify-between min-w-50">
                            Train: {faces["train"] || 0}
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator className="my-2 h-px w-full bg-zinc-700" />
                        <DropdownMenu.Label className="text-zinc-400 mb-2 text-sm">Collections</DropdownMenu.Label>
                        {
                            Object.entries(faces).map(([name, count]) => (
                                name !== "train" && (
                                    <DropdownMenu.Item onSelect={() => setSelectedFace(name)} key={name} className="h-9 flex items-center justify-between min-w-50">
                                        <span className="capitalize blur">{name}</span>
                                        <span className="text-xs text-zinc-400"> ({count})</span>
                                    </DropdownMenu.Item>
                                )
                            ))

                        }
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </header>

    )
    
}