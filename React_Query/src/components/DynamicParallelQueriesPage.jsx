import axios from 'axios';
import { useQueries } from 'react-query';

const getSuperHerosData = (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`);
}

export const DynamicParallelQueriesPage = ({ heroIds }) => {
    const queyResult = useQueries(
        heroIds.map(id => {
            return {
                queryKey: ['super-heros', id],
                queryFn: () => getSuperHerosData(id),
            }
        })
    )

    console.log(queyResult);

    return (
        <div>Dynamic Parallel Queries Page</div>
    )
}
