import React from "react";


class Shipment extends React.Component {

    render() {
        const {total} = this.props;
        // сумма заказа больше 0 и меньше 500 то стоимость доставки 350 в противном случаем стоимость доставки 99
        const shipping = total > 0 && total < 500 ? 350 : 99;
        const shipingNeon = shipping === 99 ? ( // если 99 то оборчиваем в этот
            <span className = 'font-effect-neon total-wrap-cheap'>
                {shipping} Р </span>
        ) : ( //  в ином случае
            <span>{shipping} Р</span>
        ) ;

        return (
            <div className='total'>
                <div className='total-wrap'>
                    <div>
                        <div>Доставка: {total > 0 ? shipingNeon : null}</div>
                        <div className = 'total_wrap-free'>
                            {total < 500 ? `Закажите еще на ${500 - total} Р для доставки за 99р` : null}
                        </div>
                    </div>
                    <div className='total-wrap-final'>
                        Итого : {total /* вывод суммы заказа*/} Р
                    </div>
                </div>
            </div>
        );
    }
}

export default Shipment;