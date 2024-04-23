import { Category, PrestaCategory } from "@/types";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import React, { FC, useEffect, useState } from "react";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Chip } from "@mui/material";

interface CategoryModalProps {
    isVisible: boolean;
    title: string;
    category: Category;
    prestaCategories: PrestaCategory[];
    onSubmit: (selectedData: PrestaCategory[]) => void; // Optional callback for form submission
    onClose: () => void;
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
    const [selectedData, setSelectedData] = useState<PrestaCategory[]>([])
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setIsOpen(isVisible)
    }, [isVisible])

    const handleSubmit = () => {
        onSubmit(selectedData)
        onClose()
    }

    const handleSelectionChange = (
        event: React.SyntheticEvent<Element, Event>,
        newValue: unknown
    ) => {
        setSelectedData(newValue as PrestaCategory[])
    };

    useEffect(() => {
        setSelectedData(category.presta_categories)
    }, [category])

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
                                    //getOptionLabel={(option: PrestaCategory) => option.name}
                                    getOptionLabel={(option: unknown) => (option as PrestaCategory).name}
                                    isOptionEqualToValue={(option, value) => (option as PrestaCategory).name === (value as PrestaCategory).name}
                                    renderOption={(props, option) => (
                                        <li {...props} key={(option as PrestaCategory).id}>
                                            {(option as PrestaCategory).fullName || (option as PrestaCategory).name}
                                        </li>
                                    )}
                                    renderTags={(tagValue, getTagProps) => {
                                        return tagValue.map((option, index) => (
                                            <Chip {...getTagProps({ index })}
                                                key={(option as PrestaCategory).id}
                                                label={(option as PrestaCategory).name} />
                                        ))
                                    }}
                                    defaultValue={selectedData}
                                    value={selectedData}
                                    onChange={handleSelectionChange}
                                    renderInput={(params) => (
                                        <TextField {...params} variant="standard" label="Associa le categorie" />
                                    )}
                                />
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
