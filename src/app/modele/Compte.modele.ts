export interface detailsDeCompte {
    idcompt: string;
    solde: number;
    page_: number;
    totalePages: number;
    sizeDepage: number;
    operationsDtos: Operations[];
}

export interface Operations {
    id: number;
    dateOperation: Date;
    montant: number;
    type: string;
}