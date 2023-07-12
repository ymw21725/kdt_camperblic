// AdminStockUpdate.jsx

import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import {Item} from '../../../../types';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import '../../../../styles/adminStyles/AdminStockUpdate.css';

Modal.setAppElement('#root');

interface AdminStockUpdateProps {
    isOpen: boolean;
    closeModal: () => void;
    updateStock: (product: Item) => void;
    item: Item;
}

interface stockTmp {
    itemId: string;
    categoryId: string;
    currentStock: number;
}

const AdminStockUpdate: React.FC<AdminStockUpdateProps> = ({
                                                               isOpen,
                                                               closeModal,
                                                               updateStock,
                                                               item,
                                                           }) => {
    const [currentStock, setCurrentStock] = useState(item.currentStock);
    const history = useNavigate ();
    const [dataupdate, setDataupdate] = useState<stockTmp>({
        itemId: "",
        categoryId: "",
        currentStock: 0,
    });

    useEffect(() => {
        setCurrentStock(item.currentStock);
        setDataupdate((prevData) => ({
            ...prevData,
            itemId: item.itemId,
            categoryId: item.categoryId,
            currentStock: item.currentStock,
        }));
    }, [item.currentStock]);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.put("/adminstock/currentstock", null, {params: dataupdate})
            .then((response) => {
                if (response.status === 200) {
                    window.location.href = '/';
                    alert("정보 수정 성공 ");
                }
            })
            .catch((error) => {
                console.log(error);
                window.location.href = '/adminstock';
                alert(error);
            });
    };

    // 모달 닫기 함수
    const handleCloseModal = () => {
        closeModal(); // 모달 닫기
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataupdate({ ...dataupdate, [e.target.name]: e.target.value });
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleCloseModal} // 모달 닫기 함수 사용
            contentLabel="Add Product Modal"
            className='adminmodal_update'
        >
            <h2 className='adminmodal_title'>상품 재고 수정</h2>
            <div>
                <img className='adminmodal_img' src={item.imagePath} alt="상품 이미지"/>
                <p className='adminmodal_p'>카테고리 : {item.categoryId}</p>
                <p className='adminmodal_p'>아이템 id: {item.itemId}</p>
                <p className='adminmodal_p'>아이템 명: {item.name}</p>
            </div>
            <form className='adminmodal_form' onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="재고 수정"
                    value={dataupdate.currentStock}
                    name={"currentStock"}
                    className='adminmodal_input'
                    onChange={handleChange}/>
                <button className='adminmodal_btn' type="submit">재고 수정</button>
                <button className='adminmodal_btn' onClick={handleCloseModal}>취소</button>
            </form>
        </Modal>
    );
};

export default AdminStockUpdate;
