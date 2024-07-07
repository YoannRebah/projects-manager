import { Image } from "../../../shared/models/image.interface";
import { Button } from "../../../shared/models/button.interface";

export interface Achievements {
    tab: Tab;
    img: Image;
    properties: Properties[];
}

interface Tab {
    button: Button;
    img: Image;
}

interface Properties {
    title: string;
    list: string[];
}