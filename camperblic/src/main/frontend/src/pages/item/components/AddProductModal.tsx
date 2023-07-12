import React, { useState } from 'react';
import Modal from 'react-modal';
import { Item } from '../../../types';
import '../../../styles/itemStyles/addProductModal.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

Modal.setAppElement('#root');

interface AddProductModalProps {
    isOpen: boolean;
    closeModal: () => void;
    addProduct: (product: Item) => void;
    categories: string[]; // List of available categories
}

interface Product {
    itemId :string,
    name: string,
    price: number,
    currentStock: number,
}

const AddProductModal: React.FC<AddProductModalProps> = ({
                                                             isOpen,
                                                             closeModal,
                                                             addProduct,
                                                             categories,
                                                         }) => {
    const [selectedMainFile, setSelectedMainFile] = useState<File | undefined>();
    const [selectedDetailFile, setSelectedDetailFile] = useState<File | undefined>();
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [description, setDescription] = useState('');

    const [product, setProduct] = useState<Product>({
        itemId :'',
        name: '',
        price: 0,
        currentStock: 0,
    });

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            [e.target.name]: e.target.value,
        }));
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    const handleMainFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedMainFile(file);
        }
    };

    const handleDetailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedDetailFile(file);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('imagePath', selectedMainFile || ''); // 이미지 파일 추가
        formData.append('detailPath', selectedDetailFile || ''); // 이미지 파일 추가
        formData.append('product', JSON.stringify(product));
        formData.append('categoryId', selectedCategory);
        formData.append('description', description);
        axios
            .post(`/productinit/${selectedCategory}`,formData)
            .then((res) => {
                // 성공적으로 상품 등록이 완료되었을 때 필요한 처리를 수행합니다.
                console.log(res.data)
                closeModal();
            })
            .catch((error) => {
                // 상품 등록 실패 시 필요한 처리를 수행합니다.
                console.log(error)
            });
    };


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Add Product Modal"
            className="add-product-modal-overlay"
        >
            <h2 className="add-product-modal__title">상품 등록 페이지입니다~~</h2>
            <form className={'modalForm'} onSubmit={handleSubmit}>
                <h5>아이템id</h5>
                <input
                    type="text"
                    placeholder="아이템아이디"
                    value={product.itemId}
                    name="itemId"
                    onChange={handleInputChange}
                    className="add-product-modal__input"
                />
                <h5>상품이름</h5>
                <input
                    type="text"
                    placeholder="상품 이름"
                    value={product.name}
                    name="name"
                    onChange={handleInputChange}
                    className="add-product-modal__input"
                />
                <h5>상품가격</h5>
                <input
                    type="number"
                    placeholder="상품 가격"
                    value={product.price}
                    name="price"
                    onChange={handleInputChange}
                    className="add-product-modal__input"
                />
                <h5>카테고리 선택</h5>
                <div className="add-product-modal__category-buttons">
                    {categories.map((category) => (
                        <button
                            key={category}
                            type={"button"}
                            className={`add-product-modal__category-button ${
                                selectedCategory === category ? 'selected' : ''
                            }`}
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <h5>상품 수량</h5>
                <input
                    type="number"
                    placeholder="상품 수량"
                    value={product.currentStock}
                    name="currentStock"
                    onChange={handleInputChange}
                    className="add-product-modal__input"
                />
                <h5>상품 설명</h5>
                <textarea
                    placeholder="상품 설명"
                    value={description}
                    onChange={handleDescriptionChange}
                    className="add-product-modal__textarea"
                ></textarea>
                <h5>메인 이미지 선택</h5>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainFileChange}
                    className="add-product-modal__file-input"
                />
                <h5>디테일 이미지 선택</h5>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleDetailFileChange}
                    className="add-product-modal__file-input"
                />
                <div className="add-product-modal__button-group">
                    <button type="submit" className="add-product-modal__submit-button">
                        등록
                    </button>
                    <button
                        type="button"
                        onClick={closeModal}
                        className="add-product-modal__cancel-button"
                    >
                        취소
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default AddProductModal;
