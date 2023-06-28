import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const UpdateRecado = createAsyncThunk(
  "recado/update",
  async ({ userId, id, title, description,status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:3333/user/${userId}/recado/${id}`, {
         title,
         description,
         status
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

const RecadoUpdate = createSlice({
  name: 'RecadoUpload',
  initialState: {
    data: null,
    isSuccess: false,
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [UpdateRecado.pending]: (state, {payload}) => {
      state.loading = true
    },
    [UpdateRecado.fulfilled]: (state, {payload}) => {
      state.loading = false
      state.data = payload
      state.isSuccess = true
    },
    [UpdateRecado.rejected]: (state, {payload}) => {
      state.message = payload
      state.loading = false
    },
  },
})

export default RecadoUpdate
