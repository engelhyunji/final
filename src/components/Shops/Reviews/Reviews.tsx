import React, { useState } from 'react'
import { ShopDetails } from '../../../apis/api/api'
import { useParams } from 'react-router-dom'
import { addReview, cancelRecommendReview, deleteReview, recommendReview } from '../../../apis/api/review'
import useShopMutation from '../../../hooks/detailShopMutaion'

interface ReviewsProps {
    detailShopData: ShopDetails
}

const Reviews: React.FC<ReviewsProps> = ({ detailShopData }) => {
    const { shopId } = useParams()

    const [comment, setComment] = useState('')
    const [recommend, setRecommend] = useState<{ [key: number]: boolean }>({})

    // shopId가 undefined 일 때 경고창
    const currentShopId = shopId ? +shopId : 0 && alert('가게를 찾을 수 없습니다')

    const addReviewMutation = () => useShopMutation(({ shopId, comment }) => addReview(shopId, comment))

    const deleteReviewMutation = () => useShopMutation(({ shopId, reviewId }) => deleteReview(shopId, reviewId))

    const recommendMutation = () => useShopMutation((reviewId) => recommendReview(reviewId))

    const cancelRecommendMutation = () => useShopMutation((reviewId) => cancelRecommendReview(reviewId));

    const onSubmit = (shopId: number, comment: string) => {
        addReviewMutation().mutate({ shopId, comment })
        alert(`${detailShopData.shopResponseDto.shopName}에 후기가 등록되었습니다🙉`)
        setComment('')
    }

    // 리뷰 추천 초기 상태 확인 필요,, 수정해야함
    const RecommendHandler = (reviewId: number) => {
        const newRecommendState = { ...recommend }
        if (newRecommendState[reviewId] === false) {
            recommendMutation().mutate(reviewId)
            newRecommendState[reviewId] = true
        } else {
            cancelRecommendMutation().mutate(reviewId)
            newRecommendState[reviewId] = false
        }
        setRecommend(newRecommendState)
    }

    const DeleteHandler = (shopId: number, reviewId: number) => {
        if (window.confirm('후기를 삭제하시겠습니까?')) {
            deleteReviewMutation().mutate({ shopId, reviewId })
        }
    }

    return (
        <div>
            <p>
                <span>후기 작성</span>
                <span>
                    <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
                </span>
                <button onClick={() => onSubmit(currentShopId, comment)}>등록</button>
            </p>
            <h3>후기</h3>
            <ul>
                {detailShopData.reviews.map((review) => (
                    <li key={review.reviewId}>
                        <p>작성자 : {review.nickname}</p>
                        <p>{review.comment}</p>
                        <p>
                            추천수 : {review.likeCount}
                            <button onClick={() => RecommendHandler(review.reviewId)}>
                                {recommend[review.reviewId] ? '취소' : '추천!'}
                            </button>
                        </p>
                        <p>작성 날짜 : {review.createdAt}</p>
                        <p>
                            <button onClick={() => DeleteHandler(currentShopId, review.reviewId)}>삭제</button>
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Reviews
