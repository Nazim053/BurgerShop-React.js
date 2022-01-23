import React from "react";
import Header from './Header'
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import sampleBurgers from "../sample-burgers";
import Burger from "./Burger";
import base from "../base";
import SignIn from "./Auth/SignIn";
import firebase from "firebase";




class App extends React.Component {

    state = {
        burgers: {},
        order: {},
    }

     componentDidMount() { // вызывается сразу после  рендера dom дерева 
        const {params} = this.props.match; 
        const localStorageRef = localStorage.getItem(params.restaurantId); // 20
        if(localStorageRef) {
            this.setState({ order : JSON.parse(localStorageRef)})  //20 обновляем order
        }


        this.ref = base.syncState(`${params.restaurantId}/burger`, {
            context : this,
            state:'burgers'
        }// state синхронируем с базой данных 
        // это функция позвляет нам после перезагрузки страницы не подружать бургеры(state:burger)
        // а уже добавлять их  из сохраненого state 19
        )}

        componentWillUnmount() { // после перехода на другую ссылку удаляються сокеты firebase
            base.removeBinding(this.ref);
        }

        
        componentDidUpdate() {  // 20
            const {params} = this.props.match;
            localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order));
        }



    loadSimpleBurger = () => {
        this.setState({burgers:sampleBurgers}) // 14 урок   изменяем обьекты
    }


    addBurger = burger => {  // 13  урок
    console.log('addBurger', burger)
    //1. Делаем копию обьекта state
    const burgers = {...this.state.burgers};
    //2. Добавить новый бургер в переменную burgers
    burgers[`burger4{Date.now()}`] = burger;
    //3. Записать наш новый объект burgers в state
    this.setState({burger : burgers});
    };

    updateBurger = ( key, updateBurger) => { //21
        //1. Делаем копию обьекта state
    const burgers = {...this.state.burgers};
        //2. Обновляем нужный burger 
        burgers[key] = updateBurger;
        //3. Записать наш новый объект burgers в state
    this.setState({burgers});
    }

    deleteBurger = key => {
        //1 Копия обьекта  state 
        const burgers = {...this.state.burgers};
        //2 Удаляем  burger
        burgers[key] = null;
        //3 Записать наш новый обьект в  burgers в  state
        this.setState({burgers});
    }

    deleteFromOrder = key => {
        //1 Копия обьекта  state 
        const order = {...this.state.order};
        //2 Удаляем  burger
        delete order[key]
        //3 Записать наш новый обьект в  burgers в  state
        this.setState({order});
    }

    addToOrder = key => {
        //1 Делаем копию объекта state
        const order = { ...this.state.order};
        //2. Добавить ключ к заказу со значением 1, либо обновить текущие знач  
        order[key] = order[key] + 1 || 1;
        //3 Записать наш новый объект order  в  state
        this.setState({order:order}); 
      }

      handleLogout = async () => { // выход пользывателя 
          await firebase.auth().signOut();
          window.location.reload();
      }

    render() {
        
        return(
            <SignIn>
            <div className='burger-paradise'>
                <div className='menu'>
                    <Header title={2323}/>
                        <ul  className='burgers'>
                           {Object.keys(this.state.burgers).map(key => {
                                   return  <Burger 
                                   key = {key}
                                   index = {key}
                                   addToOrder = {this.addToOrder}
                                   details = {this.state.burgers[key]} /> //15
                                   
                               })} 
                        </ul>
                    
                </div>
                 <Order 
                 deleteFromOrder = {this.deleteFromOrder}
                 burgers = {this.state.burgers}
                  order={this.state.order} />
                <MenuAdmin 
                addBurger = {this.addBurger}
                loadSampleBurgers = {this.loadSampleBurgers}
                burgers = {this.state.burgers} /* 21 передача бургеров */
                updateBurger = {this.updateBurger}
                handleLogout = {this.handleLogout}
                deleteBurger = {this.deleteBurger}
              />
            </div>
            </SignIn>
        )
        
    }
}


export default App;