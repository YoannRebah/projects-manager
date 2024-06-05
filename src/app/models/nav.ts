export interface Nav {
    nav: ObjNav[]
}

interface ObjNav {
    href: string,
    target: string,
    ariaLabel: string,
    label: string,
    classNames: string,
    dataTitlePopin: string,
    iconClassNames: string,
    isForNav: boolean,
    isForFooter: boolean
}
