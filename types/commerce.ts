
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
    minVariant?:Omit<ProductVariant, "children">;
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

export interface ProductItemExtented extends ProductItem {
    strapiProductProperties?:{
        url?: string;    
        price?: number;
        oldPrice?: number; 
    }
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
        filePath?: string;
        status?:  "InStock" | "OutOfStock" | "OnBackOrder";
        attributes?: {
            value?: string;
        }[];
        regularPrice?: number;
        salePrice?: number;
        profitPercentage?: number;
        currencyType?: string;
        id: number;
        description?: string;
    }[];
}

export interface ProductGalleryItem {
    id:number;
    cdnPath?: string;
    mediaType?: "Image" | "Video";
    filePath?:string;
//   "isActive": true,
//   "fileUniqKey": "1e5457dc-ce85-f011-bf76-000c29176f1e",
//   "fileTitleAttribute": null,
//   "fileAltAttribute": null,
//   "thumbnail": "https://cdn.irangamecenter.com/videos/products/122/elden-ring-trailer-thumbnail-1.webp",
//   "thumbnailUniqKey": "432755c9-ce85-f011-bf76-000c29176f1e",
    cdnThumbnail: string | null,
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
    similar?:ProductItem[];
    page?:{
        title?: string;
        richSnippet?: string;
        metas?: {
             [key: string]: string;
        }
    }
    id: number;
}

export type GetAllProductsParams = {
  skipCount: number;
  maxResultCount: number;
  search?: string;
  orderBy?: unknown;
  sortBy?: unknown;
  onlyAvailable?: boolean;  
} & {
  [key: string]: string[] | number | string | unknown;
}

export type FilterItems = "publishers" | "developers" | "gameplays" | "genres" | "themes" | "playerPerspectives" | "pegis" | "esrbs" | "variants";

export interface Facet {
    key: string;
    label?: string;
    items?: {
        count: number;
        value: string;
        label?: string;
    }[]
}
export interface GetProductsDataType {
    facets?: Facet[];
    pagedResult?: {
        items?: ProductItem[];
        totalCount?: number;
    };
}
export interface GetProductsResponseType {
    data?: {
        result?: GetProductsDataType;
    }
}


export interface GetCartByProductIdType {
    deviceId?: string,
    id: string;
    items: {
        id: number;
        quantity: number;
        strikePrice: number;
        unitDiscountAmount: number;
        totalDiscountAmount: number;
        totalStrikePrice: number;
        unitPrice: number;
        totalPrice: number;
        variantId: number;
        variant: VariantType;
    }[];
    payableAmount: number,
    profitAmount : number,
    totalItemsPrice : number,
    totalQuantity: number
}

type VariantAttributeValue = {
  id: number;
  variantId: number;
attributeValueId: number;
  name:string
};
type VariantType = {
  id: number;
  creationTime: string;
  creatorUserId: number | null;
  currencyType: string;
  deleterUserId: number | null;
  deletionTime: string | null;
  description: string | null;
  fileAltAttribute: string | null;
  filePath: string | null;
  fileTitleAttribute: string | null;
  fileUniqKey: string | null;
  isActive: boolean;
  isDeleted: boolean;
  isDownloadable: boolean;
  isVirtual: boolean;
  lastModificationTime: string | null;
  lastModifierUserId: number | null;
  name: string | null;
  netPrice: number;
  productId: number;
    product: ProductItem;
  regularPrice: number;
  salePrice: number;
  status: string;
    stockQuantity: number;
    variantAttributeValues?: VariantAttributeValue[];
    attributes?:string[]
};
export interface GetCurrentProductType {
  id: number;
  deviceId: string;
  payableAmount: number;
  profitAmount: number;
  totalItemsPrice: number;
  totalQuantity: number;
  items: {
    id: number;
    variantId: number;
    quantity: number;
    profitPercent: number;
    unitPrice: number;            
    unitDiscountAmount: number;   
    strikePrice: number;          
    totalPrice: number;           
    totalDiscountAmount: number; 
    variant: VariantType;
  }[]
}
export interface GetCurrentProductResponseType {
    result?: GetCurrentProductType;
}

export interface GetCartByProductIdResponseType {
    result?: GetCartByProductIdType
}

export interface CreateOrderResponseType {
  result?: {
    id?: string;
    orderNumber?: string;
    [key: string]: unknown;
  };
}