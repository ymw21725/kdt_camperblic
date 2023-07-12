import React, { useEffect, useState } from 'react';
import '../../../../styles/adminStyles/admindashboard/AdminDashboardOrder.css';
import AdminOrderPaymentFinish from "../adminorder/AdminOrderPaymentFinish";
import AdminOrderDelivery from "../adminorder/AdminOrderDelivery";
import AdminOrderAllFinish from "../adminorder/AdminOrderAllFinish";
import { Tmp } from "../../../../types";
import { useLocation } from "react-router-dom";

interface TmpProps {
    tmp: Tmp[];
}

const AdminDashboardOrder: React.FC<TmpProps> = ({ tmp }) => {

    const [deliveryStatus, setDeliveryStatus] = useState('orderpayment');
    const [tabContent, setTabContent] = useState<React.ReactNode | null>(null);
    const [isTabContainerVisible, setIsTabContainerVisible] = useState(true);
    const location = useLocation();
    const handleTabClick = (status: string) => {
        setDeliveryStatus(status);
    };

    const toggleTabContainer = () => {
        setIsTabContainerVisible((prevVisible) => !prevVisible);
    };

    useEffect(() => {
        switch (deliveryStatus) {
            case 'orderpayment':
                setTabContent(<AdminOrderPaymentFinish />);
                break;
            case 'orderdelivery':
                setTabContent(<AdminOrderDelivery />);
                break;
            case 'orderallfinish':
                setTabContent(<AdminOrderAllFinish />);
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
        <section className='admindashboard_container'>
            <div className='admindashboard_orderTest'>
                <button className='admindashboard_orderBtn' onClick={toggleTabContainer}>
                    {isTabContainerVisible ? '주문현황 숨기기' : '주문현황 보기'}
                </button>
                <div className='tab_container'>
                    <div
                        className={`tab ${deliveryStatus === 'orderpayment' ? 'active' : ''}`}
                        onClick={() => handleTabClick('orderpayment')}
                    >
                        결제완료
                    </div>
                    <div
                        className={`tab ${deliveryStatus === 'orderdelivery' ? 'active' : ''}`}
                        onClick={() => handleTabClick('orderdelivery')}
                    >
                        배송중
                    </div>
                    <div
                        className={`tab ${deliveryStatus === 'orderallfinish' ? 'active' : ''}`}
                        onClick={() => handleTabClick('orderallfinish')}
                    >
                        배송완료
                    </div>
                </div>
                {isTabContainerVisible && tabContent}
            </div>
        </section>
    );
};

export default AdminDashboardOrder;
