import { ProductItem } from "@/types/commerce";
import { createSlice } from "@reduxjs/toolkit";

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
    }
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
    }
};

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setAvailableFilters: (state, action) => {
            state.availableFilters = action.payload;
        }
    }
});

export const { setAvailableFilters } = productsSlice.actions

export default productsSlice.reducer;