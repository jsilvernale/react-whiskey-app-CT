import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: 'root',
    initialState: {
        brand: 'Brand',
        type: 'Type',
        alc_percent: 'Alcohol Percent',
    },
    reducers: {
        chooseBrand: (state, action) => {state.brand = action.payload },
        chooseType: (state, action) => {state.type = action.payload },
        choosePercent: (state, action) => {state.alc_percent = action.payload },
    }
})

export const reducer = rootSlice.reducer;
export const { chooseBrand, chooseType, choosePercent } = rootSlice.actions;