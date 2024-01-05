// import instance from '../instance'

// // 장소 추가 API 호출
// export const addPlace = async (newPlace) => {
//     try {
//         const response = await instance.post('/api/places', newPlace)
//         if (response.status === 200) {
//             // 성공 시 로직
//         }
//     } catch (error) {
//         console.error('장소 추가 에러:', error)
//     }
// }

// // 장소 삭제 API 호출
// export const deletePlace = async (placeId) => {
//     try {
//         const response = await instance.delete(`/api/places/${placeId}`)
//         if (response.status === 200) {
//             // 성공 시 로직
//         }
//     } catch (error) {
//         console.error('장소 삭제 에러:', error)
//     }
// }

// // 장소 수정 API 호출
// export const updatePlace = async (placeId, updatedPlace) => {
//     try {
//         const response = await instance.put(`/api/places/${placeId}`, updatedPlace)
//         if (response.status === 200) {
//             // 성공 시 로직
//         }
//     } catch (error) {
//         console.error('장소 수정 에러:', error)
//     }
// }
