export interface Skills {
    textColor: string,
    bgColor: string,
    bgColorDark: string,
    language: string,
    iconClassName: string,
    details: Details[]
}

interface Details {
    text: string,
    percent: number
}