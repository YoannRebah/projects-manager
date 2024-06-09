export interface Achievements {
    id: string,
    imagesPath: ImagesPath,
    text: string
}

interface ImagesPath {
    src: string,
    classNames: string
}