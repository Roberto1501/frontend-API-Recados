import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const createRecado = createAsyncThunk(
  "recado/creation",
  async ({ userId, title, description,statusRecado }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:3333/user/${userId}/recado`, {
         title,
         description,
         statusRecado
      });
      if (response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const RecadoCreate = createSlice({
  name: 'NewRecado',
  initialState: {
    data: null,
    isSuccess: false,
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [createRecado.pending]: (state, {payload}) => {
      state.loading = true
    },
    [createRecado.fulfilled]: (state, {payload}) => {
      state.loading = false
      state.data = payload
      state.isSuccess = true
    },
    [createRecado.rejected]: (state, {payload}) => {
      state.message = payload
      state.loading = false
    },
  },
})

export default RecadoCreate
