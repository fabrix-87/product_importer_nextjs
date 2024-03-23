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
    { name: "Codice", uid: "reference", sortable: true },
    { name: "Nome", uid: "name", sortable: true },
    { name: "Status", uid: "status", sortable: true },
    { name: "Fornitore", uid: "supplier", sortable: true },
]

export const statusOptions = [
    { name: "Attivo", uid: "active" },
    { name: "Inattivo", uid: "disabled" },
]

