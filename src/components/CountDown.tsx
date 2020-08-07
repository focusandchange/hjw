import React, { FC } from "react";
import styled, { css } from "styled-components";
import { useState } from "react";
import { queries } from "@testing-library/react";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

const Background = styled.div`
  position: fixed;
  bottom: 0;
  height: 40px;
  width: 100%;
  background-color: black;
  display: flex;
  align-items: center;
`;
const DivLeft = styled.div`
  position: relative;
  left: 10px;
  color: white;
`;
const DivMid = styled.div`
  position: relative;
  left: 20px;
  padding: 5px 5px 5px 5px;

  color: white;
  border: 1px dashed white;
`;
const DivRight = styled.div`
  position: relative;
  left: 20px;
  color: white;
`;
const DivClose = styled.div`
  position: fixed;
  color: white;
  right: 20px;
  cursor: pointer;
`;
const ViewProduct = styled.button`
  position: relative;
  left: 20px;
  padding: 5px 5px 5px 5px;
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
window.onunload = onunload_handler;
function onunload_handler() {
  const nowTime = moment().format("X");
  // let remainsTime = localStorage.getItem("remainsTime");
  let timeCalculate;
  if (saveTime == null) {
    timeCalculate = 0;
  } else {
    timeCalculate = parseInt(nowTime) - parseInt(saveTime);
  }

  // alert(
  //   "上次离开时间：" +
  //     saveTime +
  //     "当前时间：" +
  //     nowTime +
  //     "时间差:" +
  //     timeCalculate
  // );

  return timeCalculate;
}
// function timeCalculateSecondsFunction() {
//   if (timeCalculate === 0) {
//     return 0;
//   } else {
//     return 60 - (timeCalculate - (timeCalculate / 60) * 60);
//   }
// }
function getRemainsTime() {
  if (remainTime == null) {
    return 1200;
  } else {
    return parseInt(remainTime);
  }
}
const remainsTime = getRemainsTime();
const timeCalculate = onunload_handler();

// const remainsTimeMinutes = Math.trunc(remainsTime / 60);
// const remainsTimeSeconds = remainsTime % 60;
// const timeCalculateMinutes = Math.trunc(timeCalculate / 60);
// const timeCalculateSeconds = timeCalculate % 60;
const timeMod = Math.abs(remainsTime - timeCalculate);
window.onbeforeunload = onbeforeunload_handler;

function onbeforeunload_handler() {
  localStorage.setItem("saveTime", moment().format("X"));
  // localStorage.clear();
}
onbeforeunload_handler();
// const flagTime = localStorage.getItem("flagTime");
// function StartTime(time=parseInt(flagTime)) {
//   return (time-timeCalculate);

// }
interface DisplayViewProductsProps {
  viewProductState: string;
  setViewProductState: (value: string) => void;
}
const CountDown: FC<DisplayViewProductsProps> = ({
  viewProductState,
  setViewProductState,
}) =>
  // function CountDownDiv({

  // })
  {
    minutes = Math.trunc((timeMod % 1200) / 60);
    seconds = (timeMod % 1200) % 60;
    // const [viewProductState, setViewProductState] = useState(true);
    const [over, setOver] = useState(false);
    const [displayState, setDisplayState] = useState(true);
    // console.log(minutes + " dfgdfgf " + seconds);
    const [time, setTime] = useState({
      minutes: parseInt(minutes.toString()),
      seconds: parseInt(seconds.toString()),
    });

    const tick = () => {
      // console.log(minutes + " dfgdfgf " + seconds);

      // if (remainsTime - timeCalculate <= 0) {
      //   const calculate = timeCalculate - remainsTime;

      //   setTime({
      //     minutes: Math.trunc((calculate % 10) / 60),
      //     seconds: (calculate % 10) % 60,
      //   });
      // }

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
      }
      // else if (time.minutes < 0 || time.seconds === 0) {
      //   setTime({
      //     minutes: 20 + (time.minutes % 20) - 1,
      //     seconds: time.seconds - 1,
      //   });
      // }
      else {
        setTime({
          minutes: time.minutes,
          seconds: time.seconds - 1,
        });
      }
    };
    localStorage.setItem(
      "remainTime",
      (time.minutes * 60 + time.seconds).toString()
    );
    React.useEffect(() => {
      let timerID = setInterval(() => tick(), 1000);
      return () => clearInterval(timerID);
    });

    const Click = () => {
      setDisplayState(false);
    };
    const ViewProductClick = () => {
      if (viewProductState == "none") {
        setViewProductState("flex");
      } else {
        setViewProductState("none");
      }
    };

    return (
      <Background style={{ display: displayState ? "flex" : "none" }}>
        <DivLeft>您的折扣已激活！</DivLeft>
        <DivMid>优惠券：XD64QZOB</DivMid>
        <DivRight style={{ padding: "0 6px" }}>
          在
          {`${time.minutes
            .toString()
            .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`}
          秒内 到期
        </DivRight>
        <ViewProduct onClick={ViewProductClick}>ViewProduct</ViewProduct>
        <DivClose onClick={Click}>✕</DivClose>
      </Background>
    );
  };

export default CountDown;
