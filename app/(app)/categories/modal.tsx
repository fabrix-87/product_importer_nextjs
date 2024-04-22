import { Category, PrestaCategory } from "@/types";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Selection } from "@nextui-org/table";
import React, { FC, Key, useEffect, useState } from "react";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { AutocompleteProps } from "@nextui-org/autocomplete";
import { Chip } from "@mui/material";

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
    const [selectedData, setSelectedData] = useState<PrestaCategory[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setIsOpen(isVisible)
    }, [isVisible])

    const handleSubmit = () => {
        onSubmit(selectedData)
        onClose()
    }

    const handleSelectionChange = (
        event: React.ChangeEvent<HTMLInputElement | undefined>,
        newValue: PrestaCategory[] | null
    ) => {
        setSelectedData(newValue);
    };

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
                                    getOptionLabel={(option: PrestaCategory) => option.name}
                                    isOptionEqualToValue={(option: PrestaCategory, value: PrestaCategory) => option.name === value.name}
                                    renderOption={(props: AutocompleteProps<PrestaCategory>, option: PrestaCategory) => (
                                        <li {...props} key={option.id}>
                                            {option.fullName || option.name}
                                        </li>
                                    )}
                                    renderTags={(tagValue, getTagProps) => {
                                        return tagValue.map((option: PrestaCategory, index) => (
                                            <Chip {...getTagProps({ index })} key={option.id} label={option.name} />
                                        ))
                                    }}
                                    value={selectedData}
                                    onChange={handleSelectionChange}
                                    renderInput={(params: AutocompleteProps<PrestaCategory>) => (
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
