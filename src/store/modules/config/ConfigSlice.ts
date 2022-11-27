
import { StarRate } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit';
import { State } from '../../rootReducer';

type TConfig = {
    showModal: {
        open: boolean,
        type: 'Editar'| 'Apagar' | null,
        id?: string | null 
    },
    loading: boolean
}

const initialState: TConfig = {
    showModal: {
        open: false,
        type: null 
    },
    loading: false
}


const configSlice = createSlice({
    name:'config',
    initialState,
    reducers:{
        setShowModal: (state, action) => {
            state.showModal = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    },

    extraReducers:{}
});

// @ts-ignore
export const configSliceSelectAll = (state: State) => state.config

export const { setShowModal, setLoading } = configSlice.actions

export default configSlice.reducer

