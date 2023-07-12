import React, {useEffect, useState} from 'react';
import {Posting} from "../../types";
import axios from "axios";
import BoardLayOut from "./BoardLayOut";

const FreeBoard = () => {
    const [postings, setPostings] = useState<Posting[]>([]);

    useEffect(() => {
        axios.get('/findboardlist?category=freeboard')
            .then(response => setPostings(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <BoardLayOut postings={postings} category="freeboard"/>
    );
};

export default FreeBoard;