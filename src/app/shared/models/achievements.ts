import { Image } from "./base/image";
import { Button } from "./base/button";

export interface Achievements {
    tab: Button;
    img: Image;
    blockDetails: BlockDetail[];
}

interface BlockDetail {
    title: string;
    list: string[];
}