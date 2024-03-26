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
    { name: "Azioni", uid: "actions"},
]

export const statusOptions = [
    { name: "Attivo", uid: 1 },
    { name: "Inattivo", uid: 0 },
]

