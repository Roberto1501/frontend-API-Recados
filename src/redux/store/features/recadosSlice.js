import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const recadosUsuario = createAsyncThunk(
  "user/Recado",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3333/user/${userId}/recado`);
      if (response.data.ok) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const recadosUser = createSlice({
  name: 'recadosUser',
  initialState: {
    data: null,
    isSuccess: false,
    loading: false,
    message: ""
  },
  reducers: {},
  extraReducers: {
        [recadosUsuario.pending]:(state, {payload})=>{
        state.loading = true
    },
    [recadosUsuario.fulfilled]:(state, {payload})=>{
        state.loading = false
        state.data = payload
        state.isSuccess = true
        state.message = payload.message

    },
    [recadosUsuario.rejected]:(state, {payload})=>{
        state.message = payload
        state.loading = false

    },
  },
})

export default recadosUser
