import axios from 'axios';
import React, { Fragment } from 'react';
import { useInfiniteQuery } from 'react-query';

const getColorsData = ({ pageParam = 1 }) => {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
}

export const InfiniteQueryPage = () => {
    const { isLoading, data, isError, error, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery(['colors'], getColorsData, {
        getNextPageParam: (_lastPage, pages) => {
            if (pages.length < 5) {
                return pages.length + 1;
            } else {
                return undefined;
            }
        }
    });

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>{error.message}</p>
    }

    return (
        <>
            {
                data?.pages?.map((group, index) => {
                    return (
                        <Fragment key={index}>
                            {group.data.map((req) => {
                                return (
                                    <h3 key={req?.id}>{req?.id}.{req?.label}</h3>
                                )
                            })}
                        </Fragment>
                    )
                })
            }
            <button disabled={!hasNextPage} onClick={fetchNextPage}>Load More...</button>
            <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
        </>

    )
}