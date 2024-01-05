import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { addReview, deleteReview, recommendReview, cancelRecommendReview } from '../../apis/api/review';


type AddReviewParams = {
    shopId: number;
    comment: string;
    shopName: string;
};

type DeleteReviewParams = {
    shopId: number;
    reviewId: number;
};

// 가게 리뷰 등록, 삭제, 추천, 추천취소 훅의 공통 코드
const useReviewMutation = <TParams>(mutationFn: (params: TParams) => Promise<void>, options?: any) => {
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError, TParams>(
        mutationFn,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('detailShopData');
            },
            ...options,
        },
    );
};

export const useAddReviewMutation = () => {
    return useReviewMutation<AddReviewParams>(({ shopId, comment, shopName }) => addReview(shopId, comment, shopName), {
        onError: (error: AxiosError) => {
            console.error('후기추가 Mutation 에러 :', error);
            alert('후기 등록에 실패했습니다.');
        },
    });
};

export const useDeleteReviewMutation = () => {
    return useReviewMutation<DeleteReviewParams>(({ shopId, reviewId }) => deleteReview(shopId, reviewId));
};

export const useRecommendMutation = () => {
    return useReviewMutation<number>((reviewId) => recommendReview(reviewId));
};

export const useCancelRecommendMutation = () => {
    return useReviewMutation<number>((reviewId) => cancelRecommendReview(reviewId));
};
