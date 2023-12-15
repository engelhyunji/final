import instance from "../instance";

// 채팅방 생성
export const addChat = async (name: string) => {
    try {
        const res = await instance.post('/chat/room', { name })
        console.log('addChat 함수 반환값',res.data.data)
        return res.data.data
    } catch (err) {
        console.log(err)
    }
}

// 채팅방 삭제
export const deleteChat = async (roomId: string) => {
    try {
        await instance.delete(`/chat/room/${roomId}`)
    } catch (error) {
        console.log('채팅방 삭제 에러 :', error)
    }
}