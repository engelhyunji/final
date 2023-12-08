// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react'
import My from '../components/My/My';
import { useParams } from 'react-router-dom';

const MyPage = () => {
    const param = useParams();
    const userId = Number(param.userId);
    console.log('param',param);
    console.log('param.userId',param.userId);
    return <My userId={userId}/>;
}

export default MyPage;
