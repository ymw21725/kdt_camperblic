import React, {useEffect, useState} from 'react';
import {Item, Posting} from "../../../../types";
import '../../../../styles/adminStyles/AdminStockLayout.css';
import AdminStockUpdate from "./AdminStockUpdate";
import axios from "axios";
interface ItemLayOutProps {
    items: Item[];
}
const AdminStockLayout:React.FC<ItemLayOutProps> = ({items}) => {
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const handleOpenModal = (item: Item) => {
        setSelectedItem(item);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
    };

    const handleStockUpdate = (product:Item) => {
        // 변경된 재고 수량 값을 이용하여 필요한 로직 수행
        // 예: API 호출 등
    };

    const [searchText, setSearchText] = useState('');
    const [searchCategory,setSearchCategory] = useState('');
    // 검색 결과 상태 관리
    const [searchedItems, setSearchedItems] = useState<Item[]>([]);

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
                .get(`/adminstock/search/${searchCategory}`, {
                    params: {
                        searchText: searchText,
                    },
                })
                .then((response) => {
                    // 검색 결과를 받아온 후 처리
                    const searchedItems = response.data;
                    setSearchedItems(searchedItems);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        // 검색 결과가 변경될 때마다 호출되는 로직
        if (searchedItems.length > 0) {
            // 검색 결과가 있을 경우 추가 작업 수행 가능
            console.log(searchedItems);
        }
    }, [searchedItems]);


    return (
        <section>
            {/* 검색 입력란과 검색 버튼 */}
            <div className="search-bar_stock">
            <select className="admincategory_stock_layout" value={searchCategory} onChange={handleCategoryChange}>
                <option value="">카테고리 선택</option>
                <option value="tent">텐트/타프</option>
                <option value="chair">테이블/체어</option>
                <option value="mat">침낭/매트</option>
                <option value="cook">취사용품</option>
                <option value="etc">소품</option>
            </select>
                <input type="text" value={searchText} onChange={handleSearchInputChange} placeholder="상품명검색" />
                <button onClick={handleSearch}>검색</button>
            </div>
            <table className='AdminStock_tabcontenttable'>
                <thead>
                <tr className='AdminStock_contenttableth'>
                    <th>상품이미지</th>
                    <th>상품코드</th>
                    <th>상품명</th>
                    <th>상품가격(원)</th>
                    <th>재고수량</th>
                    <th>재고수정</th>
                </tr>
                </thead>
                <tbody>
                {(searchedItems.length > 0 ? searchedItems : items).map((item) => (
                <tr className='AdminStock_contenttabletd'>
                    <td>
                        <img className='AdminStock_contentImg' src={item.imagePath} />
                    </td>
                    <td>{item.itemId}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.currentStock}</td>
                    <td>
                        <button className='AdminStock_modifyBtn' onClick={() => handleOpenModal(item)}>수정</button>
                    </td>
                </tr>
                ))}
                </tbody>
            </table>
            {selectedItem && (
                <AdminStockUpdate
                    item={selectedItem}
                    isOpen={true}
                    closeModal={handleCloseModal}
                    updateStock={handleStockUpdate}
                />
            )}
        </section>
    );
};

export default AdminStockLayout;