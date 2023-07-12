import React, {useEffect, useState} from 'react';
import {Posting} from "../../types";
import axios from "axios";
import "../../styles/communityStyles/boardDetail.css";
import BoardLayOut from "./BoardLayOut";

const GatherCamperBoard = () => {
    const [postings, setPostings] = useState<Posting[]>([]);

    useEffect(() => {
        axios.get('/findboardlist?category=gathercamper')
            .then(response => setPostings(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <BoardLayOut postings={postings} category="gathercamper"/>
    );
};

export default GatherCamperBoard;