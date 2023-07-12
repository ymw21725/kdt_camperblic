import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import '../../styles/communityStyles/boardWrite.css';
import axios from 'axios';

const BoardWrite: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const editMode = searchParams.get('edit') === 'true';
    const postId = searchParams.get('id');
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const sessionUserId:any = sessionStorage.getItem("userId");

    useEffect(() => {
        if (editMode && postId) {
            axios
                .get(`/boarddetail/${category}/${postId}`)
                .then((response) => {
                    const postingDetail = response.data;
                    setTitle(postingDetail.title);
                    setName(postingDetail.name);
                    setContent(postingDetail.content);
                })
                .catch((error) => {
                    console.log('게시글을 가져오는 데 실패했습니다:', error);
                });
        }
    }, [category, editMode, postId]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editMode) {
            setName(e.target.value);
        }
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const postData = {
        title: title,
        name: sessionUserId,
        content: content,
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (editMode && postId) {
            // 수정 모드인 경우 게시글 업데이트 로직 수행
            axios
                .put(`/edit/${category}?id=${postId}`, postData)
                .then((response) => {
                    alert('게시글이 성공적으로 업데이트되었습니다.');
                    navigate(`/boarddetail/${category}/${postId}`);
                })
                .catch((error) => {
                    alert('게시글 업데이트에 실패했습니다:' + error);
                });
        } else {
            // 새로운 게시글 등록 로직 수행
            axios
                .post(`/write/${category}`, postData)
                .then((response) => {
                    alert('게시글이 성공적으로 등록되었습니다.');
                    // const newPostId = response.data.postId;
                    navigate(`/boarddetail/${category}/${response.data}`);
                    // navigate(`/${category}`);
                })
                .catch((error) => {
                    alert('게시글 등록에 실패했습니다:' + error);
                });
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };
    return (
        <section className="writeOutterWrap">
            <div className="writeDecoTop"></div>
            <div className="writeWrap">
                <div className="writeFormWrap">
                    <form className="writeForm" onSubmit={handleFormSubmit}>
                        <div className="formGroup">
                            <label htmlFor="title">제목</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={handleTitleChange}
                                placeholder="제목을 입력하세요."
                                required
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="name">작성자</label>
                            <input
                                type="text"
                                id="name"
                                value={sessionUserId}
                                placeholder="작성자를 입력하세요."
                                disabled={editMode} // Disable the input field in edit mode
                                readOnly
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="content">내용</label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={handleContentChange}
                                placeholder="내용을 입력하세요."
                                required
                            ></textarea>
                        </div>
                        <div className="buttonGroup">
                            <button type="submit">{editMode ? '수정' : '등록'}</button>
                            <button type="button" onClick={handleCancel}>
                                취소
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="writeDecoTop"></div>
        </section>
    );
};

export default BoardWrite;