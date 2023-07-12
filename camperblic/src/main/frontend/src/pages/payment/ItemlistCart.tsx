import React, {useEffect, useState} from 'react';
import "../../styles/paymentStyles/ItemlistCart.css"
import cart, {CartList} from "./Cart";
import axios from "axios";
import {useNavigate} from "react-router-dom";

interface CartListProps {
    carts: CartList[];
    setFlag: React.Dispatch<React.SetStateAction<boolean>>;
    rflag: boolean;
}

const ItemlistCart: React.FC<CartListProps > = ({carts ,setFlag, rflag }) => {
    const history = useNavigate();
    const handleItemcount = async (cartid: number, itemcount: number, flag:number, price:number)  => {
        // async, await 사용이유 :
        await axios.put(`/cart`, null, {
            params:{
                cartid: cartid,
                itemcount: itemcount,
                flag: flag,
                price: price,
            }
        })
            .then(response => {
                console.log(response.data);
                // window.location.href = "/cart";
                history("/cart");
                setFlag(!rflag);
            })
            .catch(error => {
                if (error.response.status === 423) {
                    sessionStorage.clear();
                    alert("사용자를 찾지 못했습니다. 로그인 상태를 확인해주세요.");
                    history("/login");
                }
                console.log(error);
            });
    }

    return (
        <div className="item_cart">
            <div className="list_table_wrap">
                <table className="itemlist_table" border={1}>
                    <caption>
                        <span className="texttext">
                        상품 이미지, 상품명, 수량, 가격 정보 및 선택 기능, 삭제 기능을 제공하는 표
                        </span>
                    </caption>

                    <thead className="itemlist_thead">
                    <tr>
                        <th scope="col" className="cartlist_select">
                            <span className="input_check">선택</span>
                        </th>
                        <th scope="col" className="itemimg">
                            <span className="img_item">사진</span>
                        </th>
                        <th scope="col" className="itemTitle">
                            <span className="itemTitle_text">상품명</span>
                        </th>
                        <th scope="col" className="item_count">
                            <span className="count">수량</span>
                        </th>
                        <th scope="col" className="pay">
                            <span className="price">금액</span>
                        </th>
                        <th scope="col" className="list_delete">
                            <span className="delete_thead">삭제</span>
                        </th>
                    </tr>
                    </thead>

                    <tbody className="itemlist_tbody">

                    {carts.map((cart) => (
                        <tr key={cart.cartid} className="selected list_main">
                            <td className="cartlist_select">
                                <input type="checkbox" id="{itemname}" title="상품 선택" className="input_check_checked"/>
                            </td>
                            <td className="itemimg">
                                <img src={cart.image_path} alt="" className="img_item"
                                />
                            </td>
                            <td className="itemTitle">
                                    <span  title={cart.name} className="itemTitle_text">{cart.name}
                                    </span>
                            </td>
                            {/* 수량변경 버튼 */}
                            <td title="수량변경" className="item_count">
                                <button
                                    className="decrement"
                                    onClick={() => handleItemcount(cart.cartid, cart.itemcount, -1, cart.price)}
                                    disabled={cart.itemcount === 1} // 수량이 1이면 버튼 비활성화
                                >
                                    -
                                </button>
                                <span className="count">{cart.itemcount}</span>
                                <button
                                    className="increment"
                                    onClick={() => handleItemcount(cart.cartid, cart.itemcount, +1 ,cart.price)}
                                    disabled={cart.itemcount === 20} // 수량이 100이면 버튼 비활성화
                                >
                                    +
                                </button>
                            </td>
                            <td className="price_box">
                                <div className="price">
                                    {(cart.price*cart.itemcount)}
                                </div>
                            </td>
                            <td className="list_delete">
                                <a href="#" role="button" className="btn_delete_one"
                                ><span className="delete_one">삭제</span></a
                                >
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ItemlistCart;