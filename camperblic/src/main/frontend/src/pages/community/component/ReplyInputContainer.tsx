import React from 'react';

interface ReplyInputContainerProps {
    commentInput: string;
    handleCommentInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleCommentSubmit: () => void;
    isVisible: boolean;
    setReplyInputVisible: (visible: boolean) => void;
}

const ReplyInputContainer: React.FC<ReplyInputContainerProps> = ({
                                                                     commentInput,
                                                                     handleCommentInputChange,
                                                                     handleCommentSubmit,
                                                                     isVisible,
                                                                     setReplyInputVisible,
                                                                 }) => {
    if (!isVisible) {
        return null; // 컴포넌트가 보이지 않을 경우 null 반환
    }

    const handleCancel = () => {
        setReplyInputVisible(false); // ReplyInputContainer를 숨김
    };

    return (
        <div className="replyInputContainer">
            <textarea placeholder="댓글 추가" value={commentInput} onChange={handleCommentInputChange}></textarea>
            <div className="replyInput">
                <span onClick={handleCancel}>취소</span>
                <span onClick={handleCommentSubmit} className={commentInput}>등록</span>
            </div>
        </div>
    );
};

export default ReplyInputContainer;