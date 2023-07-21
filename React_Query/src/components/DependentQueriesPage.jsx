import axios from 'axios';
import { useQuery } from 'react-query';

const getUserByEmail = (email) => {
    return axios.get(`http://localhost:4000/users/${email}`);
}

const getCourseByChannelId = (channelId) => {
    return axios.get(`http://localhost:4000/channels/${channelId}`);
}

export const DependentQueriesPage = ({ email }) => {

    const { data: user } = useQuery(['users', email], () => getUserByEmail(email));

    const channelId = user?.data?.channelId;

    useQuery(['channels', channelId], () => getCourseByChannelId(channelId), { enabled: !!channelId });

    return (
        <div>Dependent Queries Page</div>
    )
}