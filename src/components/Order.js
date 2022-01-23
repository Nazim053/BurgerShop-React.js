import React from "react";
import Shipment from "./Shipment";

class Order extends React.Component {
  renderOrder = (key) => {
    const burger = this.props.burgers[key]; // получаем список ключей обьекта
    const count = this.props.order[key]; // итог количества одного бургера

    const isAvailable = burger && burger.status === "available";

    if (!burger) return null;

    if (!isAvailable) {
      return (
        <li className="unavailable" key={key}>
          Извините, {burger ? burger.name : "бургер" /* если есть burger  */}{" "}
          временно недоступно
        </li>
      );
    }

    return (
      <li key={key}>
        <span>
          <span>{count}</span>
          шт. {burger.name}
          <span> {count * burger.price} Р</span>
          <button
            onClick={() => this.props.deleteFromOrder(key)}
            className="cancellItem">
                &times;
          </button>
        </span>
      </li>
    );
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const burger = this.props.burgers[key]; // получаем список ключей обьекта
      const count = this.props.order[key]; // итог количества одного бургера

      //17 если есть burger берем  burger.status   если его значение равно avalibale то тогда isAvailable = true
      const isAvailable = burger && burger.status === "available";
      if (isAvailable) {
        // если isAvailable true  выводи...
        return prevTotal + burger.price * count;
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Ваш Заказ</h2>
        <ul className="order">{orderIds.map(this.renderOrder)}</ul>
        {total > 0 ? (
          <Shipment total={total} />
        ) : (
          <div className="nothingSelected">
            Выберите блюда и добавьте к заказу
          </div>
        )}
      </div>
    );
  }
}

export default Order;
