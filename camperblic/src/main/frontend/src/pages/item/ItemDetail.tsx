import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { Item } from '../../types';
import "../../styles/itemStyles/itemDetail.css";

const ItemDetail = () => {
    const { itemId, categoryId } = useParams<{ itemId: string, categoryId: string }>();
    const [item, setItem] = useState<Item>();
    const [count, setCount] = useState(1);
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const addToCart = () => {
        axios
            .put(`/cart/${count}`, null, { withCredentials: true, params: item })
            .then(() => {
                setIsAddedToCart(true);
                alert("상품이 장바구니에 담겼습니다.");
            })
            .catch((error) => {
                alert("상품을 장바구니에 추가하는 데 실패했습니다.");
                console.error('상품을 장바구니에 추가하는 데 실패했습니다.', error);
            });
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCount(parseInt(event.target.value));
    };

    useEffect(() => {
        axios
            .get(`/itemdetail/${categoryId}/${itemId}`)
            .then((response) => {
                setItem(response.data)
                console.log(item);
            })
            .catch((error) => {
                console.error('게시물을 가져오는 데 실패했습니다.', error);
            });
    }, [itemId]);

    if (!item) {
        return <p>로딩 중...</p>;
    }

    return (
        <>
            <Link to="/"><h1 className="detailTop">CAMPERBLIC.</h1></Link>
            <div className="item-detail-container">
                <div className="item-detail-image">
                    {item && <img src={item?.imagePath} alt={item.name} />}
                </div>
                <div className="item-detail-content">
                    <h1 className="item-detail-title">{item?.categoryId}의 {item?.name} 상세페이지입니다</h1>
                    <h2 className="item-detail-subtitle">{item?.name}</h2>
                    <p className="item-detail-text">가격: {item?.price}</p>
                    <p className="item-detail-text">설명: {item?.description}</p>
                    <p className="item-detail-text">카테고리 ID: {item?.categoryId}</p>
                    <p className="item-detail-text">재고: {item?.currentStock}</p>

                    <div className="quantity-container">
                        <label htmlFor="quantity">수량:</label>
                        <div className="quantity-input">
                            <input
                                type="number"
                                id="quantity"
                                value={count}
                                onChange={handleQuantityChange}
                                min={1}
                                max={item.currentStock}
                            />
                        </div>
                    </div>

                    <button onClick={addToCart} className="item-detail-link">장바구니 담기</button>

                    {isAddedToCart && (
                        <div className="item-detail-cart-message">
                            <p className="ptagCart">상품이 장바구니에 담겼습니다.</p>
                            <Link to="/cart" className="item-detail-go-to-cart-button">
                                장바구니로 이동하기
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <div className="item-detail-description">
                {/*<p>상세 설명 내용</p>*/}
                <img src={item.detailPath} alt={item.name} />
            </div>
        </>
    );
};

export default ItemDetail;
