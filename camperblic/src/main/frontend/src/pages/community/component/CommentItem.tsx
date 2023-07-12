import React, {useState} from 'react';
import ReplyInputContainer from './ReplyInputContainer';
import { CommentOne } from '../../../types';
import axios from "axios";

const sessionUserId = sessionStorage.getItem("userId");
const idValidation = (id: string):boolean => {
    if(sessionUserId == "admin" || sessionUserId == id) return true;
    else return false;
}

function handleReplyEdit() {
    axios
        .put('/delete-replies', {
            params: {

            },
        })
        .then((response) => {
            alert(response.data);
        })
        .catch((error) => {
            alert('게시글 삭제에 실패했습니다:' + error);
        });
}

const handleReplyDelete = (category: any, id: number) => {
    axios
        .delete('/delete-replies', {
            params: {
                category,
                id
            },
        })
        .then((response) => {
            alert(response.data);
            window.location.reload();
        })
        .catch((error) => {
            alert('댓글 삭제에 실패했습니다:' + error);
        });
};

const CommentItem: React.FC<{
    category: any;
    comment: CommentOne;
    isReplyVisible: boolean;
    replyInputCommentId: number | null;
    commentInput: string;
    handleCommentInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleReCommentInput: (commentId: number) => void;
    handleReply: (commentId: number) => void;
    handleReplyCommentSubmit: (commentId: number, commentInput: string, commentTagName: string) => void;
    isReplyInputVisible: boolean;
    setReplyInputVisible: React.Dispatch<React.SetStateAction<boolean>>;
    replyList: CommentOne[];
    setReplyList: React.Dispatch<React.SetStateAction<{ [commentId: number]: CommentOne[] }>>; // 수정된 부분
}> = ({
          category,
          comment,
          isReplyVisible,
          replyInputCommentId,
          commentInput,
          handleCommentInputChange,
          handleReCommentInput,
          handleReply,
          handleReplyCommentSubmit,
          isReplyInputVisible,
          setReplyInputVisible,
          replyList,
          setReplyList,
      }) => {



    const renderReplies = (replies: CommentOne[]) => {
        return replies.map((reply) => (
            <ReplyItem
                category={category}
                key={reply.id}
                comment={reply}
                handleReCommentInput={handleReCommentInput}
                handleReplyEdit={handleReplyEdit}
                handleReplyDelete={() => handleReplyDelete(category, reply.id)}
            />
        ));
    };

    return (
        <li className="replyOne" key={comment.id}>
            <p>{comment.name}</p>
            <p>{comment.createdate}</p>
            <p>{comment.content}</p>
            <div className="replyButtons">
                <div>
                    {/*<span>{comment.like_count}</span>*/}
                    {/*<span>{comment.dislike_count}</span>*/}
                    {sessionUserId != null && <span className="replyButton" onClick={() => handleReCommentInput(comment.id)}>답글</span>}
                </div>
                <div>
                    {/*<span className="editButton" onClick={handleReplyEdit}>수정</span>*/}
                    {idValidation(comment.name) && <span className="deleteButton" onClick={() => handleReplyDelete(category, comment.id)}>삭제</span>}
                </div>
            </div>
            {comment.reply_count > 0 &&
                <span className="replyCountButton" onClick={() => handleReply(comment.id)}>
                    {isReplyVisible ? '답글 숨기기' : `답글 ${comment.reply_count}개`}
                </span>
            }

            {replyInputCommentId === comment.id && (
                <ReplyInputContainer
                    commentInput={commentInput}
                    handleCommentInputChange={handleCommentInputChange}
                    handleCommentSubmit={() => handleReplyCommentSubmit(comment.id, commentInput, comment.tagname)}
                    isVisible={isReplyInputVisible}
                    setReplyInputVisible={setReplyInputVisible}
                />
            )}
            {isReplyVisible && <ul className="replyList">{renderReplies(replyList)}</ul>}
        </li>
    );
};

const ReplyItem: React.FC<{
    category: any;
    comment: CommentOne;
    handleReCommentInput: (commentId: number) => void;
    handleReplyEdit: () => void;
    handleReplyDelete: (category: any, id: number) => void;
}> = ({ category, comment, handleReCommentInput, handleReplyEdit, handleReplyDelete }) => {

    return (
        <li className="replyOne rere" key={comment.id}>
            <p>{comment.name}</p>
            <p>{comment.createdate}</p>
            <p>{comment.content}</p>
            <div className="replyButtons">
                <div>
                    {/*<span>{comment.like_count}</span>*/}
                    {/*<span>{comment.dislike_count}</span>*/}
                    {/*{sessionUserId != null && <span className="replyButton" onClick={() => handleReCommentInput(comment.id)}>답글</span>}*/}
                </div>
                <div>
                    {/*<span className="editButton" onClick={handleReplyEdit}>수정</span>*/}
                    {idValidation(comment.name) && <span className="deleteButton" onClick={() => {
                        handleReplyDelete(category, comment.id);
                    }}>삭제</span>}
                </div>
            </div>
        </li>
    );
};

export default CommentItem;