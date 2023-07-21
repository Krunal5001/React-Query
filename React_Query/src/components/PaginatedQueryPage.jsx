import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

const getColorsData = (pageNumber) => {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
}

export const PaginatedQueryPage = () => {

    const [pageNumber, setPageNumber] = useState(1);

    const { isLoading, data, isError, error, isFetching } = useQuery(['colors', pageNumber], () => getColorsData(pageNumber), { keepPreviousData: true });

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>{error.message}</p>
    }

    return (
        <>
            {
                data?.data?.map((req) => {
                    return (
                        <div key={req?.id}>{req?.id}.{req?.label}</div>
                    )
                })
            }
            <div>
                <button onClick={() => setPageNumber(page => page - 1)} disabled={pageNumber === 1}>Prev</button>
                <button onClick={() => setPageNumber(page => page + 1)} disabled={pageNumber === 5}>Next</button>
            </div>
            {isFetching && 'Loading'}
        </>

    )
}
