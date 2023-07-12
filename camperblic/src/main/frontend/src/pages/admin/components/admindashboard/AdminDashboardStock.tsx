import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../../../styles/adminStyles/admindashboard/AdminDashboardStock.css';
import { Item } from '../../../../types';
import AdminDashboardStockCook from './AdminDashboardStockCook';
import AdminDashboardStockChair from './AdminDashboardStockChair';
import AdminDashboardStockMat from './AdminDashboardStockMat';
import AdminDashboardStockEtc from './AdminDashboardStockEtc';
import AdminDashboardStockTent from './AdminDashboardStockTent';

interface ItemLayOutProps {
    items: Item[];
}

const AdminDashboardStock: React.FC<ItemLayOutProps> = ({ items }) => {

    const [deliveryStatus, setDeliveryStatus] = useState('admindashboardstocktent');
    const [tabContent, setTabContent] = useState<React.ReactNode | null>(null);
    const location = useLocation();

    const handleTabClick = (status: string) => {
        setDeliveryStatus(status);
    };

    useEffect(() => {
        switch (deliveryStatus) {
            case 'admindashboardstocktent':
                setTabContent(<AdminDashboardStockTent />);
                break;
            case 'admindashboardstockchair':
                setTabContent(<AdminDashboardStockChair />);
                break;
            case 'admindashboardstockmat':
                setTabContent(<AdminDashboardStockMat />);
                break;
            case 'admindashboardstockcook':
                setTabContent(<AdminDashboardStockCook />);
                break;
            case 'admindashboardstocketc':
                setTabContent(<AdminDashboardStockEtc />);
                break;
            default:
                setTabContent(null);
                break;
        }
    }, [deliveryStatus]);

    useEffect(() => {
        // URL 업데이트
        const path = `/admindashboard/${deliveryStatus}`;
        if (location.pathname !== path) {
            window.history.pushState(null, '', path);
        }
    }, [deliveryStatus, location.pathname]);

    return (
        <section className="adminstock_main">
            <div className="adminstock_title">
                <Link to="/adminstock">재고현황</Link>
            </div>
            <div className="adminstock_center">
                <div className="tab_container">
                    <div
                        className={`tab ${deliveryStatus === 'admindashboardstocktent' ? 'active' : ''}`}
                        onClick={() => handleTabClick('admindashboardstocktent')}
                    >
                        텐트/타프
                    </div>
                    <div
                        className={`tab ${deliveryStatus === 'admindashboardstockchair' ? 'active' : ''}`}
                        onClick={() => handleTabClick('admindashboardstockchair')}
                    >
                        테이블/체어
                    </div>
                    <div
                        className={`tab ${deliveryStatus === 'admindashboardstockmat' ? 'active' : ''}`}
                        onClick={() => handleTabClick('admindashboardstockmat')}
                    >
                        침낭/매트
                    </div>
                    <div
                        className={`tab ${deliveryStatus === 'admindashboardstockcook' ? 'active' : ''}`}
                        onClick={() => handleTabClick('admindashboardstockcook')}
                    >
                        취사용품
                    </div>
                    <div
                        className={`tab ${deliveryStatus === 'admindashboardstocketc' ? 'active' : ''}`}
                        onClick={() => handleTabClick('admindashboardstocketc')}
                    >
                        소품
                    </div>
                </div>
                {tabContent}
            </div>
        </section>
    );
};

export default AdminDashboardStock;
