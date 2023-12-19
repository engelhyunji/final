import instance from '../instance'

    
// 리뷰 등록
export const addReview = async (shopId: number, comment: string) => {
    try {
        await instance.post(`/api/shops/${shopId}/reviews`, {comment})
    } catch (error) {
        console.log('리뷰 등록 에러 :', error)
    }
}

// 리뷰 삭제
export const deleteReview = async (shopId: number, reviewId: number) => {
    try {
        await instance.delete(`/api/shops/${shopId}/reviews/${reviewId}`)
    } catch (error) {
        console.log('리뷰 삭제 에러 :', error)
    }
}

// 리뷰 추천(좋아요)
export const recommendReview = async (reviewId: number) => {
    try {
        await instance.post(`/api/reviews/${reviewId}/like`)
    } catch (error) {
        console.log('리뷰 추천에러 :', error)
    }
}

// 리뷰 추천(좋아요)
export const cancelRecommendReview = async (reviewId: number) => {
    try {
        await instance.delete(`/api/reviews/${reviewId}/like`)
    } catch (error) {
        console.log('리뷰 추천에러 :', error)
    }
}