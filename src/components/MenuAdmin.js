import React from "react";
import AddBurgerForm from "./AddBurgerForm";
import EditBurgerForm from "./EditBurgerForm";
import firebase from "firebase";

class MenuAdmin extends React.Component {

    state = {
        photo: '',
        user: '',
    }

     // после загрузки идет запрос есть такой пользыватель  firebase и выводить уже  app если есть
     componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({user})
            }
        })
    }
    authHandler = async (authData) => {
        const  {email, photoURL} = authData.user;
        this.setState({ user: email, photo:photoURL});
    }

    render() {
        const {user, photo} = this.state;
        const avatar = photo ? photo : '/images/avatar.png' // если есть  img  на  git то его получим,  иначе 
        return(
            <div className = 'menu-admin'>
              { user ? <div className ='login-header'>
                    <div className = 'avatar'>
                        <img src = {avatar} alt = {user} />
                        </div>
                        <button className = 'buttonLogout' onClick = {this.props.handleLogout}>Выйти</button>  
                </div> : null }
                <h2>Управление Меню</h2>
                {Object.keys(this.props.burgers).map(key => { //21 получаем массив из ключей всех бургеров, пробегаемся по ключам (map), 
                
                    return ( 
                    <EditBurgerForm 
                    key={key}
                    index = {key}
                    updateBurger = {this.props.updateBurger} 
                    burger = {this.props.burgers[key]}
                    deleteBurger = {this.props.deleteBurger}
                     />
                    )
                    

                })}
                <AddBurgerForm addBurger = {this.props.addBurger} />
                <button onClick = {this.props.loadSampleBurgers}>Загрузить</button>
            </div>
        )
    }
}


export default MenuAdmin;