import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { Link, Redirect } from 'react-router-dom';
import { read, update, updateUser } from './apiUser';


const Profile = ({ match }) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        success: false
    });

    const { token } = isAuthenticated();

    const { name, email, password, error, success } = user;


    const init = (userId) => {
        // console.log(userId);
        read(userId, token).then(data => {
            if (data.error) {
                setUser({ ...user, error: true })
            } else {
                setUser({ ...user, name: data.name, email: data.email });
            }
        })
    }


    useEffect(() => {
        init(match.params.userId);
    }, []);

    const handleChange = name => event => {
        setUser({ ...user, error: false, [name]: event.target.value });
    }

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId, token, { name, email, password }).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                updateUser(data, () => {
                    setUser({ ...user, name: data.name, email: data.email, success: true });
                })
            }
        })
    }

    const redirectUser = success => {
        if (success) {
            return (
                <Redirect to="/cart" />
            )
        }
    }

    const profileUpdate = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange('name')} className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" onChange={handleChange('email')} className="form-control" value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" onChange={handleChange('password')} className="form-control" value={password} />
            </div>
            <button className="btn btn-primary" onClick={clickSubmit}>Submit</button>
        </form>
    )


    return (
        <Layout
            title="Update Profile"
            description="Update your profile here"
            className="container col-md-8 offset-md-2"
        >
            {profileUpdate(name, email, password)}
            {redirectUser(success)}
        </Layout>
    )

}

export default Profile;