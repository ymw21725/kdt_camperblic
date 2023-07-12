import React from 'react';
import {Order} from "../../types";
import "../../styles/loginStyles/OrderList.css"

interface OrderListProps {
    orders: Order[],
}
const OrderList : React.FC<OrderListProps>= ({ orders }) => {

    return (
        <section>
            <div className={"mypageOrderList"}>
                <table className={"mypageOrderListTable"}>
                    <thead>
                    <tr>
                        <th>주문번호</th>
                        <th>수령인</th>
                        <th>주문 ID</th>
                        <th>우편번호</th>
                        <th>도로명 주소</th>
                        <th>상세주소</th>
                        <th>배송상태</th>
                        <th>총 가격</th>
                        <th>주문시간</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order.orderid}>
                            <td>{order.orderid}</td>
                            <td>{order.addressee}</td>
                            <td>{order.userid}</td>
                            <td>{order.address1}</td>
                            <td>{order.address2}</td>
                            <td>{order.address3}</td>
                            <td>{order.orderstatus}</td>
                            <td>{order.deliverycost}</td>
                            <td>{order.orderdate}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default OrderList;