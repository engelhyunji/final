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
    imageUrl: string
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
    petName: string,
    petBirth: string,
    petInfo: string,
    imageUrl: string
}

// Shop 목록 조회
export const getShops = async () => {

    try {
        const res = await instance.get('/shops');
        const shop: Shop[] = res.data.data;
        return shop;
    } catch (error) {
        console.log('가게 조회 : error',error);
    }
}

// Shop 상세 조회
export const getDetailShop = async (shopId: number) => {

    try {
        const res = await instance.get(`/shops/${shopId}`);
        const shop: ShopDetails = res.data.data;
        return shop;
    } catch (error) {
        console.log('가게 조회 : error',error);
    }
}

// 마이페이지 Shop 조회
export const getMyShop = async () => {

    try {
        const res = await instance.get('/shops/mypage');
        const shop: Shop[] = res.data;
        return shop;
    } catch (error) {
        console.log('shop 마이 조회 : error',error);
    }
}

// 마이페이지 Pet 조회
export const getMyPet = async () => {

    try {
        const res = await instance.get('/pets/mypage');
        const pet: Pet[] = res.data;
        return pet;
    } catch (error) {
        console.log('Pet 마이 조회 : error',error);
    }
}