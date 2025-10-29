import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};
const counterReducer = (state = initialState, action) => {
  console.log("inside counterReducer", action);
  switch (action.type) {
    case "INC":
      return { count: state.count + 1 };
    default:
      return state;
  }
};

const timelogMiddleware = (store) => (nextR) => (actionD) => {
  console.log("Inside timelogMiddleware", actionD, store.getState(), new Date());
  const r1 = nextR(actionD);
  console.log("After timelogMiddleware", actionD, store.getState(), new Date());
  return r1;
};

const statelogMiddleware = (store) => (nextR) => (actionD) => {
  console.log("Inside statelogMiddleware", actionD, store.getState());
  const r2 = nextR(actionD);
  console.log("After statelogMiddleware", actionD, store.getState());
  return r2;
};

const myappstore = configureStore({
  reducer: counterReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(timelogMiddleware, statelogMiddleware),
});

export default myappstore;