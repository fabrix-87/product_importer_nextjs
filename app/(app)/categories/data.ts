export interface productColumnsType{
    name: string;
    uid: string;
    sortable?: boolean;
}

export const columns = [
    { name: "id", id: "id", sortable: true },
    { name: "Nome", id: "name", sortable: true },
    { name: "Fornitore", id: "supplier", sortable: true },
    { name: "Sottocategoria di", id: "parent"},
    { name: "Categoria assegnata", id: "presta_categories"},
    { name: "", id: "actions"},
]

export const toBeAssignedValues = [
    { name: 'Si', id: 1},
    { name: 'No', id: 0},
]
    