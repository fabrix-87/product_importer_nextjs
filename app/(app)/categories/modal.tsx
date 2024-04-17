import { Category, PrestaCategory } from "@/types";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Select, SelectItem, SelectedItems } from "@nextui-org/select";
import { Selection } from "@nextui-org/table";
import React, { FC, Key, useEffect, useState } from "react";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box } from "@mui/material";

interface CategoryModalProps {
    isVisible: boolean;
    title: string;
    category: Category;
    prestaCategories: PrestaCategory[];
    onSubmit: (selectedData: Selection | undefined) => void; // Optional callback for form submission
    onClose: () => void;
}

function getIdsFromCategories(categories: PrestaCategory[]): Set<string> {
    const idSet = new Set<string>();

    categories.forEach((category) => {
        idSet.add(category.id.toString());
    });

    return idSet;
}

const filterOptions = createFilterOptions({
    ignoreCase: true,
});

const CategoryModal: FC<CategoryModalProps> = ({
    isVisible,
    title,
    category,
    prestaCategories,
    onSubmit,
    onClose,
}) => {
    const [selectedData, setSelectedData] = useState<Selection>()
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        if (category.presta_categories)
            setSelectedData(getIdsFromCategories(category.presta_categories))
        setIsLoading(false)
    }, [category])

    useEffect(() => {
        setIsOpen(isVisible)
    }, [isVisible])

    const handleSubmit = () => {
        onSubmit(selectedData)
        onClose()
    }

    const removeElement = (key: Key | undefined) => {
        if (selectedData == undefined || selectedData == 'all' || key == undefined)
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
                isOpen={isOpen}
                aria-label="Modifica categoria"
                onClose={onClose}
                title={title}
                isDismissable={false}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {title}
                            </ModalHeader>
                            <ModalBody>
                                <Autocomplete
                                    multiple
                                    id="tags-standard"
                                    options={prestaCategories}
                                    filterOptions={filterOptions}
                                    getOptionLabel={(option) => option.name}
                                    isOptionEqualToValue={(option, value) => option.name === value.name}
                                    renderOption={(props, option) => (
                                        <Box component="li" {...props}>
                                            {option.fullName}
                                        </Box>
                                    )}
                                    //defaultValue={selectedData}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Associa le categorie"
                                        />
                                    )}
                                />
                                <Select
                                    label="Associa alla categoria"
                                    items={prestaCategories}
                                    variant="bordered"
                                    isMultiline={true}
                                    selectionMode="multiple"
                                    placeholder="Seleziona una categoria"
                                    labelPlacement="outside"
                                    defaultSelectedKeys={selectedData}
                                    onSelectionChange={setSelectedData}
                                    isLoading={isLoading}
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
