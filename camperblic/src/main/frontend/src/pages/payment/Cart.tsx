import React, {useEffect, useState} from 'react';
import "../../styles/paymentStyles/Cart.css";
import TitleLayout from "./TitleLayout";
import ItemlistCart from "./ItemlistCart";
import ChargeBox from "./ChargeBox";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export interface CartList {
    cartid: number,
    image_path: string,
    name: string,
    itemcount: number,
    price: number,
}

const Cart = () => {
    const [carts, setCarts] = useState<CartList[] | null>(null);
    const [loading, setLoading] = useState(true); // 로딩 상태를 관리하기 위한 상태 변수 추가
    const history = useNavigate();
    const [rflag , setFlag] = useState<boolean>(true)
    useEffect(() => {
        axios.get('/cart', {withCredentials : true})
            .then(response => {
                console.log(response.data);
                setCarts(response.data);
                setLoading(false); // 로딩 상태 변경
                history("/cart");
            })
            .catch(error => {
                if (error.response.status === 423) {
                    sessionStorage.clear();
                    alert("사용자를 찾지 못했습니다. 로그인 상태를 확인해주세요.");
                    history("/login");
                }
                console.log(error);
                setLoading(false); // 로딩 상태 변경
            })

    }, [rflag]);

    if (loading) {
        return <div>Loading...</div>; // 로딩 중일 때 표시할 UI
    }

    if (carts === null) { // 응답이 도착하지 않았거나 null인 경우
        return <div>Loading...</div>; // 또는 로딩 중을 나타내는 다른 UI를 표시할 수 있습니다.
    }

    return (
        <section className="cartLayout">
            <div className="section_wrap">
                <div className="list_section">
                    <div className="list_inner">
                        <TitleLayout/>
                        <ItemlistCart carts={carts} setFlag={setFlag} rflag={rflag}/>
                    </div>
                </div>
                <ChargeBox carts={carts}/>
            </div>
            <div className="progress_section"></div>
        </section>
    );
};

export default Cart;