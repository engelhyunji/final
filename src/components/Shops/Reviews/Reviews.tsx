import React, { useState } from 'react'
import { ShopDetails } from '../../../apis/api/api'
import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { addReview, cancelRecommendReview, deleteReview, recommendReview } from '../../../apis/api/review'
import { AxiosError } from 'axios'

interface ReviewsProps {
    detailShopData: ShopDetails
}

const Reviews: React.FC<ReviewsProps> = ({ detailShopData }) => {
    const { shopId } = useParams()
    const [comment, setComment] = useState('')
    const [recommend, setRecommend] = useState<{ [key: number]: boolean }>({});

    // undefined 일 때 0 -> 다른 방법 모색 필요
    const currentShopId = shopId ? +shopId : 0

    const queryClient = useQueryClient()

    const mutation = useMutation<void, AxiosError, { shopId: number; comment: string }>(
        ({ shopId, comment }) => addReview(shopId, comment),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('detailShopData')
            },
            onError: (error) => {
                console.error('후기추가 Mutation 에러 :', error)
                alert('후기 등록에 실패했습니다.')
            },
        },
    )

    const deleteMutation = useMutation<void, AxiosError, { shopId: number; reviewId: number }>(
        ({ shopId, reviewId }) => deleteReview(shopId, reviewId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('detailShopData')
            },
        },
    )

    const recommendMutation = useMutation<void, AxiosError, number >(
        (reviewId) => recommendReview(reviewId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('detailShopData')
            },
        },
    )

    const cancelRecommendMutation = useMutation<void, AxiosError, number >(
        (reviewId) => cancelRecommendReview(reviewId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('detailShopData')
            },
        },
    )

    const onSubmit = (shopId: number, comment: string) => {
        mutation.mutate({ shopId, comment })
        alert(`${detailShopData.shopResponseDto.shopName}에 후기가 등록되었습니다🙉`)
        setComment('')
    }

    // 리뷰 추천 초기 상태 확인 필요,, 수정해야함
    const RecommendHandler = (reviewId: number) => {
        const newRecommendState = { ...recommend };
        if (newRecommendState[reviewId] === false) {
            recommendMutation.mutate(reviewId);
            newRecommendState[reviewId] = true;
        } else {
            cancelRecommendMutation.mutate(reviewId);
            newRecommendState[reviewId] = false;
        }
        setRecommend(newRecommendState);
    }

    const DeleteHandler = (shopId: number, reviewId: number) => {
        if (window.confirm('후기를 삭제하시겠습니까?')) {
            deleteMutation.mutate({ shopId, reviewId })
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
