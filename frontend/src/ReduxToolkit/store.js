import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import authReducer from "./authSlice";
import taskSlice from "./taskSlice";
import submissionSlice from "./submissionSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  task: taskSlice,
  submission: submissionSlice
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})


export default store;