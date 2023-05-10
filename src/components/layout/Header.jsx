import { Link } from "react-router-dom";
import { useState } from "react";

import { FaUser, FaLock } from "react-icons/fa";
import { IoMdClose, IoMdMail } from "react-icons/Io";

import styles from "./Header.module.css";

function MainHeader() {
  const [openPopup, setOpenPopup] = useState(false);
  const [registerPopup, setRegisterPopup] = useState(false);

  const openLoginPopup = () => {
    setOpenPopup((openPopup) => !openPopup);
    setRegisterPopup(false);
  };

  const changeRegisterPopup = () => {
    setRegisterPopup((registerPopup) => !registerPopup);
  };

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
          <form action="#">
            <div className={styles.header_input_box}>
              <span className={styles.icon}>
                <FaUser />
              </span>
              <input type="text" required />
              <label>ID</label>
            </div>
            <div className={styles.header_input_box}>
              <span className={styles.icon}>
                <FaLock />
              </span>
              <input type="password" required />
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
          <form action="#">
            <div className={styles.header_input_box}>
              <span className={styles.icon}>
                <FaUser />
              </span>
              <input type="text" required />
              <label>Username</label>
            </div>
            <div className={styles.header_input_box}>
              <span className={styles.icon}>
                <IoMdMail />
              </span>
              <input type="email" required />
              <label>Email</label>
            </div>
            <div className={styles.header_input_box}>
              <span className={styles.icon}>
                <FaLock />
              </span>
              <input type="password" required />
              <label>Password</label>
            </div>
            <div className={styles.header_wrapper_remember_forgot}>
              <label>
                <input type="checkbox" /> I agree to the terms & conditions
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
