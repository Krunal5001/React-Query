import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

const ParallelQueriesPage = () => {

    const getSuperHeroData = () => {
        return axios.get('http://localhost:4000/superheroes');
    }

    const getFriendsData = () => {
        return axios.get('http://localhost:4000/friends');
    }

    const { data: superheroesData } = useQuery('super-heros', getSuperHeroData);
    const { data: friendsData } = useQuery('friends', getFriendsData);

    console.log(superheroesData, friendsData);

    return (
        <div> ParallelQueriesPage</div>
    )
}

export default ParallelQueriesPage;