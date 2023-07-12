import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Member } from '../../types';
import { useNavigate } from 'react-router-dom';
import '../../styles/adminStyles/AdminMemberDetail.css';

Modal.setAppElement('#root');

interface MemberdetailProps {
    member: Member;
    isOpen: boolean;
    closeModal: () => void;
    updateStock: (product: Member) => void;
}

const AdminMemberDetail: React.FC<MemberdetailProps> = ({
                                                            isOpen,
                                                            closeModal,
                                                            member,
                                                        }) => {
    const history = useNavigate();

    const handleCloseModal = () => {
        closeModal(); // 모달 닫기
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleCloseModal} // 모달 닫기 함수 사용
            contentLabel="Member Detail Modal"
            className="admindetailmodal_update"
        >
            <h2 className="admindetailmodal_title">회원 상세 정보</h2>
            <div>
                <p className="admindetailmodal_p">ID: {member.userid}</p>
                <p className="admindetailmodal_p">이름: {member.name}</p>
                <p className="admindetailmodal_p">전화번호: {member.phone}</p>
                <p className="admindetailmodal_p">이메일: {member.email}</p>
                <p className="admindetailmodal_p">주소1: {member.address1}</p>
                <p className="admindetailmodal_p">주소2: {member.address2}</p>
                <p className="admindetailmodal_p">주소3: {member.address3}</p>
                <p className="admindetailmodal_p">주소4: {member.address4}</p>
                <p className="admindetailmodal_p">가입일: {member.createdDate}</p> {/* createDate으로 수정 */}
            </div>
            <button className="admindetailmodal_btn" onClick={handleCloseModal}>
                닫기
            </button>
        </Modal>
    );
};

export default AdminMemberDetail;
