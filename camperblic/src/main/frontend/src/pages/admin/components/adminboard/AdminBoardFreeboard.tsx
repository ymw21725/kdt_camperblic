import React, {useEffect, useState} from 'react';
import {Posting} from "../../../../types";
import axios from "axios";
import AdminBoardLayout from "./AdminBoardLayout";

const AdminBoardFreeboard = () => {
    const [postings, setItems] = useState<Posting[]>([]);

    useEffect(() => {
        axios.get('/adminboard/adminboardfreeboard')
            .then(response => setItems(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <AdminBoardLayout postings={postings} category="freeboard" />
    );
};

export default AdminBoardFreeboard;