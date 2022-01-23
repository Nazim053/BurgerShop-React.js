import React from "react";
import PropTypes from 'prop-types';

const Login = props => {
    return (
        <div className = 'login-container'>
            <nav className = 'login'>
                <h2>Авторзация</h2>
                <p>Введит логин и пароль</p>
                <button className = 'github' onClick = { () =>  props.authenticate()}>
                    Войти
                    </button>
                
            </nav>
        </div>
    );
};

Login.protoType = {
    authenticate: PropTypes.func.isRequired
};

export default Login