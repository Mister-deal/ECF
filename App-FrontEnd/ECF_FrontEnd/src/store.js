import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./components/project/projectSlice";


export default configureStore({
    reducer: {
        projects: projectSlice
    }
})