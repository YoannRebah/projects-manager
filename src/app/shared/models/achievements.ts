import { Image } from "./common/image";
import { Button } from "./common/button";

export interface Achievements {
    tab: Button;
    img: Image;
    blockDetails: BlockDetail[];
}

interface BlockDetail {
    title: string;
    list: string[];
}