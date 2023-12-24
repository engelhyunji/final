import instance from "../instance";

export interface Shop {
    shopId: number,
    userId: number,
    shopName: string,
    shopTime: string,
    shopTel: string,
    shopAddress: string,
    shopType: string,
    shopDescribe: string,
    imageUrls: string[]
}

export interface ShopDetails {
    shopResponseDto: shopResponseDto,
    reviews: Review[]
}
export interface shopResponseDto {
    shopId: number,
    userId: number,
    shopName: string,
    shopTime: string,
    shopTel: string,
    shopAddress: string,
    shopType: string,
    shopDescribe: string,
    imageUrls: string,
    reviews: Review[] 
}
export interface Review {
    reviewId: number,
    userId: number,
    nickname: string,
    comment: string,
    likeCount: number,
    createdAt: string
}

export interface Pet {
    userId: number,
    petId: number,
    nickname: string,
    petGender: string,
    petName: string,
    petKind: string,
    petInfo: string,
    imageUrls: string[]
}

export interface ChatRoom {
    roomId: string,
    name: string,
    creator: Creator
}
export interface Creator {
    email: string,
    nickname: string
}



// Shop 목록 조회
export const getShops = async () => {
    try {
        const res = await instance.get('/api/shops');
        const shop: Shop[] = res.data.result;
        console.log('shop:', shop);
        return shop;
    } catch (error) {
        console.log('가게 목록조회 에러 :',error);
    }
}

// Shop 상세 조회
export const getDetailShop = async (shopId: number) => {
    try {
        const res = await instance.get(`/api/shops/${shopId}`);
        const shop: ShopDetails = res.data.result;
        return shop;
    } catch (error) {
        console.log('가게 상세조회 에러 :',error);
    }
}

// Shop 카테고리별 조회
export const getShopType = async (shopType: string) => {
    try {
        const res = await instance.get(`/api/shops/category/${shopType}`);
        const typeShops: Shop[] = res.data.result;
        return typeShops;
    } catch (error) {
        console.log('가게 카테고리별 조회 에러 :',error);
    }
}




// 마이페이지 Shop 조회
export const getMyShop = async () => {
    try {
        const res = await instance.get(`/api/shops/mypage`);
        const shop: Shop[] = res.data.result;
        return shop;
    } catch (error) {
        console.log('마이 shop :',error);
    }
}

// 마이페이지 Pet 조회
export const getMyPet = async () => {
    try {
        const res = await instance.get(`/api/pets/mypage`);
        const pet: Pet[] = res.data.result;
        return pet;
    } catch (error) {
        console.log('마이 pet :',error);
    }
}

// (마이페이지) Shop 삭제
export const deleteShop = async (shopId: number) => {
    try {
        await instance.delete(`/api/shops/${shopId}`);
    } catch (error) {
        console.log('shop 삭제에러 :',error);
    }
}

// 마이페이지 ChatRoom 조회
export const getMyChatRoom = async () => {
    try {
        const res = await instance.get('/chat/mypage');
        const myChatRoom: ChatRoom[] = res.data.result;
        return myChatRoom;
    } catch (error) {
        console.log('마이 chatRoom 조회 :',error);
    }
}