export interface Skills {
    skills: Skill[]
}

interface Skill {
    id: string,
    label: string,
    iconClassName: string,
    details: Detail[]
}

interface Detail {
    label: string,
    percent: number
}