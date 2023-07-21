import React from 'react'
import { useParams } from 'react-router-dom';
import { useSuperHeroData } from './hooks/useSuperHeroeData';

const RqSuperheroPage = () => {

    const { heroId } = useParams();

    const { isLoading, data, isError, error } = useSuperHeroData(heroId);

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>{error.message}</p>
    }

    console.log(data)
    return (
        <div>{data?.data?.name}-{data?.data?.alterEgo}</div>
    )
}

export default RqSuperheroPage