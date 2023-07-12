import React, { useEffect, useState } from 'react';
import AdminBoardCampStory from "./components/adminboard/AdminBoardCampStory";
import AdminBoardFreeboard from "./components/adminboard/AdminBoardFreeboard";
import AdminBoardGatherCamper from "./components/adminboard/AdminBoardGatherCamper";
import AdminBoardReview from "./components/adminboard/AdminBoardReview";
import '../../styles/adminStyles/AdminBoard.css';
const AdminBoard = () => {

    const [boardStatus, setBoardStatus] = useState('adminboardcampstory');
    const [tabContent, setTabContent] = useState<React.ReactNode | null>(null);

    const handleTabClick = (status: string) => {
        setBoardStatus(status);
    };

    useEffect(() => {
        switch (boardStatus) {
            case 'adminboardcampstory':
                setTabContent(<AdminBoardCampStory />);
                break;
            case 'adminboardfreeboard':
                setTabContent(<AdminBoardFreeboard />);
                break;
            case 'adminboardgathercamper':
                setTabContent(<AdminBoardGatherCamper />);
                break;
            case 'adminboardreview':
                setTabContent(<AdminBoardReview />);
                break;
            default:
                setTabContent(null);
                break;
        }
    }, [boardStatus]);

    return (
        <section>
            <h1 className='adminboard_title'>관리게시판</h1>
            <div className='adminstock_center'>
                <div className='tab_container'>
                    <div
                        className={`tab ${boardStatus === 'adminboardcampstory' ? 'active' : ''}`}
                        onClick={() => handleTabClick('adminboardcampstory')}
                    >
                        캠핑이야기
                    </div>
                    <div
                        className={`tab ${boardStatus === 'adminboardfreeboard' ? 'active' : ''}`}
                        onClick={() => handleTabClick('adminboardfreeboard')}
                    >
                        자유게시판
                    </div>
                    <div
                        className={`tab ${boardStatus === 'adminboardgathercamper' ? 'active' : ''}`}
                        onClick={() => handleTabClick('adminboardgathercamper')}
                    >
                        캠퍼구인
                    </div>
                    <div
                        className={`tab ${boardStatus === 'adminboardreview' ? 'active' : ''}`}
                        onClick={() => handleTabClick('adminboardreview')}
                    >
                        리뷰게시판
                    </div>

                </div>
                {tabContent}
            </div>
        </section>
    );
};


export default AdminBoard;
