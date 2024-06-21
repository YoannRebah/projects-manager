import { Image } from "../../../shared/models/image";
import { Button } from "../../../shared/models/button";

export interface Achievements {
    tab: Button;
    img: Image;
    properties: Properties[];
}

interface Properties {
    title: string;
    list: string[];
}