import instance from "../instance";

// 채팅방 목록
export const getChatList = async () => {
    try {
        const res = await instance.get('/chat/rooms')
        return res.data.result
    } catch (err) {
        console.log(err)
    }
}

// 채팅방 생성
export const addChat = async (query: { name: string }) => {
    try {
        await instance.post('/chat/room', null, { params: query })
        // console.log('addChat 함수 반환값',res.data.result)
    } catch (err) {
        console.log(err)
    }
}

// 채팅방 삭제
export const deleteChat = async (roomId: string) => {
    try {
        await instance.delete(`/chat/room/${roomId}`)
    } catch (err) {
        console.log('채팅방 삭제 에러 :', err)
        // if (err?.response.status === 403) {
        //     alert('내가 만든 방만 삭제할 수 있습니다.')
        // }
    }
}

// 채팅방 상세
export const getChatRoom = async (roomId: string) => {
    try {
        const res = await instance.get(`/chat/room/${roomId}`)
        // console.log('getChatRoom 함수 반환값',res.data.result)
        return res.data.result;
    } catch (err) {
        console.log('채팅방 상세 에러 :',err)
    }
}

// 채팅방 메세지
export const getChatMessages = async (roomId: string) => {
    try {
        const res = await instance.get(`/chat/room/${roomId}/messages`)
        // console.log('getChatMessages 함수 반환값',res.data.result)
        return res.data.result;
    } catch (err) {
        console.log('채팅방 메세지 조회 에러 :',err)
    }
}

// 해시태그 방별 추가
export const AddHash = async (roomId: string, hash: string) => {
    try {
        await instance.post(`${import.meta.env.VITE_APP_SERVER_URL}/api/tags/chatrooms/${roomId}`, [hash] )
    } catch (err) {
        console.log(err)
    }
}

// 해시태그 인기 조회
export const getPopularHash = async () => {
    try {
        const res = await instance.get('api/tags/chatrooms/popular')
        return res.data.result
    } catch (err) {
        console.log(err)
    }
}

// 해시태그 별 방조회
export const getHashRoomList = async (tagName: string) => {
    try {
        const res = await instance.get(`api/tags/chatrooms/${tagName}`)
        return res.data.result
    } catch (err) {
        console.log(err)
    }
}

// 해시태그 삭제
export const deleteHash = async (roomId : string, name: string) => {
    try {
        const res = await instance.delete(`api/tags/chatrooms/${roomId}/${name}`)
        return res.data.result
    } catch (err) {
        console.log(err)
    }
}