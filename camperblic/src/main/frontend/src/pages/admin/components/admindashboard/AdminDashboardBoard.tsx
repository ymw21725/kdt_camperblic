import React, { useEffect, useState } from 'react';
import '../../../../styles/adminStyles/admindashboard/AdminDashboardBoard.css';
import { Link,useLocation } from "react-router-dom";
import {Posting} from "../../../../types";
import AdminDashboardBoardCampStory from "./AdminDashboardBoardCampStory";
import AdminDashboardBoardFreeboard from "./AdminDashboardBoardFreeboard";
import AdminDashboardBoardGatherCamper from "./AdminDashboardBoardGatherCamper";
import AdminDashboardBoardReview from "./AdminDashboardBoardReview";

interface BoardLayOutProps {
    postings: Posting[];
}

const AdminDashboardBoard: React.FC<BoardLayOutProps> = ({ postings }) => {
    const [boardStatus, setBoardStatus] = useState('admindashboardboardcampstory');
    const [tabContent, setTabContent] = useState<React.ReactNode | null>(null);
    const location = useLocation();

    const handleTabClick = (status: string) => {
        setBoardStatus(status);
    };

    useEffect(() => {
        switch (boardStatus) {
            case 'admindashboardboardcampstory':
                setTabContent(<AdminDashboardBoardCampStory />);
                break;
            case 'admindashboardboardfreeboard':
                setTabContent(<AdminDashboardBoardFreeboard />);
                break;
            case 'admindashboardboardgathercamper':
                setTabContent(<AdminDashboardBoardGatherCamper />);
                break;
            case 'admindashboardboardreviewcamping':
                setTabContent(<AdminDashboardBoardReview />);
                break;
            default:
                setTabContent(null);
                break;
        }
    }, [boardStatus]);

    useEffect(() => {
        // URL 업데이트
        const path = `/admindashboard/${boardStatus}`;
        if (location.pathname !== path) {
            window.history.pushState(null, '', path);
        }
    }, [boardStatus, location.pathname]);

    return (
        <section className='admindashboard_main'>
            <div className='admindashboard_title'>
                <Link to='/adminboard'>게시판현황</Link>
            </div>
            <div className='admindashboard_center'>
                <div className='tab_container'>
                    <div
                        className={`tab ${boardStatus === 'admindashboardboardcampstory' ? 'active' : ''}`}
                        onClick={() => handleTabClick('admindashboardboardcampstory')}
                    >
                        캠핑이야기
                    </div>
                    <div
                        className={`tab ${boardStatus === 'admindashboardboardfreeboard' ? 'active' : ''}`}
                        onClick={() => handleTabClick('admindashboardboardfreeboard')}
                    >
                        자유게시판
                    </div>
                    <div
                        className={`tab ${boardStatus === 'admindashboardboardgathercamper' ? 'active' : ''}`}
                        onClick={() => handleTabClick('admindashboardboardgathercamper')}
                    >
                        캠퍼구인
                    </div>
                    <div
                        className={`tab ${boardStatus === 'admindashboardboardreviewcamping' ? 'active' : ''}`}
                        onClick={() => handleTabClick('admindashboardboardreviewcamping')}
                    >
                        리뷰게시판
                    </div>
                </div>
                {tabContent}
            </div>
        </section>
    );
};

export default AdminDashboardBoard;
