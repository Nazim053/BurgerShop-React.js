import React from "react";

class EditBurgerForm extends React.Component {
  
    handleChange = event => {
        const updateBurger = {
            ...this.props.burger, //21 возьмем все свйства текущего berger
            [event.currentTarget.name] : event.currentTarget.value //21 вычисляемые свойства - получвем свойство и его значение
        };

      
        this.props.updateBurger(this.props.index, updateBurger); //21
    };

 
    render () {
        return (
            <div className = 'burger-edit'>
                <input name = 'name' type = 'text' onChange = {this.handleChange} value = {this.props.burger.name} />
                <input name = 'price' type = 'text' onChange = {this.handleChange} value = {this.props.burger.price} />
                <select name = 'status' className = 'status' onChange = {this.handleChange} value = {this.props.burger.status}>
                    <option value = 'available'>Доступно</option>
                    <option value = 'unavailable'>Не доступно</option>
                </select>
                <textarea name = 'desc' value = {this.props.burger.desc} />
                <input name = 'image' type = 'text' value = {this.props.burger.image} />

                <button
                    onClick = { () => this.props.deleteBurger(this.props.index)}>
                        Удалить из меню
                </button>
            </div>
        )
    }
}

export default EditBurgerForm;