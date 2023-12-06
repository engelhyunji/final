// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react'
import My from '../components/My/My';
import { useParams } from 'react-router-dom';

const MyPage = () => {
    const param = useParams();
    const id = Number(param.id);
    console.log('param',param);
    console.log('param.id',param.id);
    return <My id={id}/>;
}

export default MyPage;
