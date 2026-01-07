import { DropdownMenu, Tooltip } from "radix-ui";


interface HeaderProps {
    faces: Record<string, number>[];
}

export default function Header() {
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
                            Hello World
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator className="border-zinc-700"/>
                        <DropdownMenu.Label className="text-zinc-400 mb-2">label</DropdownMenu.Label>
                        
                        <DropdownMenu.Item>
                            Hello World
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </header>

    )
    
}