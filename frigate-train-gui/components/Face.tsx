import { classifyFace } from "@/utils/main";
import { Trigger } from "@radix-ui/themes/components/alert-dialog";
import { ScanFace } from "lucide-react";
import { DropdownMenu } from "radix-ui";

interface FaceProps{
    img: string;
    name: string;
    percent: number;
    faceNames: string[];
    onClassified?: () => void;
    selecrtedFace?: string;
}

export default function Face({img, name, percent, faceNames, onClassified, selecrtedFace: selectedFace}: FaceProps) {
    return (
        <div className="inline-block mx-1 ">

            <img src={img} alt={name} className="w-44 h-44 rounded-lg blur"/>
            <div className="columns-2">
                <div className="text-sm">
                    {percent === -1 && <br />}
                    <h3 className="blur">{name}</h3>
                    {percent !== -1 && <p className={percent >= 90 ? "text-green-500" : "text-red-500"}>{percent}%</p>}
                </div>
            {selectedFace === "train" && (
                <DropdownMenu.Root >
                    <DropdownMenu.Trigger asChild>
                        <button className="p-1 mt-2 hover:bg-zinc-700 rounded-lg">
                            <ScanFace/>
                        </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content className="bg-zinc-800 p-2 rounded-lg mt-1 border-2 border-zinc-700" align="start">
                            <DropdownMenu.Label className="text-zinc-400 mb-2 text-b">Train face as:</DropdownMenu.Label>
                            {
                                faceNames.map((name) => (
                                    name !== "train" && (
                                        <DropdownMenu.Item onSelect={async () => {
                                            await classifyFace(img.split("face=")[1], name);
                                            onClassified?.();
                                        }} key={name} className="h-9 flex items-center justify-between min-w-50">
                                            <span className="capitalize blur">{name}</span>
                                        </DropdownMenu.Item>
                                    )
                                ))

                            }
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            )}
            </div>

        </div>

    )

}