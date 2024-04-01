import { Icon } from "@iconify/react"
import { Button } from "@nextui-org/button"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown"
import { Selection } from "@nextui-org/table";
import { FC, Key } from "react"

export interface OptionsType{
    name: string;
    id: number|string;
    sortable?: boolean
}

export type DropdownFilterProps = {
    text: string;
    options: OptionsType[]
    selectedKeys?: "all" | Iterable<Key> | undefined
    onSelectionChange?: ((keys: Selection) => any ) | undefined
}

export const DropdownFilter: FC<DropdownFilterProps> = ({
    text,
    options,
    selectedKeys = "all",
    onSelectionChange = undefined,
}) => {
    return (
        <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
                <Button
                    endContent={
                        <Icon icon="mdi:chevron-down" className="text-small" />
                    }
                    variant="flat"
                >
                    {text}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={selectedKeys}
                selectionMode="multiple"
                onSelectionChange={onSelectionChange}
            >
                {options.map((option) => (
                    <DropdownItem key={option.id} className="capitalize">
                        {option.name}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
}