import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./features/userLoginSlice";
import recadosUser from "./features/recadosSlice";
import userSignUpSlice from "./features/userSignUpSlice";

const store = configureStore({
    reducer: {
        usuario: userSlice.reducer,
        recados: recadosUser.reducer,
        signUpUser: userSignUpSlice.reducer
    },
});

export default store;