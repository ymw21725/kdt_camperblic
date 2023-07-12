import React, {useEffect, useState} from 'react';
import "../../styles/paymentStyles/ChargeBox.css";
import {useMatch} from "react-router-dom";
import {OrderList} from "./Order";
import {CartList} from "./Cart";

interface CartListProps {
    carts?: CartList[];
}

const ChargeBox: React.FC<CartListProps > = ({carts}) => {
    const matchCart = useMatch("/cart")
    const matchOrder = useMatch("/order");

    let orderOrPay;
    let agreetag;

    if(matchCart) {
        orderOrPay = '주문하기';
        agreetag = <label className={'label_agree'}>CAMPERBLIC 이용약관에 동의합니다.</label>;
    } else if (matchOrder) {
        orderOrPay = '결제하기';
        agreetag = <div></div>;
    }

    const totalPrice = carts?.reduce((accumulator, currentItem) => {
        const itemTotal = currentItem.itemcount * currentItem.price;
        return accumulator + itemTotal;
    }, 0);

    return (
        <div className="charge_section">
            <div className="charge_area">
                <div className="count_area">
                    <div className="count_item">
                        <span className={'title'}>선택 상품 수</span>
                        <span className={'data positive'}>1개</span>
                    </div>
                </div>
                <div className={'coupon_area'}>
                    <div className={'usestatus_coupon'}>
                        <span className={'title'}>쿠폰 사용여부</span>
                        <span className={'data positive'}>미적용</span>
                    </div>
                </div>
                <hr></hr>
                <div className={'discount_area'}>
                    <span className={'title'}>총 할인금액</span>
                    <span className={'discount_cost'}>0원</span>
                </div>
                <div className={'total_area'}>
                    <span className={'title'}>총 결제금액</span>
                    <div className={'total_price'}>
                        <strong className={'charge'}>{totalPrice}</strong>
                    </div>
                </div>
                <div className={'vat_info'}>
                    <span className={'text_vat'}>(부가세 포함)</span>
                </div>
            </div>
            <div className={'agree_area'}>
                <input type={"checkbox"} id={'agree_terms'} className={'input_agree'}/>
                {agreetag}
            </div>
            <a href={'/order'} target={'_self'} rel={'noreferrer'} className={'link_pay disabled'}>
                {orderOrPay}
            </a>
        </div>
    );
};

export default ChargeBox;