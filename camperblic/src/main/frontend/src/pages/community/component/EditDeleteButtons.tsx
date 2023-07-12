import React from "react";
import ReplyInputContainer from "./ReplyInputContainer";

const EditDeleteButtons: React.FC<{ handleEdit: () => void; handleDelete: () => void }> = ({
                                                                                               handleEdit,
                                                                                               handleDelete,
                                                                                           }) => {
    return (
        <div className="button-group">
            <span className="button" onClick={handleEdit}>수정</span>
            <span className="button" onClick={handleDelete}>삭제</span>
        </div>
    );
};

export default EditDeleteButtons;