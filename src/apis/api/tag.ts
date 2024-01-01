import instance from "../instance"

// 채팅방 해시태그 방별 추가
export const AddHash = async (roomId: string, hash: string) => {
    try {
        await instance.post(`/api/tags/chatrooms/${roomId}`, [hash] )
    } catch (err) {
        console.log(err)
    }
}

// 채팅방 해시태그 인기 조회
export const getPopularHash = async () => {
    try {
        const res = await instance.get('/api/tags/chatrooms/popular')
        return res.data.result
    } catch (err) {
        console.log(err)
    }
}

// 채팅방 해시태그 별 방조회
export const getHashRoomList = async (tagName: string) => {
    try {
        const res = await instance.get(`/api/tags/chatrooms/${tagName}`)
        return res.data.result
    } catch (err) {
        console.log(err)
    }
}

// 채팅방 해시태그 삭제
export const deleteHash = async (roomId : string, tagName: string) => {
    try {
        const res = await instance.delete(`/api/tags/chatrooms/${roomId}/${tagName}`)
        return res.data.result
    } catch (err) {
        console.log(err)
    }
}




// // Shop 해시태그 방별 추가
// export const AddShopHash = async (shopId: string, hash: string) => {
//     try {
//         await instance.post(`/api/tags/shops/${shopId}`, [hash] )
//     } catch (err) {
//         console.log(err)
//     }
// }

// // Shop 해시태그 인기 조회
// export const getShopPopularHash = async () => {
//     try {
//         const res = await instance.get('/api/tags/shops/popular')
//         return res.data.result
//     } catch (err) {
//         console.log(err)
//     }
// }

// // Shop 해시태그 별 방조회
// export const getShopHashRoomList = async (tagName: string) => {
//     try {
//         const res = await instance.get(`/api/tags/shops/${tagName}`)
//         return res.data.result
//     } catch (err) {
//         console.log(err)
//     }
// }

// // Shop 해시태그 삭제
// export const deleteShopHash = async (shopId : string, tagName: string) => {
//     try {
//         const res = await instance.delete(`/api/tags/shops/${shopId}/${tagName}`)
//         return res.data.result
//     } catch (err) {
//         console.log(err)
//     }
// }