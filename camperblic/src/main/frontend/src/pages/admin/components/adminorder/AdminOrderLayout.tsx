import React, {useEffect, useState} from 'react';
import {Item, Posting, Tmp} from "../../../../types";
import '../../../../styles/adminStyles/admindashboard/AdminDashboardOrderLayout.css';
import axios from "axios";

interface TmpLayOut {
    tmp: Tmp[];
}
const AdminOrderLayout:React.FC<TmpLayOut> = ({tmp}) => {

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

    // 검색어 상태 관리
    const [searchText, setSearchText] = useState('');
    const [searchCategory,setSearchCategory] = useState('');
    // 검색 결과 상태 관리
    const [searchedOrders, setSearchedOrders] = useState<Tmp[]>([]);

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
                .get(`/admindashboard/order/search/${searchCategory}`, {
                    params: {
                        searchText: searchText,
                    },
                })
                .then((response) => {
                    // 검색 결과를 받아온 후 처리
                    const searchedOrders = response.data;
                    setSearchedOrders(searchedOrders);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        // 검색 결과가 변경될 때마다 호출되는 로직
        if (searchedOrders.length > 0) {
            // 검색 결과가 있을 경우 추가 작업 수행 가능
            console.log(searchedOrders);
        }
    }, [searchedOrders]);

    return (
        <section>
            {/* 검색 입력란과 검색 버튼 */}
            <div className="search-bar_order">
            <select className="admincategoryorder_layout" value={searchCategory} onChange={handleCategoryChange}>
                <option value="">카테고리 선택</option>
                <option value="orderid">상품ID</option>
                <option value="userid">주문자ID</option>
            </select>
                <input type="text" value={searchText} onChange={handleSearchInputChange} placeholder="제목검색" />
                <button onClick={handleSearch}>검색</button>
            </div>
            <table className='AdminBoard_table'>
                <thead>
                <tr className='AdminBoardFormth'>
                    <th>주문번호</th>
                    <th>주문ID</th>
                    <th>가격(원)</th>
                    <th>주문시간</th>
                    <th>배송상태</th>
                </tr>
                </thead>
                <tbody>
                {(searchedOrders.length > 0 ? searchedOrders : tmp).map((item) => (
                    <tr className='AdminBoardFormtd'>
                        <td className='AdminBoardFormtdcenter'>{item.orderid}</td>
                        <td className='AdminBoardFormtdcenter'>{item.userid}</td>
                        <td className='AdminBoardFormtdcenter'>{item.deliverycost}</td>
                        <td className='AdminBoardFormtdcenter'>{formatDate(item.orderdate)}</td>
                        <td className='AdminBoardFormtdcenter'>{item.orderstatus}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );
};

export default AdminOrderLayout;