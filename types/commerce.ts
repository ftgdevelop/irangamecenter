import { ProductSortKeywords } from "@/actions/commerce";

export interface ProductItem {
    id: number;
    slug?: string;
    permalink?: string;
    name?: string;
    //link?: string;
    // canonicalUrl?: string;
    image: {
        //        "alt": null,
        url?: string;
        // "title": null,
        // "sizes": null,
        // "large": null,
        // "small": null,
        // "medium": null,
        // "xLarge": null
    },
    variants?: {
        items?: {
            salePrice?: number;
            regularPrice?: number;
        }[];
        id: number;
        slug?: string;
        name?: string;
    }[];
    // "shortDescription": "<p data-pm-slice=\"1 1 []\">Elden Ring یک بازی اکشن-نقش‌آفرینی (RPG) جدید از استودیوی <strong>FromSoftware</strong> و به نویسندگی <strong>جورج آر. آر. مارتین</strong> است که بازیکنان را به دنیایی <strong>وسیع، چالش‌برانگیز و پر رمز و راز</strong> دعوت می‌کند. با <strong>گیم‌پلی پیشرفته، مبارزات تاکتیکی و دنیای آزاد (Open World)</strong>، این بازی یکی از موردانتظارترین عناوین سال محسوب می‌شود.</p>\n<p>در Elden Ring، شما به عنوان یک جنگجوی ماجراجو، وارد سرزمین‌های <strong>The Lands Between</strong> می‌شوید. جایی که باید برای <strong>کشف اسرار، شکست باس‌های قدرتمند و رسیدن به جایگاه قهرمانی</strong> تلاش کنید. این بازی از <strong>داستانی غنی، سیستم مبارزاتی پویا و مکانیک‌های نوآورانه</strong> بهره می‌برد که آن را به یکی از بهترین بازی‌های پلی استیشن تبدیل کرده است.</p>\n",
    // "releaseDate": "2022-02-25T00:00:00",
    // "brands": [],
    // "awards": [
    //     "بازی سال 2022 در مراسم The Game Awards",
    //     "British Academy Games Award for Multiplayer"
    // ],
    // "publisher": null,
    // "developer": null,
    // "genres": [
    //     {
    //         "keyword": "Action",
    //         "name": "اکشن",
    //         "id": 0
    //     },
    //     {
    //         "keyword": "Adventure",
    //         "name": "ماجراجویی",
    //         "id": 0
    //     },
    //     {
    //         "keyword": "RPGRolePlayingGame",
    //         "name": "نقش‌آفرینی",
    //         "id": 0
    //     }
    // ],
    // "gameplay": [
    //     {
    //         "keyword": "",
    //         "name": "[Gameplay:]",
    //         "id": 0
    //     }
    // ],
    // "playerPerspective": [
    //     {
    //         "keyword": "",
    //         "name": "[Gameplay:]",
    //         "id": 0
    //     }
    // ],
    // "theme": [
    //     {
    //         "keyword": "",
    //         "name": "[Theme:]",
    //         "id": 0
    //     }
    // ],
    // "esrb": {
    //     "title": "[ESRB::Subtitle]",
    //     "description": "[ESRB::Description]",
    //     "keyword": "",
    //     "name": "[ESRB:]",
    //     "id": 0
    // },
    // "esrbcd": [
    //     {
    //         "title": null,
    //         "description": "[ESRB:CD:Description:]",
    //         "keyword": "",
    //         "name": "[ESRB:CD:]",
    //         "id": 0
    //     }
    // ],
    // "pegi": {
    //     "title": "[:Subtitle]",
    //     "description": "[:Description]",
    //     "keyword": "",
    //     "name": "[]",
    //     "id": 0
    // },
    // "pegics": {
    //     "title": null,
    //     "description": "[PEGI::Description]",
    //     "keyword": "",
    //     "name": "[PEGI:]",
    //     "id": 0
    // }[];
    // "selectedVariant": null,
    // "variations": [],
    // "tags":{
    //     "id": 39,
    //     "name": "PlayStation",
    //     "slug": "playstation"
    // }[];
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
    items?: {
        status?: "";
        attributes?: {
            value?: string;
        }[];
    }[];
}
export interface ProductDetailData {
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
    genres?: {
        keyword?: string;
        name?: string
    }[];
    image?: {
        url?: string;
    };
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
}

export interface GetAllProductsParams {
    SkipCount: number;
    MaxResultCount: number;
    Brands?: string[];
    sort?: ProductSortKeywords;
    VariantSlug?: string;
}