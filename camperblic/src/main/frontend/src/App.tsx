import React, {useEffect, useRef} from 'react';

import "./styles/App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import Cook from "./pages/item/Cook";
import Etc from "./pages/item/Etc";
import Mat from "./pages/item/Mat";
import ItemDetail from "./pages/item/ItemDetail";
import ItemAll from "./pages/item/ItemAll";
import Chair from "./pages/item/Chair";
import Tent from "./pages/item/Tent";
import Login from "./pages/login/Login";
import SignUp from "./pages/login/SignUp";
import Cart from "./pages/payment/Cart";
import Order from "./pages/payment/Order";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBoard from "./pages/admin/AdminBoard";
import AdminMember from "./pages/admin/AdminMember";
import AdminStock from "./pages/admin/AdminStock";
import FindAccount from "./pages/login/FindAccount";
import FindPassword from "./pages/login/FindPassword";
import MyPage from "./pages/login/MyPage";
import OrderList from "./pages/login/OrderList";
import OrderDetail from "./pages/payment/OrderDetail";
import CampStroy from "./pages/community/CampStroy";
import CommunityDashboard from "./pages/community/CommunityDashboard";
import FreeBoard from "./pages/community/FreeBoard";
import GatherCamperBoard from "./pages/community/GatherCamperBoard";
import ReviewCamping from "./pages/community/ReviewCamping";
import BoardDetail from "./pages/community/BoardDetail";
import BoardWrite from "./pages/community/BoardWrite";
import axios from "axios";

function App() {
    const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);
    let isLoggedIn = sessionStorage.getItem("username");
    useEffect(() => {
        if(isLoggedIn != null && isLoggedIn.length >0){
            // 로그아웃 타이머 변수
            let logoutTimeout: NodeJS.Timeout | null = null;
            const logout = () => {
                axios
                    .post("/logout", null, {
                        withCredentials: true,
                    })
                    .then((response) => {
                        sessionStorage.clear();
                        alert("로그아웃 되었습니다. 다시 로그인 해주세요.");
                        window.location.href = '/login';
                    })
                    .catch((error) => {
                        console.log(error.response.data);
                        alert("로그아웃 실패");
                        window.location.href ="/";
                    });
            };
            const startLogoutTimer = () => {
                logoutTimeout = setTimeout(() => {
                    logout();
                }, 60000 * 60);
            };
            const resetLogoutTimer = () => {
                if (logoutTimeout) {
                    clearTimeout(logoutTimeout);
                }
                startLogoutTimer();
            };
            const handleInteraction = () => {
                resetLogoutTimer();
            };

            // 로그인 상태일 때만 타이머 시작
            if (isLoggedIn != null) {
                startLogoutTimer();
            }
            // 로그인 시 사용자 상호작용 이벤트 리스너 등록
            window.addEventListener('mousemove', handleInteraction);
            window.addEventListener('keydown', handleInteraction);
            window.addEventListener('click', handleInteraction);

            // 컴포넌트가 언마운트될 때 이벤트 리스너 해제
            return () => {
                if (logoutTimeout) {
                    clearTimeout(logoutTimeout);
                }
                window.removeEventListener('mousemove', handleInteraction);
                window.removeEventListener('keydown', handleInteraction);
                window.removeEventListener('click', handleInteraction);
            };
        }
    }, [isLoggedIn]);

    return (

        <div>
            <BrowserRouter>
                <Header/>

                <main>
                    <Routes>
                        <Route path='/' element={<Main/>}/>

                        {/* 호준 로그인 관련 페이지 */}
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/signup' element={<SignUp/>}/>
                        <Route path='/mypage' element={<MyPage/>}/>
                        <Route path='/findaccount' element={<FindAccount/>}/>
                        <Route path='/findpassword' element={<FindPassword/>}/>

                        {/* 민수 커뮤니티 관련 페이지 */}
                        <Route path='/campstory' element={<CampStroy/>}/>
                        <Route path='/community' element={<CommunityDashboard/>}/>
                        <Route path='/freeboard' element={<FreeBoard/>}/>
                        <Route path='/gathercamper' element={<GatherCamperBoard/>}/>
                        <Route path='/reviewcamping' element={<ReviewCamping/>}/>
                        <Route path='/boarddetail/:category/:id' element={<BoardDetail/>}/>
                        <Route path='/writepost/:category' element={<BoardWrite/>}/>

                        {/* 신준 상품 관련 페이지 */}
                        <Route path='/itemall' element={<ItemAll/>}/>
                        <Route path='/itemdetail/:categoryId/:itemId' element={<ItemDetail/>}/>
                        <Route path='/cook' element={<Cook/>}/>
                        <Route path='/etc' element={<Etc/>}/>
                        <Route path='/mat' element={<Mat/>}/>
                        <Route path='/chair' element={<Chair/>}/>
                        <Route path='/tent' element={<Tent/>}/>

                        {/* 종윤 결제 관련 페이지 */}
                        <Route path='/cart' element={<Cart/>}/>
                        <Route path='/order' element={<Order/>}/>
                        <Route path='/orderdetail' element={<OrderDetail/>}/>

                        {/* 민우 관리자 페이지 */}
                        <Route path='/admindashboard' element={<AdminDashboard/>}/>
                        <Route path='/adminboard' element={<AdminBoard/>}/>
                        <Route path='/adminmember' element={<AdminMember/>}/>
                        <Route path='/adminstock' element={<AdminStock/>}/>
                    </Routes>
                </main>

                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;