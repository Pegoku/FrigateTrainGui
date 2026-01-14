import { DropdownMenu, Tooltip } from "radix-ui";


interface HeaderProps {
    faces: Record<string, number>;
}

export default function Header({ faces }: HeaderProps) {
    return (
        <header>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <button className="p-2 m-2 bg-zinc-800 rounded-lg">
                        Selected Face
                        </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content className="bg-zinc-800 p-2 rounded-lg">
                        <DropdownMenu.Item>
                            Train: {faces["train"] || 0}
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator className="my-2 h-px w-full bg-zinc-700" />
                        <DropdownMenu.Label className="text-zinc-400 mb-2 text-sm">Collections</DropdownMenu.Label>
                        {
                            Object.entries(faces).map(([name, count]) => (
                                name !== "train" && (
                                    <DropdownMenu.Item key={name} className="">
                                        <span className="capitalize">{name}</span>
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