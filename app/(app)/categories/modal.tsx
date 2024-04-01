import { Category, PrestaCategory } from "@/types";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Select, SelectItem, SelectedItems } from "@nextui-org/select";
import { Selection } from "@nextui-org/table";
import React, { FC, Key, useEffect, useState } from "react";

interface CategoryModalProps {
    isVisible: boolean;
    title: string;
    category: Category;
    prestaCategories: PrestaCategory[];
    onSubmit: (selectedData: Selection|undefined) => void; // Optional callback for form submission
    onClose: () => void;
}

function flattenCategories(
    categories: PrestaCategory[],
    flatArray: PrestaCategory[] = [],
    parentName: string = ''
): PrestaCategory[] {
    categories.forEach((category) => {
        category.fullName = parentName !== '' ? parentName + ' / ' + category.name : category.name
        flatArray.push(category);
        if (category.childrens && category.childrens.length > 0) {
            flattenCategories(category.childrens, flatArray, category.fullName);
        }
    });
    return flatArray;
}

function getIdsFromCategories(categories: PrestaCategory[]): Set<string> {
    const idSet = new Set<string>();

    categories.forEach((category) => {
        idSet.add(category.id.toString());
    });

    return idSet;
}

const CategoryModal: FC<CategoryModalProps> = ({
    isVisible,
    title,
    category,
    prestaCategories,
    onSubmit,
    onClose,
}) => {
    const { onOpen, onOpenChange } = useDisclosure()
    const [flatData, setFlatData] = useState<PrestaCategory[]>([])
    const [selectedData, setSelectedData] = useState<Selection>()

    useEffect(() => {
        if (isVisible) {
            onOpen()
            setFlatData(flattenCategories(prestaCategories))
            if (category.presta_categories)
                setSelectedData(getIdsFromCategories(category.presta_categories))
        }
    }, [isVisible])

    const handleSubmit = () => {
        onSubmit(selectedData)
        onClose()
    }

    const removeElement = (key: Key|undefined) => {
        if(selectedData == undefined || selectedData == 'all' || key == undefined)
            return;
        const newData = selectedData
        newData.delete(key)
        setSelectedData(newData)
    }

    return (
        <>
            <Modal
                backdrop="blur"
                closeButton
                size="3xl"
                isOpen={isVisible}
                aria-label="Modifica categoria"
                onClose={onClose}
                title={title}
                isDismissable={false}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {title}
                            </ModalHeader>
                            <ModalBody>
                                <Select
                                    label="Associa alla categoria"
                                    items={flatData}
                                    variant="bordered"
                                    isMultiline={true}
                                    selectionMode="multiple"
                                    placeholder="Seleziona una categoria"
                                    labelPlacement="outside"
                                    defaultSelectedKeys={selectedData}
                                    onSelectionChange={setSelectedData}
                                    classNames={{
                                        trigger: "min-h-unit-12 py-2 ",
                                    }}
                                    renderValue={(items: SelectedItems<PrestaCategory>) => {
                                        return (
                                            <div className="flex flex-wrap gap-2">
                                                {items.map((item) => (
                                                    <Chip 
                                                        key={item.key}
                                                        onClose={() => removeElement(item.key)}
                                                        >
                                                    {item.data?.name}</Chip>
                                                ))}
                                            </div>
                                        );
                                    }}
                                >
                                    {
                                        (prestaCategory) => (
                                            <SelectItem
                                                key={prestaCategory.id}
                                                textValue={prestaCategory.name}
                                                title={prestaCategory.fullName}
                                            >
                                                {prestaCategory.fullName}
                                            </SelectItem>
                                        )
                                    }
                                </Select>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Annulla
                                </Button>
                                <Button color="primary" onPress={handleSubmit}>
                                    Salva Modifiche
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default CategoryModal;
