import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import StreamsList from './StreamsList'
import { useDispatch } from 'react-redux'
import { logout, getProfile } from '../features/Auth'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Dashboard = props => {
    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.Auth.profile);

    const handleLogout = e => {
        e.preventDefault();
        dispatch(logout())
    }

    useEffect(() => {
        dispatch(getProfile())
    }, [])

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Logged as {userProfile?.display_name}</p>
            <button onClick={handleLogout}>Logout</button>
            <Switch>
                <Route path="/" exact component={StreamsList} />
            </Switch>
        </div>
    )
}

Dashboard.propTypes = {

}

export default Dashboard
