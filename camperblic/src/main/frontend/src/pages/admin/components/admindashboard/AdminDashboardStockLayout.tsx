import React from 'react';
import { Item } from "../../../../types";
import '../../../../styles/adminStyles/admindashboard/AdminDashboardStockLayout.css';

interface ItemLayOutProps {
    items: Item[];
}

const AdminDashboardStockLayout: React.FC<ItemLayOutProps> = ({ items }) => {

    return (
        <div className="admin-dashboard-stock-layout">
            <table>
                <thead>
                <tr>
                    <th>상품코드</th>
                    <th>상품이름</th>
                    <th>남은재고</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                    <tr key={item.itemId}>
                        <td>{item.itemId}</td>
                        <td>{item.name}</td>
                        <td>{item.currentStock}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboardStockLayout;
