// import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { request } from '../utils/axios-utils';

const getSuperHeroData = () => {
    // return axios.get('http://localhost:4000/superheroes');
    return request({ url: '/superheroes' });
}

const postSuperHeroData = (hero) => {
    // return axios.post('http://localhost:4000/superheroes', hero);
    return request({ url: '/superheroes', method: 'post', data: hero });
}

export const useSuperHeroesData = (onSuccess, onError) => {
    return useQuery('super-heros', getSuperHeroData, { onSuccess, onError });
}

export const useAddSuperHeroData = () => {
    const queryClient = useQueryClient();
    return useMutation(postSuperHeroData, {
        // onSuccess: () => {
        //     queryClient.invalidateQueries('super-heros');
        // }
        // onSuccess: (data) => {
        //     queryClient.setQueryData('super-heros', (oldQueryData) => {
        //         return {
        //             ...oldQueryData,
        //             data: [...oldQueryData.data, data.data]
        //         }
        //     });
        // }
        onMutate: async (newHero) => {
            await queryClient.cancelQueries('super-heros')
            const prevHeroData = queryClient.getQueryData('super-heros')
            queryClient.setQueryData('super-heros', (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [...oldQueryData.data, { id: oldQueryData?.data?.length + 1, ...newHero }]
                }
            })
            return prevHeroData
        },
        onError: (_err, _newTodo, context) => {
            queryClient.setQueryData('super-heroes', context.previousHeroData)
        },
        onSettled: () => {
            queryClient.invalidateQueries('super-heroes')
        }
    });
}