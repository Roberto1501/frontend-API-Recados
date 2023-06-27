import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./features/userLoginSlice";
import recadosUser from "./features/recadosSlice";
import userSignUpSlice from "./features/userSignUpSlice";
import RecadoCreate from "./features/createRecado";

const store = configureStore({
    reducer: {
        usuario: userSlice.reducer,
        recados: recadosUser.reducer,
        signUpUser: userSignUpSlice.reducer,
        recadoCriado: RecadoCreate.reducer
    },
});

export default store;