import React, { useEffect, useState } from 'react';
import AdminDashboardStock from './AdminDashboardStock';
import AdminDashboardBoard from './AdminDashboardBoard';
import '../../../../styles/adminStyles/admindashboard/AdminDashboardBottom.css';
import { Item, Posting } from "../../../../types";

interface Props {
    items: Item[];
    postings: Posting[];
}

const AdminDashboardBottom: React.FC<Props> = ({ items, postings }) => {

    return (
        <section className='admindashboard_bottom'>
            <AdminDashboardStock items={items} />
            <AdminDashboardBoard postings={postings} />
        </section>
    );
};

export default AdminDashboardBottom;
