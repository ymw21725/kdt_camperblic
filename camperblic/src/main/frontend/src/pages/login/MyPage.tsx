import React, {useEffect, useState} from 'react';
import axios from 'axios';
import RenderUserInformation from './RenderUserInformation';
import {Member, Order} from "../../types";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import OrderList from "./OrderList";
import "../../styles/loginStyles/MyPage.css"
import {useNavigate} from "react-router-dom";

const MyPage = () => {
    const history = useNavigate();
    const [user, setUser] = useState<Member>({
        userid: "",
        name: "",
        email: "",
        phone: "",
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        createdDate: "",
    });
    const [orders, setOrders] = useState<Order[]>([]);
    const [isUser, setIsUser] = useState<boolean>(false);
    const [isUserOrder, setIsUserOrder] = useState<boolean>(false);
    useEffect(() => {
        // 유저 정보를 가져오는 API 호출
        axios
            .get('/mypage', {withCredentials: true})
            .then((response) => {
                if (response.status === 200) {
                    const {member, orders} = response.data;
                    setUser(member);
                    setOrders(orders);
                    sessionStorage.setItem("username", member.name);
                    if (member != null) {
                        setIsUser(true);
                    }
                    if (orders.length > 0) {
                        setIsUserOrder(true);
                    }
                }
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    alert("서버에 문제가 있습니다. 잠시만 기다려주세요.");
                    console.log(error.response.data);
                    history("/");
                } else if (error.response.status === 423) {
                    sessionStorage.clear();
                    alert("사용자를 찾지 못했습니다. 로그인 상태를 확인해주세요.");
                    history("/login")
                }
            });
    }, []);

    return (
        <section>
            <div className="mypageMainDiv">
                <div className={"myPageComDiv"}>
                    {isUser && <RenderUserInformation user={user}/>}
                    {isUserOrder && <OrderList orders={orders}/>}
                </div>
            </div>
        </section>
    );
};

export default MyPage;
