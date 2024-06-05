export interface Skills {
    skills: ObjSkill[]
}

interface ObjSkill {
    id: string,
    label: string,
    iconClassName: string,
    details: ObjDetail[]
}

interface ObjDetail {
    label: string,
    percent: number
}