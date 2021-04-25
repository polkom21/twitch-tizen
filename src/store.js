import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import Auth from './features/Auth'

const middleware = [thunkMiddleware];
const logger = createLogger({})

if (process.env.NODE_ENV === 'development') {
    middleware.push(logger)
}

export default configureStore({
    reducer: {
        Auth
    },
    middleware,
})