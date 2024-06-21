export interface Button {
    index?: number;
    id?: string;
    name?: string;
    classNames?: string;
    iconClassNames?: string;
    ariaLabel?: string;
    text?: string;
    onClick?: () => void;
    tooltip?: string;
    disabled?: boolean;
}