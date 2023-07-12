import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Item } from "../../types";
import axios from "axios";
import "../../styles/itemStyles/itemLayOut.css";
import AddProductModal from "./components/AddProductModal";

interface ItemLayOutProps {
    items: Item[];
    topText: string;
    onLoadMore: () => void;
    fetchItems: (page: number) => void;
}

interface AddProductModalProps {
    isOpen: boolean;
    closeModal: () => void;
    addProduct: (product: Item) => void;
    categories: string[]; //
    products: Item[]; //
}



const ItemLayOut: React.FC<ItemLayOutProps> = ({ items, topText, onLoadMore ,fetchItems}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [visibleItems, setVisibleItems] = useState<Item[]>([]);
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isName, setIsName] = useState<boolean>(true);
    const sessionUserName = sessionStorage.getItem("username");
    const [username, setUserName] = useState("");

    useEffect(() => {
        if (sessionUserName != null && sessionUserName.length >= 0) {
            setUserName(sessionUserName);
            setIsName(false);
        } else {
            setIsName(true);
        }
        if (sessionUserName === "admin") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [sessionUserName]);

    useEffect(() => {
        const filteredItems = items.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const initialItemCount = 15;
        const initialItems = filteredItems.slice(0, initialItemCount);
        setVisibleItems(initialItems);
    }, [items, searchQuery]);

    useEffect(() => {
        const handleScroll = () => {
            if (visibleItems.length === 0) {
                return;
            }

            const lastItem = visibleItems[visibleItems.length - 1];
            const lastItemElement = document.getElementById(`item-${lastItem.itemId}`);
            const lastItemRect = lastItemElement?.getBoundingClientRect();

            const isLastItemVisible = lastItemRect?.bottom && lastItemRect.bottom <= window.innerHeight;

            if (isLastItemVisible && !isLoading && visibleItems.length < items.length) {
                setIsLoading(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isLoading, visibleItems.length]);

    useEffect(() => {
        if (isLoading && visibleItems.length < items.length) {
            const nextItemCount = visibleItems.length + 10;
            const nextItems = items.slice(visibleItems.length, nextItemCount);

            setVisibleItems(prevItems => [...prevItems, ...nextItems]);
            setPage(prevPage => prevPage + 1);
            setIsLoading(false);
        }
    }, [isLoading, items, visibleItems, page]);

    useEffect(() => {
        if (isLoading) {
            setIsLoading(false);
        }
    }, [visibleItems]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        fetchItems(0);
    };

    const addProduct = async (product: Item) => {
        try {
            const response = await axios.post('/item', {
                item: product,
                itemType: product.categoryId
            });

            if (response.status === 200) {
                const addedProduct = response.data;
                console.log('상품이 데이터베이스에 추가되었습니다:', addedProduct);
                closeModal();
            } else {
                console.error('상품 추가 실패:', response.statusText);
            }
        } catch (error) {
            console.error('상품 추가 실패:', error);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    console.log(visibleItems);
    return (
        <section className="itemLayOut">
            <div className="topFont">
                <h1 className="topName"><Link className="topNameLink" to="/">CAMPERBLIC.</Link></h1>
                <h1 className="topText">
                    {topText}
                </h1>
                {isAdmin && <button className={"addProductButton"} onClick={openModal}>상품 등록</button> }
                <AddProductModal
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                    addProduct={addProduct}
                    categories={['cook','chair','mat','tent','etc']} // 카테고리 값을 여기에 제공해야 합니다.
                />
                <input className={"searchBox"} type="text" value={searchQuery} onChange={handleSearchChange} placeholder="상품명을 검색해주세요" />
            </div>
            <div className="item-list">
                {visibleItems.map((item, index) => (
                    <Link
                        to={`/itemdetail/${item.categoryId}/${item.itemId}`}
                        key={index}
                    >
                        <div id={`item-${item.itemId}`} className="item-card">
                            <div className="item-image">
                                {item.imagePath ? (
                                    <img src={item.imagePath} alt={item.name} />
                                ) : (
                                    <div className="no-image-container">
                                        <span className="no-image-text">이미지 없음</span>
                                    </div>
                                )}
                            </div>
                            <div className="item-details">
                                <h2 className="item-name">{item.name}</h2>
                                <p className="item-price">가격: {item.price}원</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <button className="scrollToTopButton" onClick={scrollToTop}>
                위로
            </button>

            {isLoading && <p>Loading...</p>}
        </section>
    );
};

export default ItemLayOut;
