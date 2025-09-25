import { ProductSortKeywords } from "@/actions/commerce";

export interface ProductItem {
    id: number;
    slug?: string;
    permalink?: string;
    name?: string;
    //link?: string;
    // canonicalUrl?: string;
    fileAltAttribute?: string;
    filePath?: string;
    fileTitleAttribute?: string;
    pegi?: {
        title?: string;
        description?: string;
        keyword?: string;
        name?: string;
        id?: number;
        image?: string;
        items?: {
            description?: string;
            image?: string;
            keyword?: string;
            name?: string;
            // "title": null,
            // "items": null,
            // "id": 0
        }[];
    };
    esrb?: {
        title?: string;
        description?: string;
        keyword?: string;
        name?: string;
        id?: number;
        image?: string;
        items?: {
            description?: string;
            image?: string;
            keyword?: string;
            name?: string;
            // "title": null,
            // "items": null,
            // "id": 0
        }[];
    };

    variants?: ProductVariant[];
    gameplay?: {
        keyword?: string;
        name?: string;
    }[];
    developer?: {
        fileAltAttribute?: string;
        filePath?: string;
        fileTitleAttribute?: string;
        name?: string;
        slug?: string;
    };
    publisher?: {
        fileAltAttribute?: string;
        filePath?: string;
        fileTitleAttribute?: string;
        name?: string;
        slug?: string;
    }

    shortDescription?: string;

    releaseDate?: string;
    brands?: {
        "name": "EA Sports",
        "slug": "ea-sports",
        "isDefault": false,
        "fileUniqKey": null,
        "filePath": "https://pn.irangamecenter.com/wp-content/uploads/2025/07/ea-sports.png",
        "fileTitleAttribute": "ea-sports",
        "fileAltAttribute": "",
        "id": 61
    }[];

    genres?: {
        keyword?: string;
        name?: string
    }[];
    playerPerspective?: {
        keyword?: string;
        name?: string;
    }[];
    theme?: {
        keyword?: string;
        name?: string;
        id?: number;
    }[];
    tags?: {
        name?: string;
        slug?: string;
    }[];
}

export interface RatingItemType {
    id: number;
    total: number;
    type: "IGN" | "GameSpot" | "Metacritic" | "Eurogamer" | "Steam";
    value: number;
}

export interface ProductVariant {
    id: number;
    name?: string;
    slug?: string;
    value?: string;
    children?: ProductVariant[];
    items?: {
        status?: "";
        attributes?: {
            value?: string;
        }[];
        regularPrice?: number;
        salePrice?: number;
        profitPercentage?: number;
        currencyType?: string;
    }[];
}

export interface ProductGalleryItem {
    id:number;
    cdnPath?: string;
    mediaType?: 0 | "Video";
    filePath?:string;
//   "isActive": true,
//   "fileUniqKey": "1e5457dc-ce85-f011-bf76-000c29176f1e",
//   "fileTitleAttribute": null,
//   "fileAltAttribute": null,
//   "thumbnail": "https://cdn.irangamecenter.com/videos/products/122/elden-ring-trailer-thumbnail-1.webp",
//   "thumbnailUniqKey": "432755c9-ce85-f011-bf76-000c29176f1e",
//   "cdnThumbnail": "https://igc1.storage.c2.liara.space/videos/products/122/elden-ring-trailer-thumbnail-1.webp",
}

export interface ProductDetailData {
    fileAltAttribute?: string;
    filePath?: string;
    fileTitleAttribute?: string;
    breadcrumbs?: {
        name?: string;
        slug?: string;
    }[];
    name?: string;
    faqs?: {
        answer?: string;
        questions?: string;
        id: number;
    }[];
    description?: string;
    shortDescription?: string;
    genres?: {
        keyword?: string;
        name?: string
    }[];

    rating?: RatingItemType[];
    playerPerspective?: {
        keyword?: string;
        name?: string;
    }[];
    pegi?: {
        title?: string;
        description?: string;
        keyword?: string;
        name?: string;
        id?: number;
        image?: string;
        items?: {
            description?: string;
            image?: string;
            keyword?: string;
            name?: string;
            // "title": null,
            // "items": null,
            // "id": 0
        }[];
    };
    pegics?: {
        title?: string;
        description?: string;
        keyword?: string;
        name?: string;
        id?: number;
    }[];
    esrb?: {
        title?: string;
        description?: string;
        keyword?: string;
        name?: string;
        id?: number;
        image?: string;
        items?: {
            description?: string;
            image?: string;
            keyword?: string;
            name?: string;
            // "title": null,
            // "items": null,
            // "id": 0
        }[];
    };
    theme?: {
        keyword?: string;
        name?: string;
        id?: number;
    }[];
    awards?: string[];
    releaseDate?: string;
    gameplay?: {
        keyword?: string;
        name?: string;
    }[];
    developer?: {
        fileAltAttribute?: string;
        filePath?: string;
        fileTitleAttribute?: string;
        name?: string;
        slug?: string;
    };
    publisher?: {
        fileAltAttribute?: string;
        filePath?: string;
        fileTitleAttribute?: string;
        name?: string;
        slug?: string;
    }
    variants?: ProductVariant[];
    similar?:ProductItem[];
    galleries?:ProductGalleryItem[]
}

export interface GetAllProductsParams {
    SkipCount: number;
    MaxResultCount: number;
    Brands?: string[];
    Categories?: string[];
    Tags?: string[];
    sort?: ProductSortKeywords;
    VariantSlug?: string[];
    Search?: string;

    Pegi?: string[];
    // variants: first child

    Esrb?: string[];
    Theme?: string[];
    PlayerPerspective?: string[];
    Gameplay?: string[];
    Genres?: string[];
    Publisher?: string[];
    Developer?: string[];

}

export type FilterItems = "publishers" | "developers" | "gameplays" | "genres" | "themes" | "playerPerspectives" | "pegis" | "esrbs" | "variants";