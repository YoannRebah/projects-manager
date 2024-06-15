export interface BtnTab {
    text: string;
    index: number;
}

export interface Column {
    index: number;
    img: Image;
    blockDetails: BlockDetail[];
}

interface Image {
    path: string;
    alt: string;
}
  
interface BlockDetail {
    title: string;
    list: string[];
}