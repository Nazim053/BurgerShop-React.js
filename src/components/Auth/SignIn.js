import React from "react";
import Login from "./Login";
import firebase from 'firebase/app'
import { firebaseApp } from "../../base";


class SignIn extends React.Component {
    state = {
        user: ''
    };
    // после загрузки идет запрос есть такой пользыватель  firebase и выводить уже  app если есть
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({user})
            }
        })
    }
    authHandler = async (authData) => {
        const  {email} = authData.user;
        this.setState({ user: email})
    }

    authenticate = () => {
        const authProvider = new firebase.auth['GithubAuthProvider'] ();
        firebaseApp
        .auth() // производиться авторизация метода
        .signInWithPopup(authProvider)
        .then(this.authHandler)
    }

    render() {

        if (!this.state.user) { //если нет user  то вывведи, иначе
            return <Login authenticate = {this.authenticate}/>
        }
        return this.props.children;
        // children оборачивает компоненту и возвращает ее (app) 
}
}

export default SignIn