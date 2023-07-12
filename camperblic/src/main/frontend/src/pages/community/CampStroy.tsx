import React, { useEffect, useState } from 'react';
import { Posting } from '../../types';
import axios from 'axios';
import BoardLayOut from './BoardLayOut';

const CampStory = () => {
    const [postings, setPostings] = useState<Posting[]>([]);

    useEffect(() => {
        axios
            .get('/findboardlist?category=campstory')
            .then((response) => setPostings(response.data))
            .catch((error) => console.log(error));
    }, []);

    return <BoardLayOut postings={postings} category="campstory" />;
};

export default CampStory;