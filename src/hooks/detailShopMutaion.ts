import { UseMutationResult, useMutation, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'

export default function useShopMutation<TData>(
    mutationFn: (variables: any) => Promise<TData>,
): UseMutationResult<TData, AxiosError, any> {
    const queryClient = useQueryClient()

    return useMutation(mutationFn, {
        onSuccess: () => {
            queryClient.invalidateQueries('detailShopData')
        },
        onError: (error) => {
            console.error('Mutation 에러:', error)
            alert('작업에 실패했습니다.')
        },
    })
}
