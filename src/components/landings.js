import React from "react";
import restaurants from "../sample-restaurants";


class Landing extends React.Component{

    state = {
        display:false,
        title: '',
        url:'',
    };
  

    displayList = () => {
        const {display} = this.state;  // сохраняем текущие значение  state  display ..7 урок 
        this.setState({ display : !display});
    }

    getTitle = restaurants => {
        const {title,url} = restaurants;
        this.setState({title,url, display:false});
    }

    goToRestaraunt = () => {
    const {url} = this.state;
    this.props.history.push(`/restaurant/${url}`);
    }

    render() {
        return (
            <div className='restaurant_select'>
                <div className='restaurant_select_top'>
                <div onClick={this.displayList} className='restaurant_select_header font-effect-outline'>
                    { this.state.title ? this.state.title : 'Выберите ресторан'}</div>

                <div className='arrow_picker'>
                <div className='arrow_picker_up'></div>
                <div className='arrow_picker_down'></div>
                </div>
                </div>
                { this.state.display ? <div className='restaurant_select_bottom'>
                <ul>  
                    {restaurants.map(restaurants =>{
                        return <li onClick = { () => this.getTitle(restaurants)}
                         key={restaurants.id}>{(restaurants.title)}</li>
                    })}
                </ul>
                </div> : null}

                {this.state.title && !this.state.display ?<button onClick= {this.goToRestaraunt} >Перейти в ресторан</button> : null}

                
            </div>
        );
     }
}

export default Landing;


