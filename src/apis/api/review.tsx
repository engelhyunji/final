import instance from '../instance'

// 리뷰 등록
export const addReview = async (shopId: number, comment: string, shopName: string) => {
    try {
        await instance.post(`/api/shops/${shopId}/reviews`, { comment })
        alert(`${shopName}에 후기가 등록되었습니다🙉`)
    } catch (error: any) {
        // console.log('리뷰 등록 에러 :', error)
        if (error.response.status === 403) {
            // 가게 주인은 리뷰작성 불가
            if (error.response.data.code === 4509) {
                alert(error.response.data.message)

                // 리뷰 작성은 한개만 가능
            } else if (error.response.data.code === 4508) {
                alert(`작성하신 리뷰가 ${error.response.data.message}`)
            } else {
                alert('리뷰 등록을 할 수 없습니다')
            }
        }
    }
}

// 리뷰 삭제
export const deleteReview = async (shopId: number, reviewId: number) => {
    try {
        await instance.delete(`/api/shops/${shopId}/reviews/${reviewId}`)
    } catch (error: any) {
        // console.log('리뷰 삭제 에러 :', error)
        alert('리뷰 삭제를 할 수 없습니다')
    }
}

// 리뷰 추천(좋아요)
export const recommendReview = async (reviewId: number) => {
    try {
        await instance.post(`/api/reviews/${reviewId}/like`)
    } catch (error: any) {
        // console.log('리뷰 추천에러 :', error)
        alert('리뷰 추천을 할 수 없습니다')
    }
}

// 리뷰 추천(좋아요)
export const cancelRecommendReview = async (reviewId: number) => {
    try {
        await instance.delete(`/api/reviews/${reviewId}/like`)
    } catch (error: any) {
        console.log('리뷰 추천취소 에러 :', error)
    }
}

// 리뷰 추천 기록
export const getRecommended = async (reviewId: number) => {
    try {
        const res = await instance.get(`/api/reviews/${reviewId}/like`)
        return res.data.result
    } catch (error: any) {
        console.log('리뷰 추천내역 확인 에러 :', error)
    }
}
