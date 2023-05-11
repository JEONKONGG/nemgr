import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { FaUser, FaLock } from "react-icons/fa";
import { IoMdClose, IoMdMail } from "react-icons/Io";
import { FaIdCard } from "react-icons/fa";

import styles from "./Header.module.css";
import { setCookie } from "../../utils/Cookie";

function MainHeader() {
  // 팝업
  const [openPopup, setOpenPopup] = useState(false);
  const [registerPopup, setRegisterPopup] = useState(false);

  // 로그인
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");

  // 회원가입
  const [registerId, setRegisterId] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerPw, setRegisterPw] = useState("");
  const [registerAgree, setRegisterAgree] = useState(false);

  // JWT 토큰
  const [jwtToken, setJwtToken] = useState("");

  // 로그인 정보
  const [userInfo, setUserInfo] = useState([]);

  // POPUP 입력값들 초기화
  function popupInit() {
    setLoginId("");
    setLoginPw("");
    setRegisterId("");
    setRegisterName("");
    setRegisterPw("");
    setRegisterAgree(false);
  }

  // 로그인 팝업 오픈
  function openLoginPopup() {
    setOpenPopup((openPopup) => !openPopup);
    setRegisterPopup(false);
    popupInit();
  }

  // 로그인 팝업 - ID 입력
  function handleChangeLoginId(e) {
    setLoginId(e.target.value);
  }

  // 로그인 팝업 - PW 입력
  function handleChangeLoginPw(e) {
    setLoginPw(e.target.value);
  }

  // 로그인 팝업 - 로그인 버튼
  const handleLogin = async (e) => {
    e.preventDefault();

    await fetch("http://127.0.0.1:8080/api/v1/auth/authenticate.do", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userId: loginId,
        userPw: loginPw,
      }),
      referrerPolicy: "no-referrer",
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 403) {
          console.log("토큰 만료");
        }
      })
      .then((res) => {
        if (res.token) {
          setJwtToken(res.token);
          setCookie("jwt", `${res.token}`, {
            path: "/",
            sameSite: "strict",
          });
        }
      })
      .catch((error) => {
        alert("아이디 또는 패스워드가 잘못 되었습니다.");
      });
  };

  // 회원가입 팝업 변경
  function changeRegisterPopup() {
    popupInit();
    setRegisterPopup((registerPopup) => !registerPopup);
  }

  // 회원가입 팝업 - ID 입력
  function handleChangeRegisterId(e) {
    setRegisterId(e.target.value);
  }

  // 회원가입 팝업 - Name 입력
  function handleChangeRegisterName(e) {
    setRegisterName(e.target.value);
  }

  // 회원가입 팝업 - PW 입력
  function handleChangeRegisterPw(e) {
    setRegisterPw(e.target.value);
  }

  // 회원가입 팝업 - 회원가입 동의 check box
  function handleChangeRegisterAgree(e) {
    setRegisterAgree((registerAgree) => !registerAgree);
  }

  // 회원가입 팝업 - 회원가입 버튼
  function handleRegister(e) {
    e.preventDefault();

    // 회원가입 동의하기 체크여부
    if (!registerAgree) {
      alert("좋은 말 할 때, 동의하기 체크하세요.");
      return;
    }

    location.reload();
  }

  return (
    <>
      <header className={styles.header}>
        <h2 className={styles.header_logo}>NEMGR</h2>
        <nav className={styles.header_nav}>
          <Link to="#">Home</Link>
          <Link to="#">About</Link>
          <Link to="#">Services</Link>
          <Link to="#">Contact</Link>
          <button className={styles.btn_login_popup} onClick={openLoginPopup}>
            Login
          </button>
        </nav>
      </header>

      <div
        className={
          openPopup
            ? registerPopup
              ? `${styles.header_wrapper} ${styles.active_popup} ${styles.active}`
              : `${styles.header_wrapper} ${styles.active_popup}`
            : `${styles.header_wrapper}`
        }
      >
        <span
          className={styles.header_wrapper_icon_close}
          onClick={openLoginPopup}
        >
          <IoMdClose />
        </span>

        <div className={`${styles.header_wrapper_form_box} ${styles.login}`}>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className={styles.header_input_box}>
              <span className={styles.icon}>
                <FaUser />
              </span>
              <input
                type="text"
                required
                onChange={handleChangeLoginId}
                value={loginId}
              />
              <label>ID</label>
            </div>
            <div className={styles.header_input_box}>
              <span className={styles.icon}>
                <FaLock />
              </span>
              <input
                type="password"
                required
                onChange={handleChangeLoginPw}
                value={loginPw}
              />
              <label>Password</label>
            </div>
            <div className={styles.header_wrapper_remember_forgot}>
              <label>
                {" "}
                <input type="checkbox" /> Remember me{" "}
              </label>
              <a href="#">forgot Password?</a>
            </div>
            <button type="submit" className={styles.header_wrapper_btn}>
              Login
            </button>
            <div className={styles.header_wrapper_login_register}>
              <p>
                Don't have an account?{" "}
                <Link to="#" onClick={changeRegisterPopup}>
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className={`${styles.header_wrapper_form_box} ${styles.register}`}>
          <h2>Registeration</h2>
          <form onSubmit={handleRegister}>
            <div className={styles.header_input_box}>
              <span className={styles.icon}>
                <FaUser />
              </span>
              <input
                type="text"
                required
                onChange={handleChangeRegisterId}
                value={registerId}
              />
              <label>ID</label>
            </div>
            <div className={styles.header_input_box}>
              <span className={styles.icon}>
                <FaIdCard />
              </span>
              <input
                type="text"
                required
                onChange={handleChangeRegisterName}
                value={registerName}
              />
              <label>Name</label>
            </div>
            <div className={styles.header_input_box}>
              <span className={styles.icon}>
                <FaLock />
              </span>
              <input
                type="password"
                required
                onChange={handleChangeRegisterPw}
                value={registerPw}
              />
              <label>Password</label>
            </div>
            <div className={styles.header_wrapper_remember_forgot}>
              <label>
                <input
                  type="checkbox"
                  onChange={handleChangeRegisterAgree}
                  checked={registerAgree ? "checked" : null}
                />{" "}
                I agree to the terms & conditions
              </label>
            </div>
            <button type="submit" className={styles.header_wrapper_btn}>
              Register
            </button>
            <div className={styles.header_wrapper_login_register}>
              <p>
                Already have an account?{" "}
                <Link to="#" onClick={changeRegisterPopup}>
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default MainHeader;
