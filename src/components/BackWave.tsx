import React from 'react'
import styled from 'styled-components'

const BackWave: React.FC = () => {
    return (
        <STTitleBackContainer>
            <STTitleBackP />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                    fill="#00D498"
                    fillOpacity="1"
                    d="M0,64L48,96C96,128,192,192,288,202.7C384,213,480,171,576,154.7C672,139,768,149,864,160C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                ></path>
            </svg>
        </STTitleBackContainer>
    )
}

export default BackWave

const STTitleBackContainer = styled.div`
    position: fix;
    top: 0;
    left: 0;
`

const STTitleBackP = styled.p`
    width: 100%;
    height: 100px;
    background-color: #00d498;
`
