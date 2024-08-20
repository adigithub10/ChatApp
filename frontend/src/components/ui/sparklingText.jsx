// SparklingText.js
import React from 'react';
import styled, { keyframes } from 'styled-components';

const pullUp = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const rotateAndScale = keyframes`
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) rotate(360deg);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
`;

const sparkle = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const SparklingTextContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const SparklingTextStyled = styled.h2`
  font-size: 3em;
  font-weight: 900;
  letter-spacing: 2px;
  margin-bottom: 10px;
  text-transform: uppercase;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #6a4cff, #fc5c7d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;

  span {
    display: inline-block;
    animation: ${pullUp} 0.6s ease forwards;
    opacity: 0;
  }

  span:nth-child(7) {
    animation: ${rotateAndScale} 0.8s ease forwards;
    animation-delay: 0.6s;
  }
`;

const Sparkle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 60%);
    width: 200%;
    height: 200%;
    animation: ${sparkle} 1.5s infinite;
    top: -50%;
    left: -50%;
  }
`;

const SparklingText = () => {
  return (
    <SparklingTextContainer>
      <SparklingTextStyled>
        <span>C</span><span>h</span><span>a</span><span>t</span><span> </span><span>X</span>
        <Sparkle />
      </SparklingTextStyled>
    </SparklingTextContainer>
  );
};

export default SparklingText;
