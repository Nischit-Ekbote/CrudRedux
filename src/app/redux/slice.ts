import { createSlice } from "@reduxjs/toolkit";

interface Data {
    firstName: string,
    lastName: string,
    email: string,
}
interface DataState {
    items : Data[]
}

const initialDataState: DataState = {
    items: []
};

const dataSlice = createSlice({
    name: 'data',
    initialState: initialDataState,
    reducers: {

        addData: (state, action) => {
            state.items.push(action.payload);
        },

        displayData : (state) => {
            return initialDataState;

        },
        
        updateData : (state, action) => {
            const {id, firstName, lastName, email} = action.payload;
            state.items[id] = {
                firstName,
                lastName,
                email,
            }
        },
        deleteData : (state, action) => {
            state.items.splice(action.payload,1);
        }
    }
});

export const { addData, displayData, updateData, deleteData } = dataSlice.actions;

export const dataReducer = dataSlice.reducer;