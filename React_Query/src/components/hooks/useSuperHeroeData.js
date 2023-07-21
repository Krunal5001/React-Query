import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

const getSuperHerosData = ({ queryKey }) => {
    const heroId = queryKey[1];
    return axios.get(`http://localhost:4000/superheroes/${heroId}`);
}

export const useSuperHeroData = (heroId) => {
    const queryClient = useQueryClient();
    return useQuery(['super-hero', heroId], getSuperHerosData, {
        initialData: () => {
            const hero = queryClient.getQueryData('super-heros')?.data.find((hero => hero.id === parseInt(heroId)));
            if (hero) {
                return { data: hero }
            } else {
                return undefined
            }
        }
    });
}