import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CommentOne, Posting } from '../../types';
import '../../styles/communityStyles/boardDetail.css';
import ReplyInputContainer from './component/ReplyInputContainer';
import EditDeleteButtons from './component/EditDeleteButtons';
import CommentItem from './component/CommentItem';

const BoardDetail: React.FC = () => {
    const { id, category } = useParams<{ id: string; category: string }>();
    const [posting, setPosting] = useState<Posting>();
    const [commentInput, setCommentInput] = useState('');
    const [commentMainInput, setCommentMainInput] = useState('');
    const [commentList, setCommentList] = useState<CommentOne[]>([]);
    const [isReplyVisible, setReplyVisible] = useState<{ [commentId: number]: boolean }>({});
    const [replyList, setReplyList] = useState<{ [commentId: number]: CommentOne[] }>({});
    const [replyInputCommentId, setReplyInputCommentId] = useState<number | null>(null);
    const [isReplyInputVisible, setReplyInputVisible] = useState(false);
    const navigate = useNavigate();
    const sessionUserId = sessionStorage.getItem("userId");
    const idValidation = (id: string):boolean => {
        if(sessionUserId == "admin" || sessionUserId == id) return true;
        else return false;
    }


    const handleParentStateChange = (commentId: number) => {
        axios
            .get(`/re-reply?category=${category}&root=${id}&mention=${commentId}`)
            .then((response) => {
                setReplyList((prevState) => ({
                    ...prevState,
                    [commentId]: response.data,
                }));
                setReplyVisible((prevState) => ({
                    ...prevState,
                    [commentId]: true,
                }));
            })
            .catch((error) => {
                console.error('대댓글을 가져오는 데 실패했습니다.', error);
            });
    };

    // 댓글 가져오기
    const fetchComments = () => {
        axios
            .get(`/get-comments?category=${category}&id=${id}`)
            .then((response) => setCommentList(response.data))
            .catch((error) => {
                console.error('댓글을 가져오는 데 실패했습니다.', error);
            });
    };

    // 게시글 및 댓글 정보 가져오기
    useEffect(() => {
        axios
            .get(`/boarddetail/${category}/${id}`)
            .then((response) => setPosting(response.data))
            .catch((error) => {
                console.error('게시물을 가져오는 데 실패했습니다.', error);
            });

        fetchComments();
    }, [id, category]);

    // 게시글 수정 페이지로 이동
    const handleEdit = () => {
        navigate(`/writepost/${category}?edit=true&id=${id}`);
    };

    // 게시글 삭제
    const handleDelete = () => {
        axios
            .delete('/delete-posting', {
                params: {
                    category: category,
                    id: id,
                },
            })
            .then((response) => {
                alert(response.data);
                navigate(`/${category}`);
            })
            .catch((error) => {
                alert('게시글 삭제에 실패했습니다:' + error);
            });
    };

    // 이전 페이지로 이동
    const handleGoBack = () => {
        navigate(-1);
    };

    // 목록 페이지로 이동
    const handleGoList = () => {
        navigate(`/${category}`);
    };

    // 댓글 입력 내용 변경
    const handleCommentInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentInput(event.target.value);
    };

    const handleCommentMainInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentMainInput(event.target.value);
    };

    // 댓글 등록
    const handleCommentSubmit = () => {
        if (commentMainInput.trim() !== '') {
            axios
                .post(
                    `/add-comment?postid=${id}&category=${category}&content=${commentMainInput}&name=${sessionUserId}`
                )
                .then((response) => {
                    setCommentMainInput('');
                    // 댓글 등록 후 댓글 목록 업데이트
                    fetchComments();
                })
                .catch((error) => {
                    console.error('댓글 추가에 실패했습니다.', error);
                });
        } else {
            alert('댓글 내용을 입력해주세요!');
        }
    };

    const handleReCommentInput = (commentId: number) => {
        setReplyInputCommentId(commentId);
        setReplyInputVisible(true); // ReplyInputContainer를 보이도록 설정
    };

    const handleReply = (commentId: number) => {
        if (isReplyVisible[commentId]) {
            setReplyVisible((prevState) => ({
                ...prevState,
                [commentId]: false,
            }));
        } else {
            axios
                .get(`/re-reply?category=${category}&root=${id}&mention=${commentId}`)
                .then((response) => {
                    setReplyList((prevState) => ({
                        ...prevState,
                        [commentId]: response.data,
                    }));
                    setReplyVisible((prevState) => ({
                        ...prevState,
                        [commentId]: true,
                    }));
                })
                .catch((error) => {
                    console.error('대댓글을 가져오는 데 실패했습니다.', error);
                });
        }
    };


    // 대댓글 등록
    const handleReplyCommentSubmit = (commentId: number, commentInput: string, commentTagName: string) => {
        const additionalData = {
            name: sessionUserId,
            root: id,
            mention: commentId,
            tagname: commentTagName,
            content: commentInput,
        };
        if (commentInput.trim() !== '') {
            axios
                .post(`/add-recomment/${category}`, additionalData)
                .then((response) => {
                    setCommentInput(''); // commentInput을 비웁니다.
                    // 댓글 등록 후 댓글 목록 업데이트
                    fetchComments();
                    axios
                        .get(`/re-reply?category=${category}&root=${id}&mention=${commentId}`)
                        .then((response) => {
                            setReplyList((prevState) => ({
                                ...prevState,
                                [commentId]: response.data,
                            }));
                        })
                        .catch((error) => {
                            console.error('대댓글을 가져오는 데 실패했습니다.', error);
                        });
                })
                .catch((error) => {
                    console.error('댓글 추가에 실패했습니다.', error);
                });
        } else {
            alert('댓글 내용을 입력해주세요!');
        }
    };

    return (
        <section className="board-detail-container">
            <div className="detailDecoTop"></div>

            <article className="board-detail">
                <div className="container">
                    <div className="post">
                        <div className="post-info">
                            <div className="post-header">
                                <h3>{posting?.title}</h3>
                                <p>글 번호: {posting?.id}</p>
                            </div>
                            <div className="post-details">
                                <p>
                                    작성자: {posting?.name} | 작성일: {posting?.createdate} | 조회수: {posting?.views}
                                </p>
                            </div>
                        </div>
                        <div className="post-content">
                            <p>{posting?.content}</p>
                        </div>
                    </div>
                </div>
                {idValidation(posting?.name == null ? "" : posting.name) && <EditDeleteButtons handleEdit={handleEdit} handleDelete={handleDelete} />}
                <div className="button-group">
                    <span className="button" onClick={handleGoBack}>뒤로가기</span>
                    <span className="button" onClick={handleGoList}>목록으로</span>
                </div>
            </article>
            <article className="replyContainer">
                {sessionUserId != null && <ReplyInputContainer
                    commentInput={commentMainInput}
                    handleCommentInputChange={handleCommentMainInputChange}
                    handleCommentSubmit={handleCommentSubmit}
                    isVisible={true}
                    setReplyInputVisible={setReplyInputVisible}
                />}
                <ul className="replyList">
                    {commentList.map((comment) => (
                        <CommentItem
                            category={category}
                            comment={comment}
                            isReplyVisible={isReplyVisible[comment.id]}
                            replyInputCommentId={replyInputCommentId}
                            commentInput={commentInput}
                            handleCommentInputChange={handleCommentInputChange}
                            handleReCommentInput={handleReCommentInput}
                            handleReply={handleReply}
                            handleReplyCommentSubmit={handleReplyCommentSubmit}
                            isReplyInputVisible={isReplyInputVisible}
                            setReplyInputVisible={setReplyInputVisible}
                            replyList={replyList[comment.id]}
                            setReplyList={setReplyList}
                        />
                    ))}
                </ul>
            </article>

            <div className="detailDecoBottom"></div>
        </section>
    );
};

export default BoardDetail;