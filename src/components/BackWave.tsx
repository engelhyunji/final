import React from 'react'
import styled from 'styled-components'

const BackWave: React.FC = () => {
    return (
        <STTitleBackContainer>
            <STTitleBackP />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                {/* 벡터 코드에 블러 그림자 넣기 위해 필터 정의 */}
                <defs>
                    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                        {/* feOffset:그림자효과, in="SourceGraphic"- SVG요소 가져와서 그림자처리 */}
                        <feOffset result="offOut" in="SourceGraphic" dx="0" dy="5" />
                        {/* feColorMatrix 필터:오프셋 이미지 색상을 검은 색에 가깝게 변환. 행렬 값 조절(검정은 0) */}
                        <feColorMatrix result="matrixOut" in="offOut" type="matrix" values="0.6 0 0 0 0 0 0.6 0 0 0 0 0 0.5 0 0 0 0 0 1 0" />
                        {/* feGaussianBlur:블러효과, stdDeviation 속성- 흐림의 정도 */}
                        <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="10" />
                        {/* feBlend:오프셋 이미지 위에 원본그래픽을 가져와 혼합 */}
                        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                    </filter>
                </defs>

                {/* path에 필터 적용 - url(#shadow) */}
                <path
                    fill="#00D498"
                    fillOpacity="1"
                    d="M0,64L48,96C96,128,192,192,288,202.7C384,213,480,171,576,154.7C672,139,768,149,864,160C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                    filter="url(#shadow)"
                ></path>
            </svg>
        </STTitleBackContainer>
    )
}

export default BackWave

const STTitleBackContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 1; // 제일 뒤로
    width: 100%;
`

const STTitleBackP = styled.p`
    width: 100%;
    height: 30px;
    background-color: #00d498;
`
