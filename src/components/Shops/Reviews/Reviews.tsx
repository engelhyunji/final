import React, { useState } from 'react'
import { ShopDetails } from '../../../apis/api/api'
import * as ST from './style'
import { BiSolidLike, BiLike } from "react-icons/bi";
import { useParams } from 'react-router-dom'
import { addReview, cancelRecommendReview, deleteReview, recommendReview } from '../../../apis/api/review'
import { useMutation, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'

interface ReviewsProps {
    detailShopData: ShopDetails
}

const Reviews: React.FC<ReviewsProps> = ({ detailShopData }) => {
    const { shopId } = useParams()
    const queryClient = useQueryClient()

    const [comment, setComment] = useState('')
    const [recommend, setRecommend] = useState<{ [key: number]: boolean }>({})

    // shopId가 undefined 일 때 경고창
    const currentShopId = shopId ? +shopId : 0 && alert('가게를 찾을 수 없습니다')

    const addReviewMutation = useMutation<void, AxiosError, { shopId: number; comment: string }>(
        ({ shopId, comment }) => addReview(shopId, comment),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('detailShopData')
                alert(`${detailShopData.shopResponseDto.shopName}에 후기가 등록되었습니다🙉`)
            },
            onError: (error) => {
                console.error('후기추가 Mutation 에러 :', error)
                alert('후기 등록에 실패했습니다.')
            },
        },
    )

    const deleteReviewMutation = useMutation<void, AxiosError, { shopId: number; reviewId: number }>(
        ({ shopId, reviewId }) => deleteReview(shopId, reviewId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('detailShopData')
            },
        },
    )

    const recommendMutation = useMutation<void, AxiosError, number>((reviewId) => recommendReview(reviewId), {
        onSuccess: () => {
            queryClient.invalidateQueries('detailShopData')
        },
    })

    const cancelRecommendMutation = useMutation<void, AxiosError, number>(
        (reviewId) => cancelRecommendReview(reviewId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('detailShopData')
            },
        },
    )

    const onSubmit = (shopId: number, comment: string) => {
        addReviewMutation.mutate({ shopId, comment })
        setComment('')
    }

    // 리뷰 추천 초기 상태 확인 필요,, 수정해야함
    const RecommendHandler = (reviewId: number) => {
        const newRecommendState = { ...recommend }
        if (newRecommendState[reviewId] === undefined || newRecommendState[reviewId] === false) {
            recommendMutation.mutate(reviewId)
            newRecommendState[reviewId] = true
        } else {
            cancelRecommendMutation.mutate(reviewId)
            newRecommendState[reviewId] = false
        }
        setRecommend(newRecommendState)
    }

    const DeleteHandler = (shopId: number, reviewId: number) => {
        if (confirm('후기를 삭제하시겠습니까?')) {
            deleteReviewMutation.mutate({ shopId, reviewId })
        }
    }

    return (
        <ST.Container>
            <ST.ReviewInputP>
                <span>후기 작성</span>
                <ST.ReviewInput type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
                <ST.AddBtn onClick={() => onSubmit(currentShopId, comment)}>등록</ST.AddBtn>
            </ST.ReviewInputP>
            <ST.ReviewH3>방문자 후기 {detailShopData.reviews.length}</ST.ReviewH3>
            <ST.ReviewListUl>
                {detailShopData.reviews.map((review) => (
                    <ST.ReviewListLi key={review.reviewId}>
                        <ST.ReviewListP>
                            <ST.ReviewNick>{review.nickname}</ST.ReviewNick>
                            <ST.ReviewNick>{review.createdAt.slice(0, 10)}</ST.ReviewNick>
                        </ST.ReviewListP>
                        <p>{review.comment}</p>
                        <ST.ReviewListP>
                            <span>
                                <ST.GoodBtn onClick={() => RecommendHandler(review.reviewId)}>
                                    {recommend[review.reviewId] ? <BiSolidLike style={mainColor}/> : <BiLike style={mainColor}/>}
                                </ST.GoodBtn>
                                &nbsp;{review.likeCount}
                            </span>
                            <ST.DelBtn onClick={() => DeleteHandler(currentShopId, review.reviewId)}>삭제</ST.DelBtn>
                        </ST.ReviewListP>
                    </ST.ReviewListLi>
                ))}
            </ST.ReviewListUl>
        </ST.Container>
    )
}

export default Reviews

export const mainColor = {
    color: '#00bd8f'
}