// import React from 'react'
// import * as ST from './style'
// import MainTop from './MainTop/MainTop'
// import { useNavigate } from 'react-router-dom'
// import Category from './Category/Category'
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'

// const Main: React.FC = () => {
//     const navigate = useNavigate()

//     return (
//         <ST.MainContainer>
//             <ST.BannerContainer>

//                 <ST.Warp>
//                     <ST.Text2>
//                         반려동물과 함께하는 매칭서비스, 와르와르 <br />
//                         <ST.Text3>Shop 또는 Pet을 등록해보세요!</ST.Text3>
//                     </ST.Text2>
//                 </ST.Warp>
//                 <ST.BtnContainer>
//                     <ST.ShopBtn
//                         onClick={() => {
//                             navigate('/shops')
//                         }}
//                     >
//                         <ST.Text1>
//                             가게를 운영하는
//                             사장님이라면?
//                         </ST.Text1>
//                         <ST.Text>Shop 등록하기</ST.Text>
//                     </ST.ShopBtn>
//                     <ST.PetBtn
//                         onClick={() => {
//                             navigate('/pet')
//                         }}
//                     >
//                         <ST.Text1>
//                             귀여운 내새끼를
//                             키우는 중이라면?
//                         </ST.Text1>
//                         <ST.Text>애완동물 등록</ST.Text>
//                     </ST.PetBtn>
//                 </ST.BtnContainer>
//             </ST.BannerContainer>

//             <ST.TopWrapper>
//                 {/* SHOP 목록 카테고리 슬라이드 */}
//                 <Category />
//             </ST.TopWrapper>

//             <ST.TopWrapper>
//                 {/* PET 목록 */}
//                 <MainTop />
//             </ST.TopWrapper>

//         </ST.MainContainer>
//     )
// }

// export default Main
import * as ST from './style'
import React from 'react';
import MainTop from './MainTop/MainTop'
import { useNavigate } from 'react-router-dom'
import Category from './Category/Category'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Main: React.FC = () => {
    const navigate = useNavigate()

    return (
        <ST.MainContainer>
            <ST.BannerContainer>
                <ST.Warp>
                    <ST.Text2>
                        반려동물과 함께하는 매칭서비스, 와르와르 <br />
                        <ST.Text3>Shop 또는 Pet을 등록해보세요!</ST.Text3>
                    </ST.Text2>
                </ST.Warp>
                <ST.BtnContainer>
                    <ST.ShopBtn onClick={() => navigate('/shops')}>
                        <ST.Text1>가게를 운영하는 사장님이라면?</ST.Text1>
                        <ST.Text>Shop 등록하기</ST.Text>
                    </ST.ShopBtn>
                    <ST.PetBtn onClick={() => navigate('/pet')}>
                        <ST.Text1>귀여운 내새끼를 키우는 중이라면?</ST.Text1>
                        <ST.Text>애완동물 등록</ST.Text>
                    </ST.PetBtn>
                </ST.BtnContainer>
            </ST.BannerContainer>

            <ST.TopWrapper>
                <Category />
            </ST.TopWrapper>

            <ST.TopWrapper>
                <MainTop />
            </ST.TopWrapper>
        </ST.MainContainer>
    )
}

export default Main
