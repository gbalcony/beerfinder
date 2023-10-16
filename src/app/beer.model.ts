export interface Beer {
    id: number;
    image_url: string;
    name: string;
    tagline: string;
    description: string;
    [index: string]: string | number | object;
}