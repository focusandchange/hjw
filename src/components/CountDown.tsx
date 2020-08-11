import React, { FC } from "react";
import styled, { css } from "styled-components";
import { useState } from "react";
import moment from "moment";
import "moment/locale/zh-cn";
// import { queries } from "@testing-library/react";
const Background = styled.div<{ displayState: boolean }>`
  position: fixed;
  bottom: 0;
  height: 40px;
  width: 100%;
  background-color: black;
  display: ${(props) => (props.displayState ? "flex" : "none")};
  align-items: center;
`;

const Discount = styled.div`
  position: relative;
  left: 10px;
  color: white;
`;

const Coupon = styled.div`
  position: relative;
  left: 20px;
  padding: 5px;

  color: white;
  border: 1px dashed white;
`;

const CountDownDiv = styled.div`
  position: relative;
  left: 20px;
  color: white;
  padding: "0 6px";
`;

const Close = styled.div`
  position: fixed;
  color: white;
  right: 20px;
  cursor: pointer;
`;

const ViewProduct = styled.button`
  position: relative;
  left: 20px;
  padding: 5px;
  color: white;
  background-color: green;
  border-radius: 3px;
  appearance: button;
  text-transform: none;
  overflow: visible;
  outline: none;

  border: none;
  cursor: pointer;
  line-height: normal;
`;

let minutes;
let seconds;
const remainTime = localStorage.getItem("remainTime");
const saveTime = localStorage.getItem("saveTime");

function Welcome() {
  const nowTime = moment().format("X");

  let timeCalculate;
  if (saveTime == null) {
    timeCalculate = 0;
  } else {
    timeCalculate = parseInt(nowTime) - parseInt(saveTime);
  }

  return timeCalculate;
}
const timeCalculate = Welcome();

function getRemainsTime() {
  if (remainTime == null) {
    return 1200;
  } else {
    return parseInt(remainTime);
  }
}
const remainsTime = getRemainsTime();

const timeMod = Math.abs(remainsTime - timeCalculate);
window.onbeforeunload = onbeforeunload_handler;

function onbeforeunload_handler() {
  localStorage.setItem("saveTime", moment().format("X"));
}
onbeforeunload_handler();

interface DisplayViewProductsProps {
  viewProductState: boolean;
  setViewProductState: (value: boolean) => void;
}
const CountDown: FC<DisplayViewProductsProps> = ({
  viewProductState,
  setViewProductState,
}) => {
  minutes = Math.trunc((timeMod % 1200) / 60);
  seconds = (timeMod % 1200) % 60;

  const [over, setOver] = useState(false);
  const [displayState, setDisplayState] = useState(true);
  const [customInterval, setCustomInterval] = useState(1);
  const [time, setTime] = useState({
    minutes: parseInt(minutes.toString()),
    seconds: parseInt(seconds.toString()),
  });

  const tick = () => {
    console.log(customInterval);
    if (customInterval % 100 == 0) {
      if (time.minutes === 0 && time.seconds === 0) {
        setTime({
          minutes: 20,
          seconds: 0,
        });

        setOver(true);
      } else if (time.seconds === 0) {
        setTime({
          minutes: time.minutes - 1,
          seconds: 59,
        });
      } else {
        setTime({
          minutes: time.minutes,
          seconds: time.seconds - 1,
        });
      }
    }
    setCustomInterval(customInterval + 1);
  };
  localStorage.setItem(
    "remainTime",
    (time.minutes * 60 + time.seconds).toString()
  );
  React.useEffect(() => {
    let timerID = setTimeout(() => tick(), 10);
    return () => clearInterval(timerID);
  });

  const Click = () => {
    setDisplayState(false);
  };
  const ViewProductClick = () => {
    if (viewProductState == false) {
      setViewProductState(true);
    } else {
      setViewProductState(false);
    }
  };

  return (
    <Background displayState={displayState}>
      <Discount>您的折扣已激活！</Discount>
      <Coupon>优惠券：XD64QZOB</Coupon>
      <CountDownDiv>
        在
        {`${time.minutes
          .toString()
          .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`}
        秒内 到期
      </CountDownDiv>
      <ViewProduct onClick={ViewProductClick}>ViewProduct</ViewProduct>
      <Close onClick={Click}>✕</Close>
    </Background>
  );
};

export default CountDown;
