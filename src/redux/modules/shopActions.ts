// shopActions.js
import { Dispatch } from 'redux';
import { setShops } from './shopSlice'; // './shopSlice'에서 정의된 setShops 사용
import instance from '../../apis/instance';

export const fetchShops = () => async (dispatch: Dispatch): Promise<void> => {
    try {
        const response = await instance.get('/api/shops');
        dispatch(setShops(response.data));
    } catch (error) {
        console.error('Error fetching shops:', error);
    }
};

