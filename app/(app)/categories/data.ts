export interface productColumnsType{
    name: string;
    uid: string;
    sortable?: boolean;
}

export interface statusOptionsType{
    name: string;
    uid: string;
}

export const columns = [
    { name: "id", uid: "id", sortable: true },
    { name: "Nome", uid: "name", sortable: true },
    { name: "Fornitore", uid: "supplier", sortable: true },
    { name: "Sottocategoria di", uid: "parent"},
    { name: "Categoria assegnata", uid: "prestaCategories"},
]

export const statusOptions = [
    { name: "Attivo", uid: 1 },
    { name: "Inattivo", uid: 0 },
]

