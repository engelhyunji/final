import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../modules/counter'
import errorReducer from '../modules/error'

const store = configureStore({
    reducer: {
        counter: counterReducer,
        error: errorReducer,
    },
})

export default store
