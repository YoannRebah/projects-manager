import { Image } from "../../../shared/models/image";
import { Button } from "../../../shared/models/button";

export interface Achievements {
    tab: Button;
    img: Image;
    blockDetails: BlockDetail[];
}

interface BlockDetail {
    title: string;
    list: string[];
}