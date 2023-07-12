import React, {useEffect, useState} from 'react';
import {Item, Member, Posting} from "../../types";
import '../../styles/adminStyles/AdminMemberLayout.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import AdminStockUpdate from "./components/adminstock/AdminStockUpdate";
import AdminMemberDetail from "./AdminMemberDetail";

interface MemberLayOut {
    member: Member[];
}

const AdminMemberLayout:React.FC<MemberLayOut> = ({member}) => {
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const handleOpenModal = (member: Member) => {
        setSelectedMember(member);
    };

    const handleCloseModal = () => {
        setSelectedMember(null);
    };

    const handleStockUpdate = (product:Member) => {
        // 변경된 재고 수량 값을 이용하여 필요한 로직 수행
        // 예: API 호출 등
    };


    // 검색어 상태 관리
    const [searchText, setSearchText] = useState('');
    const [searchCategory,setSearchCategory] = useState('');
    // 검색 결과 상태 관리
    const [searchedMembers, setSearchedMembers] = useState<Member[]>([]);

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
                .get(`/adminmember/search/${searchCategory}`, {
                    params: {
                        searchText: searchText,
                    },
                })
                .then((response) => {
                    // 검색 결과를 받아온 후 처리
                    const searchedMembers = response.data;
                    setSearchedMembers(searchedMembers);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        // 검색 결과가 변경될 때마다 호출되는 로직
        if (searchedMembers.length > 0) {
            // 검색 결과가 있을 경우 추가 작업 수행 가능
            console.log(searchedMembers);
        }
    }, [searchedMembers]);

    return (
        <section className='homeWidgets'>
            <div className="search-bar_member">
            <select className="admincategory_member_layout"value={searchCategory} onChange={handleCategoryChange}>
                <option value="">카테고리 선택</option>
                <option value="idSearch">ID</option>
                <option value="nameSearch">이름</option>
                <option value="emailSearch">이메일</option>
                <option value="phoneSearch">전화번호</option>
            </select>

                <input type="text" value={searchText} onChange={handleSearchInputChange} placeholder="제목검색" />
                <button onClick={handleSearch}>검색</button>
            </div>
            <table className='widgettable'>
                <thead>
                <tr className='widgetmember1'>
                    <th>id</th>
                    <th>이름</th>
                    <th>전화번호</th>
                    <th>이메일</th>
                    <th>상세보기</th>
                </tr>
                </thead>
                <tbody>
                {(searchedMembers.length > 0 ? searchedMembers : member).map((item) => (

                <tr className='widgetmember2'>
                    <td>{item.userid}</td>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>
                        <button className='widgetbtn' onClick={() => handleOpenModal(item)}>detail</button>
                    </td>
                </tr>
                ))}
                </tbody>
            </table>
            {selectedMember && (
                <AdminMemberDetail
                    member={selectedMember}
                    isOpen={true}
                    closeModal={handleCloseModal}
                    updateStock={handleStockUpdate}
                />
            )}
        </section>
    );
};

export default AdminMemberLayout;