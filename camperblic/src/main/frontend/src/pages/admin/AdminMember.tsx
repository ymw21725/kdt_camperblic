import React, {useEffect, useState} from 'react';
import '../../styles/adminStyles/AdminMember.css';
import AdminMemberLayout from "./AdminMemberLayout";
import axios from "axios";
import {Member} from "../../types";

const AdminMember = () => {

    const [member, setMember] = useState<Member[]>([]);

    useEffect(() => {
        axios.get('/adminmember')
            .then(response => setMember(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <section className='adminmember'>
            <h1 className='adminmembertitle'>멤버관리</h1>
            <AdminMemberLayout member={member} />
        </section>
    );
};

export default AdminMember;