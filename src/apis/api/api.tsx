import instance from "../instance";

export interface Shop {
    id: number,
    shopName: string,
    shopTime: string,
    shopTel: string,
    shopAddress: string,
    shopType: string,
    shopDescribe: string,
    imageUrl: string
}

export interface Pet {
    id: number,
    petName: string,
    petBirth: string,
    petInfo: string,
    imageUrl: string
}

// 가게 상세 조회
export const getDetailShop = async (id: number) => {

    try {
        const res = await instance.get('/shops/mypage/{id}');
        const shop: Shop = res.data;
        return shop;
    } catch (error) {
        console.log('가게 조회 : error',error);
    }
}

// Pet 상세 조회
export const getDetailPet = async (id: number) => {

    try {
        const res = await instance.get('/pets/mypage/{id}');
        const pet: Pet = res.data;
        return pet;
    } catch (error) {
        console.log('Pet 상세 조회 : error',error);
    }
}