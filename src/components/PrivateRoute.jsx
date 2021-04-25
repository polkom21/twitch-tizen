import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { AuthStatus } from '../features/Auth'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const logged = useSelector(state => state.Auth.status)

    return (
        <Route 
            {...rest}
            render={props => {
                if(logged === AuthStatus.LOGOUTED)
                    return <Redirect to="/login" />
                return <Component {...props} />
            }}
        />
    )
}

PrivateRoute.propTypes = {

}

export default PrivateRoute
