import { Image } from "../../../shared/models/image.interface";
import { Button } from "../../../shared/models/button.interface";

export interface Achievements {
    tab: Button;
    img: Image;
    properties: Properties[];
}

interface Properties {
    title: string;
    list: string[];
}