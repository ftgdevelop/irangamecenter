import { FilterItems, ProductItem } from "@/types/commerce";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Products = {
    availableFilters: {
        publishers: ProductItem["publisher"][];
        developers: ProductItem["developer"][];
        gameplays: ProductItem["gameplay"];
        genres: ProductItem["genres"];
        themes: ProductItem["theme"];
        playerPerspectives: ProductItem["playerPerspective"];
        pegis: ProductItem["pegi"][];
        esrbs: ProductItem["esrb"][];
        variants: {
            id: number;
            value?: string;
            slug?: string;
        }[];
    };
    openedFilter: FilterItems | "" | "all";
};

const initialState: Products = {
    availableFilters: {
        publishers: [],
        developers: [],
        gameplays: [],
        genres: [],
        themes: [],
        playerPerspectives: [],
        pegis: [],
        esrbs: [],
        variants: []
    },
    openedFilter: ""
};

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setAvailableFilters: (state, action) => {
            state.availableFilters = action.payload;
        },
        openFilter: (state, action: PayloadAction<FilterItems | "" | "all">) => {
            state.openedFilter = action.payload;
        },
    }
});

export const { setAvailableFilters,openFilter } = productsSlice.actions

export default productsSlice.reducer;