import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./features/userLoginSlice";
import recadosUser from "./features/recadosSlice";
import userSignUpSlice from "./features/userSignUpSlice";
import RecadoCreate from "./features/createRecado";
import RecadoUpdate from "./features/editRecado";

const store = configureStore({
    reducer: {
        usuario: userSlice.reducer,
        recados: recadosUser.reducer,
        signUpUser: userSignUpSlice.reducer,
        recadoCriado: RecadoCreate.reducer,
        RecadoUpdated: RecadoUpdate.reducer

    },
});

export default store;