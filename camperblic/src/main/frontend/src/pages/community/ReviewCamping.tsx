import React, {useEffect, useState} from 'react';
import {Posting} from "../../types";
import axios from "axios";
import BoardLayOut from "./BoardLayOut";

const ReviewCamping = () => {
    const [postings, setPostings] = useState<Posting[]>([]);

    useEffect(() => {
        axios.get('/findboardlist?category=reviewcamping')
            .then(response => setPostings(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <BoardLayOut postings={postings} category="reviewcamping"/>
    );
};

export default ReviewCamping;