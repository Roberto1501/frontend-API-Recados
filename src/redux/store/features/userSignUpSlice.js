import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const SignUpUser = createAsyncThunk(
  "user/SignUp",
  async ({ nome, email, senha }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3333/register", {
         nome,
         email,
         senha,
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

const userSignUpSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    isSuccess: false,
    loading: false,
  },
  reducers: {},
  extraReducers: {
        [SignUpUser.pending]:(state, {payload})=>{
        state.loading = true
    },
    [SignUpUser.fulfilled]:(state, {payload})=>{
        state.loading = false
        state.data = payload
        state.isSuccess = true

    },
    [SignUpUser.rejected]:(state, {payload})=>{
        state.message = payload
        state.loading = false

    },
  },
})

export default userSignUpSlice
