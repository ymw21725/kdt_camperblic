import React, {useEffect, useState} from 'react';
import {Posting} from "../../../../types";
import axios from "axios";
import AdminBoardLayout from "./AdminBoardLayout";

const AdminBoardCampStory = () => {
    const [postings, setItems] = useState<Posting[]>([]);

    useEffect(() => {
        axios.get('/adminboard/adminboardcampstory')
            .then(response => setItems(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <AdminBoardLayout postings={postings} category="campstory" />
    );
};

export default AdminBoardCampStory;