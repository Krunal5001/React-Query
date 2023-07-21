import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAddSuperHeroData, useSuperHeroesData } from './hooks/useSuperHeroesData';

const RQSuperherosPage = () => {

    const [name, setName] = useState('');
    const [alterEgo, setAlterEgo] = useState('');

    const onSuccess = (data) => {
        console.log("Data Submit SuccessFully!", data);
    }

    const onError = (error) => {
        console.log("Data Submit UnSuccessFully!", error);
    }

    const { isLoading, data, isError, error, refetch } = useSuperHeroesData(onSuccess, onError);

    const { mutate: addHero } = useAddSuperHeroData();

    const handelAddHeroClick = () => {
        addHero({ name, alterEgo });
        toast.success('API call successful!', { autoClose: 3000 });
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>{error.message}</p>
    }

    return (
        <>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
            <input type='text' value={alterEgo} onChange={(e) => setAlterEgo(e.target.value)} />
            <button onClick={handelAddHeroClick}>Add Super-Hero</button>
            <button onClick={refetch}>Fetch Super-Hero</button>
            <h2>RQ Superheros Page</h2>
            {data?.data?.map((req) => {
                return (
                    <div key={req.id}>
                        <Link to={`/rq-super-heroes/${req?.id}`}>{req?.name}</Link>
                    </div>
                )
            })}
        </>
    )
}

export default RQSuperherosPage