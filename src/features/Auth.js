import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import useApi, { apiCall } from '../customHooks/useApi';

export const AuthStatus = {
    LOGGED_IN: 'LOGGED_IN',
    LOGOUTED: 'LOGOUTED',
    PENDING: 'PENDING',
}

export const getProfile = createAsyncThunk('Auth/getProfile',
async () => {
    const response = await apiCall('/users')
    return response.data[0];
})

export const Auth = createSlice({
    name: 'Auth',
    initialState: {
        status: AuthStatus.LOGOUTED,
        profile: null,
    },

    reducers: {
        initAuth: (state) => {
            if (localStorage.getItem('authToken') !== null)
                state.status = AuthStatus.LOGGED_IN;
        },
        login: (state, token) => {
            localStorage.setItem('authToken', token.payload);
            state.status = AuthStatus.LOGGED_IN;
        },
        logout: (state) => {
            localStorage.removeItem('authToken');
            state.status = AuthStatus.LOGOUTED;
        },
        // getProfile: state => {
        //     apiCall('/users')
        //     .then(response => {
        //         if (response.length > 0) {
        //             state.profile = response[0]
        //         }
        //     })
        //     .catch(console.error);
        // }
    },
    extraReducers: {
        [getProfile.fulfilled]: (state, action) => {
            console.log(action)
            state.profile = action.payload;
        }
    }
})

export const { login, initAuth, logout } = Auth.actions;

export default Auth.reducer;
