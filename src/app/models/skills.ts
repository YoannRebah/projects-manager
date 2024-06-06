export interface Skills {
    id: string,
    language: string,
    iconClassName: string,
    details: Details[]
}

interface Details {
    text: string,
    percent: number
}