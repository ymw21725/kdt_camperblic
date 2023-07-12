import React from 'react';
import { Link } from 'react-router-dom';
import '../../../../styles/adminStyles/admindashboard/AdminDashboardSecond.css';
import AdminDashboardSecondTime from './AdminDashboardSecondTime';
import {Tmp} from "../../../../types";

interface AdminDashboardSecondProps {
    isOrderStatusVisible: boolean;
    onToggleOrderStatus: () => void;
    tmp:Tmp[];
}

const AdminDashboardSecond: React.FC<AdminDashboardSecondProps> = ({ tmp }) => {

    return (
        <section className="second_div">
            <Link className="second_member" to="/adminmember">
                회원관리
            </Link>
            <AdminDashboardSecondTime />
        </section>
    );
};

export default AdminDashboardSecond;
