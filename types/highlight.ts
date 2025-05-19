export type HighlightItemType = {
    updatedAt:string;
    Keyword: string;
    id: number;
    Item?: {
        Image: {
            url?: string;
        };
        Title?: string;
    };
    Items?: {
        id: number;
        Url: string;
        Title?: string;
        Header?: string;
        Subtitle?: string;
        Image?: {
            url?: string;
        }
    }[]
}