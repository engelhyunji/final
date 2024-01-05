// src/redux/modules/shopSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Shop {
    shopId: number
    userId: number
    shopName: string
    shopTime: string
    shopTel: string
    shopAddress: string
    shopType: string
    shopDescribe: string
    imageUrls: string[]
}


interface ShopState {
    shops: Shop[]
}

const initialState: ShopState = {
    shops: [],
}

export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setShops: (state, action: PayloadAction<Shop[]>) => {
            state.shops = action.payload;
        },
        // 가게 삭제 리듀서 추가
        deleteShop: (state, action: PayloadAction<number>) => {
            state.shops = state.shops.filter(shop => shop.shopId !== action.payload);
        },
        // 다른 리듀서들...
    },
});

// 액션 생성자 내보내기
export const { setShops, deleteShop } = shopSlice.actions;

export default shopSlice.reducer;
