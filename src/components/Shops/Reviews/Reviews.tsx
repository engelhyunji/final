import React, { useEffect, useState } from 'react'
import { ShopDetails } from '../../../apis/api/api'
import * as ST from './style'
import { BiSolidLike, BiLike } from 'react-icons/bi'
import { useParams } from 'react-router-dom'
import { getRecommended } from '../../../apis/api/review'
import { useAuth } from '../../../context/AuthContext'
import {
    useAddReviewMutation,
    useCancelRecommendMutation,
    useDeleteReviewMutation,
    useRecommendMutation,
} from '../../hooks/useReviewMutation '

interface ReviewsProps {
    detailShopData: ShopDetails
}

const Reviews: React.FC<ReviewsProps> = ({ detailShopData }) => {
    const { isLogin } = useAuth()
    const nickname = localStorage.getItem('nickname')
    const { shopId } = useParams()
    // 글자 수 제한
    const reviewLimit: number = 50

    const [comment, setComment] = useState('')
    const [notiComment, setNotiComment] = useState('')
    const [recommend, setRecommend] = useState<{ [key: number]: boolean }>({})

    // shopId가 undefined 일 때 경고창
    const currentShopId = shopId ? +shopId : 0 && alert('가게를 찾을 수 없습니다')

    useEffect(() => {
        // 나의 리뷰 추천 기록 받아오기
        const getRecommendations = async () => {
            const MyRecommendation: { [key: number]: boolean } = {}
            // detailShopData.reviews가 배열일 경우만
            if (Array.isArray(detailShopData.reviews)) {
                for (const review of detailShopData.reviews) {
                    try {
                        const res = await getRecommended(review.reviewId)
                        MyRecommendation[review.reviewId] = res
                    } catch (error) {
                        console.error('리뷰 추천 기록을 가져오는 중 에러:', error)
                    }
                }
                setRecommend(MyRecommendation)
            }
        }

        getRecommendations()
    }, [])

    // 리뷰 추가, 삭제, 추천, 추천 취소
    const addReviewMutation = useAddReviewMutation()
    const deleteReviewMutation = useDeleteReviewMutation()
    const recommendMutation = useRecommendMutation()
    const cancelRecommendMutation = useCancelRecommendMutation()

    // 리뷰 등록
    const onSubmit = (shopId: number, comment: string) => {
        if (!comment.trim()) {
            setNotiComment('내용을 작성해주세요')
            return
        } else {
            addReviewMutation.mutate({ shopId, comment, shopName: `${detailShopData.shopResponseDto.shopName}` })
            setNotiComment('')
            setComment('')
        }
    }

    // 리뷰 추천
    const RecommendHandler = (reviewId: number) => {
        const recommendReview = { ...recommend }
        // 추천 안한 리뷰일 때 : 추천
        if (recommendReview[reviewId] === undefined || recommendReview[reviewId] === false) {
            recommendMutation.mutate(reviewId)
            recommendReview[reviewId] = true

            // 추천 한 리뷰일 때 : 추천취소
        } else {
            cancelRecommendMutation.mutate(reviewId)
            recommendReview[reviewId] = false
        }
        setRecommend(recommendReview)
    }

    // 리뷰 삭제
    const DeleteHandler = (shopId: number, reviewId: number) => {
        if (confirm('후기를 삭제하시겠습니까?')) {
            deleteReviewMutation.mutate({ shopId, reviewId })
        }
    }

    return (
        <ST.Container>
            {/* 리뷰 작성 부분 */}
            {isLogin && (
                <>
                    <ST.ReviewInputP>
                        {/* <span>후기 작성</span> */}
                        <ST.ReviewInput type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder='방문 후기를 입력해주세요'/>
                        {comment.length > reviewLimit ? (
                            <ST.ReviewLength>
                                {comment.length}/{reviewLimit}
                            </ST.ReviewLength>
                        ) : (
                            <span>
                                {comment.length}/{reviewLimit}
                            </span>
                        )}
                        <ST.AddBtn onClick={() => onSubmit(currentShopId, comment)}>후기 등록하기</ST.AddBtn>
                    </ST.ReviewInputP>
                    {/* '내용을 작성해주세요' 안내글 */}
                    <ST.ReviewInputNotiP>{comment.trim().length > 2 ? '' : notiComment}</ST.ReviewInputNotiP>
                </>
            )}

            {/* 리뷰 목록 */}
            <ST.ReviewH3>방문자 후기 {detailShopData.reviews.length}</ST.ReviewH3>
            <ST.ReviewListUl>
                {detailShopData.reviews
                    .map((review) => (
                        <ST.ReviewListLi key={review.reviewId}>
                            <ST.ReviewListP>
                                <ST.ReviewNick>{review.nickname}</ST.ReviewNick>
                                <ST.ReviewNick>{review.createdAt.slice(0, 10)}</ST.ReviewNick>
                            </ST.ReviewListP>
                            <p>{review.comment}</p>
                            <ST.ReviewListP>
                                <span>
                                    <ST.GoodBtn onClick={() => RecommendHandler(review.reviewId)}>
                                        {recommend[review.reviewId] ? (
                                            <BiSolidLike style={mainColor} />
                                        ) : (
                                            <BiLike style={mainColor} />
                                        )}
                                    </ST.GoodBtn>
                                    <ST.ReviewCount>{review.likeCount}</ST.ReviewCount>
                                </span>
                                {review.nickname === nickname && (
                                    <ST.DelBtn onClick={() => DeleteHandler(currentShopId, review.reviewId)}>
                                        삭제
                                    </ST.DelBtn>
                                )}
                            </ST.ReviewListP>
                        </ST.ReviewListLi>
                    ))
                    .reverse()}
            </ST.ReviewListUl>
        </ST.Container>
    )
}

export default Reviews

export const mainColor = {
    color: '#00bd8f',
}
