import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./features/userSlice";
import recadosUser from "./features/recadosSlice";

const store = configureStore({
    reducer: {
        usuario: userSlice.reducer,
        recados: recadosUser.reducer
    },
});

export default store;