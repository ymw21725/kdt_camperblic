import React, {useEffect, useState} from 'react';
import '../../styles/adminStyles/AdminStock.css';
import AdminStockTent from "./components/adminstock/AdminStockTent";
import AdminStockChair from "./components/adminstock/AdminStockChair";
import AdminStockMat from "./components/adminstock/AdminStockMat";
import AdminStockCook from "./components/adminstock/AdminStockCook";
import AdminStockEtc from "./components/adminstock/AdminStockEtc";

const AdminStock = () => {

    const [stockStatus, setStockStatus] = useState('adminstocktent');
    const [tabContent, setTabContent] = useState<React.ReactNode | null>(null);

    const handleTabClick = (status: string) => {
        setStockStatus(status);
    };

    useEffect(() => {
        switch (stockStatus) {
            case 'adminstocktent':
                setTabContent(<AdminStockTent />);
                break;
            case 'adminstockchair':
                setTabContent(<AdminStockChair />);
                break;
            case 'adminstockmat':
                setTabContent(<AdminStockMat />);
                break;
            case 'adminstockcook':
                setTabContent(<AdminStockCook />);
                break;
            case 'adminstocketc':
                setTabContent(<AdminStockEtc />);
                break;

            default:
                setTabContent(null);
                break;
        }
    }, [stockStatus]);

    return (
        <section className='adminboard_main'>
            <h1 className='adminboard_title'>재고현황</h1>
            <div className='adminstock_center'>
                <div className='tab_container'>
                    <div
                        className={`tab ${stockStatus === 'adminstocktent' ? 'active' : ''}`}
                        onClick={() => handleTabClick('adminstocktent')}
                    >
                        텐트/타프
                    </div>
                    <div
                        className={`tab ${stockStatus === 'adminstockchair' ? 'active' : ''}`}
                        onClick={() => handleTabClick('adminstockchair')}
                    >
                        테이블/체어
                    </div>
                    <div
                        className={`tab ${stockStatus === 'adminstockmat' ? 'active' : ''}`}
                        onClick={() => handleTabClick('adminstockmat')}
                    >
                        침낭/매트
                    </div>
                    <div
                        className={`tab ${stockStatus === 'adminstockcook' ? 'active' : ''}`}
                        onClick={() => handleTabClick('adminstockcook')}
                    >
                        취사용품
                    </div>
                    <div
                        className={`tab ${stockStatus === 'adminstocketc' ? 'active' : ''}`}
                        onClick={() => handleTabClick('adminstocketc')}
                    >
                        소품
                    </div>
                </div>
                {tabContent}
            </div>
        </section>
    );
};

export default AdminStock;