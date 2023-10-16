export interface Beer {
    id: number;
    image_url: string;
    [index: string]: string | number | object;
}