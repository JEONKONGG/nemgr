import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "../components/layout/Header";
import DontSeeToday from "../components/localstorage/DontSeeToday";

function RootLayout() {
  // 기본 세팅 값은 false
  const [dontSeeToday, setDontSeeToday] = useState(false);
  // localStorage에 dontSeeToday 조회
  const DONT_SEE_TODAY = localStorage.getItem("dontSeeToday");

  useEffect(() => {
    const today = new Date();
    const handleDontSeeTodayPop = () => {
      // 현재 date가 localStorage의 시간보다 크면 return
      if (DONT_SEE_TODAY && DONT_SEE_TODAY > today) {
        return;
      }
      // 저장된 date가 없거나 today보다 작다면 popup 노출
      if (!DONT_SEE_TODAY || DONT_SEE_TODAY < today) {
        setDontSeeToday(true);
      }
    };
    handleDontSeeTodayPop();
  }, [DONT_SEE_TODAY]);

  return (
    <>
      {dontSeeToday ? (
        <DontSeeToday setDontSeeToday={setDontSeeToday}></DontSeeToday>
      ) : (
        <>
          <Header />
          <Outlet />
        </>
      )}
    </>
  );
}

export default RootLayout;
