import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, senha }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3333/login", {
        email,
        senha,
      });
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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    isSuccess: false,
    loading: false,
  },
  reducers: {},
  extraReducers: {
        [loginUser.pending]:(state, {payload})=>{
        state.loading = true
    },
    [loginUser.fulfilled]:(state, {payload})=>{
        state.loading = false
        state.data = payload
        state.isSuccess = true

    },
    [loginUser.rejected]:(state, {payload})=>{
        state.message = payload
        state.loading = false

    },
  },
})

export default userSlice
