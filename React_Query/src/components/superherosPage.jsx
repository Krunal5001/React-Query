import axios from 'axios';
import { useEffect, useState } from 'react';

const SuperherosPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    const getSuperheroesData = () => {
        axios.get('http://localhost:4000/superheroes').then(res => {
            setData(res?.data);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getSuperheroesData();
        // eslint-disable-next-line
    }, [])

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <h2>Super Heroes Page</h2>
            {data?.map((req, index) => {
                return <div key={index}>{req?.name}</div>
            })}
        </>
    )
}

export default SuperherosPage;