import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Item } from "../../types";
import axios from "axios";
import ItemLayOut from "./ItemLayOut";

const ItemAll = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가

    const fetchItems = async (page: number) => {
        setIsLoading(true);

        try {
            const [cookResponse, etcResponse, matResponse, chairResponse, tentResponse] = await Promise.all([
                axios.get(`/cook?page=${page}`),
                axios.get(`/etc?page=${page}`),
                axios.get(`/mat?page=${page}`),
                axios.get(`/chair?page=${page}`),
                axios.get(`/tent?page=${page}`)
            ]);

            const nextPageItems = [
                ...cookResponse.data,
                ...etcResponse.data,
                ...matResponse.data,
                ...chairResponse.data,
                ...tentResponse.data
            ];

            setItems(prevItems => [...prevItems, ...nextPageItems]);
        } catch (error) {
            console.error('상품 가져오기 실패:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadMoreItems = () => {
        const nextPage = currentPage + 1; // 다음 페이지 계산
        fetchItems(nextPage);
        setCurrentPage(nextPage); // 현재 페이지 업데이트
    };

    useEffect(() => {
        fetchItems(1);
    }, []);

    return (
        <ItemLayOut items={items} topText="전체상품" onLoadMore={loadMoreItems} fetchItems={fetchItems}/>
    );
};


export default ItemAll;
