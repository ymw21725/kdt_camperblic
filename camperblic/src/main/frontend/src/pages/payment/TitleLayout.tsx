import React from 'react';
import {useMatch} from "react-router-dom";
import "../../styles/paymentStyles/TitleLayout.css";
const TitleLayout = () => {

    const matchCart = useMatch("/cart")
    const matchOrder = useMatch("/order");

    let title;
    let description;

    if(matchCart) {
        title = '장바구니';
        description = '구매 진행 시에는 아래 장바구니 리스트에서 선택하신 상품만 주문 가능합니다.';
    } else if (matchOrder) {
        title = '주문하기';
        description = '결제하기 버튼 클릭 후 팝업창을 통해 결제를 진행해주세요.' +
            '배송 및 개봉 후 소비자 과실로 인한 상품 훼손은 책임지지 않습니다.';
    }

    return (
        <div className={'title_layout'}>
            <h2 className="payment section_title">{title}</h2>
            <p className="payment section_description">{description}</p>
        </div>
    );
};

export default TitleLayout;