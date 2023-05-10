import styles from "./DontSeeToday.module.css";

function DontSeeToday({ setDontSeeToday }) {
  //props로 setDontSeeToday을 받아서 사용

  const closePop = () => {
    setDontSeeToday(false);
  };

  const closeTodayPop = () => {
    let expires = new Date();
    expires = expires.setHours(23, 59, 59, 0);
    localStorage.setItem("dontSeeToday", "Y");
    // 오늘 하루 보지않는 것(23:59:59)을 dontSeeToday 에 저장
    setDontSeeToday(false);
  };
  return (
    <div className={styles.dont_see_today_wrapper}>
      <div className="main-popup">
        <h1>팝업입니다.</h1>
        <button onClick={closeTodayPop}>오늘 하루 열지 않기</button>
        <button onClick={closePop}>닫기</button>
      </div>
    </div>
  );
}

export default DontSeeToday;
