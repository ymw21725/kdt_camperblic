import React from 'react';
import {Posting} from "../../../../types";
import '../../../../styles/adminStyles/admindashboard/AdminDashboardboardLayout.css';

interface BoardLayOutProps {
    postings: Posting[];
}

const AdminDashboardBoardLayout:React.FC<BoardLayOutProps> = ({postings}) => {

    const formatDate = (dateStr:any) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day}-${hours}:${minutes}:${seconds}`;
    };

    return (
        <div className='admin-dashboard-board-layout'>
            <table>
                <thead>
                <tr>
                    <th>글제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                </tr>
                </thead>
                <tbody>
                {postings.map((posting) => (
                    <tr key={posting.id}>
                        <td>{posting.title}</td>
                        <td>{posting.name}</td>
                        <td>{formatDate(posting.createdate)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboardBoardLayout;