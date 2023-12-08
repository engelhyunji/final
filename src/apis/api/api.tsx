import instance from "../instance";

export interface Shop {
    userId: number,
    shopName: string,
    shopTime: string,
    shopTel: string,
    shopAddress: string,
    shopType: string,
    shopDescribe: string,
    imageUrl: string
}

export interface Pet {
    userId: number,
    petName: string,
    petBirth: string,
    petInfo: string,
    imageUrl: string
}

// Shop 상세 조회
export const getDetailShop = async () => {

    try {
        const res = await instance.get('/shops/mypage');
        const shop: Shop = res.data;
        return shop;
    } catch (error) {
        console.log('가게 조회 : error',error);
    }
}

// Pet 상세 조회
export const getDetailPet = async () => {

    try {
        const res = await instance.get('/pets/mypage');
        const pet: Pet = res.data;
        return pet;
    } catch (error) {
        console.log('Pet 상세 조회 : error',error);
    }
}