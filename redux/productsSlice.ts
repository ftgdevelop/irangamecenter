import { ProductItem } from "@/types/commerce";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type filterItems = "publishers" | "developers" | "gameplays" | "genres" | "themes" | "playerPerspectives" | "pegis" | "esrbs";

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
    };
    selectedFilters: {
        publishers: string[];
        developers: string[];
        gameplays: string[];
        genres: string[];
        themes: string[];
        playerPerspectives: string[];
        pegis: string[];
        esrbs: string[];
        name: string;
    };
    openedFilter: filterItems | "" | "all";
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
        esrbs: []
    },
    selectedFilters: {
        publishers: [],
        developers: [],
        gameplays: [],
        genres: [],
        themes: [],
        playerPerspectives: [],
        pegis: [],
        esrbs: [],
        name: ""
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
        setSelectedFilters: (state, action: PayloadAction<{
            type: filterItems;
            values: string[];
        }>) => {
            state.selectedFilters[`${action.payload.type}`] = action.payload.values;
        },
        setFilteredName: (state, action: PayloadAction<string>) => {
            state.selectedFilters.name = action.payload;
        },
        openFilter :(state, action: PayloadAction<filterItems | "" | "all">) => {
            state.openedFilter = action.payload;
        },
    }
});

export const { setAvailableFilters, setSelectedFilters, setFilteredName, openFilter } = productsSlice.actions

export default productsSlice.reducer;