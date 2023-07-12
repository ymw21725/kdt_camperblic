import React from 'react';
import "../../styles/paymentStyles/ItemlistCart.css"
import {OrderList} from "./Order";

interface OrderListProps {
    orders : OrderList[];
}

const ItemlistOrder: React.FC<OrderListProps> = ({orders}) => {
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
                        <th scope="col" className="itemimg">
                            <span className="img_item">사진</span>
                        </th>
                        <th scope="col" className="itemTitle">
                            <span className="itemTitle_text">상품명</span>
                        </th>
                        <th scope="col" className="item_count">
                            <span className="count">주문 수량</span>
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
                    {orders.map((order) => (
                        <tr key={order.cartid} className="selected list_main">
                            <td className="itemimg">
                                <img src={order.image_path} alt="" className="img_item"
                                />
                            </td>
                            <td className="itemTitle">
                                <span  title={order.name} className="itemTitle_text">{order.name}
                                </span>
                            </td>
                            {/* 수량변경 버튼 */}
                            <td title="주문수량" className="item_count">
                                <span className="count">{order.itemcount}</span>
                            </td>
                            <td className="price_box">
                                <div className="price">
                                    {(order.price*order.itemcount)}
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

export default ItemlistOrder;