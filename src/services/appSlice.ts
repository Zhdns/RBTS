import { createSlice, createAsyncThunk, PayloadAction, AnyAction} from "@reduxjs/toolkit";
import { request } from "../utility/utility";
import { IngredientGlobalType } from "../utility/types";

type GetData = {
    data: IngredientGlobalType[]
    succsess: boolean
}

interface AppSInterface {
    data: IngredientGlobalType[]
}

const initialState: AppSInterface = {
    data: []
}

export const getData = createAsyncThunk<GetData, void>(
    'data.getData', 
    () => {
        return request('/ingredients')
    }
)

const appSlice =createSlice({
    name: 'app', 
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<IngredientGlobalType[]>) => {
            console.log(action.payload)
            state.data = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getData.fulfilled, (state, action: PayloadAction<GetData>) => {
                console.log(action.payload)
                state.data = action.payload.data;
            })
            .addCase(getData.rejected, (state, action: AnyAction) => {
                console.error("Ошибка при отправке заказа:", action.error.message);
            })
    }
})

export const {setData} = appSlice.actions
export default appSlice
