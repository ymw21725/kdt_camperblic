import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Posting } from '../../types';
import '../../styles/communityStyles/boardLayout.css';
import axios from 'axios';

interface BoardLayOutProps {
    postings: Posting[];
    category: string;
}

const BoardLayOut: React.FC<BoardLayOutProps> = ({ postings, category }) => {
    const navigate = useNavigate();
    const [visiblePostCount, setVisiblePostCount] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [addIndex, setAddIndex] = useState(0);
    const [isLeftButtonActive, setIsLeftButtonActive] = useState(false);
    const [isRightButtonActive, setIsRightButtonActive] = useState(false);
    const sessionUserId = sessionStorage.getItem("userId");

    const handleTitleClick = async (id: number, category: string) => {
        try {
            await increaseViewCount(id, category);
            navigate(`/boarddetail/${category}/${id}`);
        } catch (error) {
            console.error('조회수 증가 중 오류 발생:', error);
        }
    };

    const increaseViewCount = async (id: number, category: string) => {
        await axios.put(`/increase-view`, null, {
            params: {
                category: encodeURIComponent(category),
                id: id,
            },
        });
    };

    const handleWriteClick = (category: string) => {
        navigate(`/writepost/${category}`);
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if (postings.length > 150) {
            if (currentPage > Math.floor(postings.length / visiblePostCount / 10) * 10) {
                setIsLeftButtonActive(true);
                setIsRightButtonActive(false);
            } else {
                setIsLeftButtonActive(false);
                setIsRightButtonActive(true);
            }
        } else {
            setIsLeftButtonActive(false);
            setIsRightButtonActive(false);
        }
    }, [currentPage, postings.length, visiblePostCount]);

    const start = (currentPage - 1) * visiblePostCount;
    const end = start + visiblePostCount;
    const visiblePostings = postings.slice(start, end);

    const maxLiCount = 10;
    const pageButtons = [];

    const leftBtnClick = () => {
        setAddIndex(Math.floor(currentPage / maxLiCount) * 10 - maxLiCount);
        setCurrentPage(Math.floor(currentPage / maxLiCount) + 9);
    };

    const rightBtnClick = () => {
        setAddIndex(Math.ceil(currentPage / maxLiCount) * maxLiCount);
        setCurrentPage(Math.floor(currentPage / maxLiCount) + 11);
    };

    for (let index = 0; index < maxLiCount; index++) {
        const pageNumber = index + 1 + addIndex;
        const pageButton = (
            <li key={pageNumber}>
                <button
                    className={currentPage === pageNumber ? 'active' : ''}
                    onClick={() => handlePageClick(pageNumber)}
                >
                    {pageNumber}
                </button>
            </li>
        );
        pageButtons.push(pageButton);
        if (pageNumber * visiblePostCount >= postings.length) break;
    }

    return (
        <section className="boardLayOut">
            <div className="topSide"></div>
            <div className="innerWrap">
                <div className="tableContainer">
                    <table>
                        <colgroup>
                            <col style={{ width: '10%' }} />
                            <col style={{ width: '15%' }} />
                            <col style={{ width: '45%' }} />
                            <col style={{ width: '20%' }} />
                            <col style={{ width: '10%' }} />
                        </colgroup>
                        <thead>
                        <tr>
                            <th>글 번호</th>
                            <th>작성자</th>
                            <th>제목</th>
                            <th>작성일</th>
                            <th>조회수</th>
                        </tr>
                        </thead>
                        <tbody>
                        {visiblePostings.map((posting) => (
                            <tr key={posting.id}>
                                <td>{posting.id}</td>
                                <td>{posting.name}</td>
                                <td
                                    className="linkTd"
                                    onClick={() => handleTitleClick(posting.id, category)}
                                >
                                    {posting.title}
                                </td>
                                <td>{posting.createdate}</td>
                                <td>{posting.views}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <nav className="pageNationWrap">
                    <button
                        disabled={!isLeftButtonActive}
                        onClick={leftBtnClick}
                        className={isLeftButtonActive ? 'active' : ''}
                    >
                        이전
                    </button>
                    <ul className="pageBtnUl">{pageButtons}</ul>
                    <button
                        disabled={!isRightButtonActive}
                        onClick={rightBtnClick}
                        className={isRightButtonActive ? 'active' : ''}
                    >
                        다음
                    </button>
                    { sessionUserId != null && <button
                        className="writeBtn"
                        onClick={() => handleWriteClick(category)}
                    >
                        글쓰기
                    </button>}
                </nav>
            </div>
            {/*<div className="bottomSide">*/}
            {/*    <h3>지금 핫한 캠핑 아이템!</h3>*/}
            {/*    <ul className="bottomItemContainer">*/}
            {/*        <li className="bottomItem"*/}
            {/*            onClick={() => navigate(`/${category}`)}*/}
            {/*            style={{*/}
            {/*                background: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy0DbM7B5nS_0tgx9K6YHxLI9loVAYh6y8kqZnAEyO&s") no-repeat center/cover',*/}
            {/*            }}*/}
            {/*        ></li>*/}
            {/*        <li className="bottomItem"*/}
            {/*            onClick={() => navigate(`/${category}`)}*/}
            {/*            style={{*/}
            {/*                background: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy0DbM7B5nS_0tgx9K6YHxLI9loVAYh6y8kqZnAEyO&s") no-repeat center/cover',*/}
            {/*            }}*/}
            {/*        ></li>*/}
            {/*        <li className="bottomItem"*/}
            {/*            onClick={() => navigate(`/${category}`)}*/}
            {/*            style={{*/}
            {/*                background: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy0DbM7B5nS_0tgx9K6YHxLI9loVAYh6y8kqZnAEyO&s") no-repeat center/cover',*/}
            {/*            }}*/}
            {/*        ></li>*/}
            {/*        <li className="bottomItem"*/}
            {/*            onClick={() => navigate(`/${category}`)}*/}
            {/*            style={{*/}
            {/*                background: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy0DbM7B5nS_0tgx9K6YHxLI9loVAYh6y8kqZnAEyO&s") no-repeat center/cover',*/}
            {/*            }}*/}
            {/*        ></li>*/}
            {/*    </ul>*/}
            {/*</div>*/}
        </section>
    );
};

export default BoardLayOut;