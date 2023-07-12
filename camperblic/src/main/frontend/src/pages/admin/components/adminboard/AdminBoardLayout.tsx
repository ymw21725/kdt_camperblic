import React, {useEffect, useState} from 'react';
import {Posting} from "../../../../types";
import '../../../../styles/adminStyles/AdminBoardLayout.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";

interface BoardLayOutProps {
    postings: Posting[];
    category: string;
}

const AdminBoardLayout:React.FC<BoardLayOutProps> = ({ postings,category }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        const weekday = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

        return `${year}.${month}.${day} ${weekday} ${hour}시${minute}분`;
    };

    const navigate = useNavigate();
    const handleEdit = (bid: number, category: string) => {
        navigate(`/boarddetail/${category}/${bid}`);
    };

    // 검색어 상태 관리
    const [searchText, setSearchText] = useState('');
    // 검색 카테고리 관리
    const [searchCategory,setSearchCategory] = useState('');
    // 검색 결과 상태 관리
    const [searchedPostings, setSearchedPostings] = useState<Posting[]>([]);

    // 검색어 입력 시 실행되는 함수
    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    // 카테고리 선택 시 실행되는 함수
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchCategory(event.target.value);
    };

    const handleSearch = () => {
        // 검색어가 있을 경우에만 서버로 요청
        if (searchText.trim() !== '') {
            axios
                .get(`/adminboard/search/${searchCategory}`, {
                    params: {
                        searchText: searchText,
                    },
                })
                .then((response) => {
                    // 검색 결과를 받아온 후 처리
                    const searchedPostings = response.data;
                    setSearchedPostings(searchedPostings);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        // 검색 결과가 변경될 때마다 호출되는 로직
        if (searchedPostings.length > 0) {
            // 검색 결과가 있을 경우 추가 작업 수행 가능
            console.log(searchedPostings);
        }
    }, [searchedPostings]);

    return (
        <section>
            {/* 검색 입력란과 검색 버튼 */}
            <div className="search-bar_board">
            <select className="admincategory_board_layout" value={searchCategory} onChange={handleCategoryChange}>
                <option value="">카테고리 선택</option>
                <option value="campstory">캠핑이야기</option>
                <option value="freeboard">자유게시판</option>
                <option value="gathercamper">캠퍼구인</option>
                <option value="reviewcamping">리뷰게시판</option>
            </select>
                <input type="text" value={searchText} onChange={handleSearchInputChange} placeholder="제목검색" />
                <button onClick={handleSearch}>검색</button>
            </div>
            <table className='AdminBoard_table'>
                <thead>
                <tr className='AdminBoardFormth'>
                    <th>ID</th>
                    <th>작성자</th>
                    <th>제목</th>
                    <th>작성일</th>
                    <th>Views</th>
                    <th>수정</th>
                </tr>
                </thead>
                <tbody>
                {(searchedPostings.length > 0 ? searchedPostings : postings).map((item) => (
                    <tr className="AdminBoardFormtd" key={item.id}>
                        <td className="AdminBoardFormtdcenter">{item.id}</td>
                        <td className="AdminBoardFormtdcenter">{item.name}</td>
                        <td className="AdminBoardFormtdcenter">{item.title}</td>
                        <td className="AdminBoardFormtdcenter">{formatDate(item.createdate)}</td>
                        <td className="AdminBoardFormtdcenter">{item.views}</td>
                        <td className="AdminBoardFormtdcenter">
                            <button className="adminBoardForm_btn" onClick={() => handleEdit(item.id, category)}>
                                수정
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );
};

export default AdminBoardLayout;