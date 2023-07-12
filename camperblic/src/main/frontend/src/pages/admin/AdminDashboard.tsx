import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminDashboardSecond from './components/admindashboard/AdminDashboardSecond';
import AdminDashboardBottom from './components/admindashboard/AdminDashboardBottom';
import AdminDashboardOrder from "./components/admindashboard/AdminDashboardOrder";
import {GraphDTO, Item, Posting, Tmp} from "../../types";
import { useNavigate, useLocation } from "react-router-dom";
import AdminDashboardGraph from "./components/admindashboard/AdminDashboardGraph";
import '../../styles/adminStyles/AdminDashboard.css';

const AdminDashboard = () => {
    const [isOrderStatusVisible, setOrderStatusVisible] = useState(false);
    const [items, setItems] = useState<Item[]>([]);
    const [postings, setPostings] = useState<Posting[]>([]);
    const [tmp,setTmp] = useState<Tmp[]>([]);
    const [graph,setGraph] = useState<GraphDTO[]>([]);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleOrderStatus = () => {
        setOrderStatusVisible(!isOrderStatusVisible);
    };

    useEffect(() => {
        setOrderStatusVisible(false);

        // 컨트롤러에서 값을 받아오는 API 호출
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get("/admindashboard");
                const { items, postings, totals } = response.data;
                setItems(items);
                setPostings(postings);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDashboardData();

        // URL 변경
        const path = '/admindashboard';
        if (location.pathname !== path) {
            window.history.replaceState(null, '', path);
        }
    }, [location]);

    return (
        <section>
            <h1 className='admindashboard_first'>Camperblic관리자_대시보드</h1>
            <AdminDashboardSecond
                tmp={tmp}
                isOrderStatusVisible={isOrderStatusVisible}
                onToggleOrderStatus={toggleOrderStatus}
            />
            <AdminDashboardGraph/>
            <AdminDashboardOrder tmp={tmp}/>
            <AdminDashboardBottom items={items} postings={postings} />
        </section>
    );
};

export default AdminDashboard;
