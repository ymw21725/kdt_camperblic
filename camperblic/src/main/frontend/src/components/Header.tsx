import { Link } from "react-router-dom";
import "../styles/header.css";
import {useEffect, useState} from "react";
import Admin from "./Admin";

const Header = () => {
    const [isMall, setIsMall] = useState<boolean>(true);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isName , setIsName] = useState<boolean>(true);
    const sessionUserName = sessionStorage.getItem("username");
    const [username, setUserName] = useState("");
    const handleOfIsMall = () => {
        setIsMall((p) => !p);
    };

    const getMallCommuRight = () => {
        return isMall ? 0 : "-50%";
    };


    useEffect(() => {
        if (sessionUserName != null && sessionUserName.length >= 0) {
            setUserName(sessionUserName);
            setIsName(false);
        } else {
            setIsName(true);
        }
        if (sessionUserName === "admin") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [sessionUserName]);


    return (
        <header>
            <div className="justDeco top"></div>

            <aside className="asideTop">
                <h1 className="headerLogo">
                    <Link to="/">CAMPERBLIC.</Link>
                </h1>
                {isName ?
                    <button className="headerBtn"><Link to="/login">로그인</Link></button>
                    :
                    <div>
                        <h3>{username} 님</h3>
                        <button className="headerBtn"><Link to="/mypage">마이페이지</Link></button>
                    </div>
                }

                <div className="mallCommuContainer" onClick={handleOfIsMall}>
                    <div className="mallCommuBtnDeco">지금 여기는~</div>
                    <div className="mallCommu" style={{ right: getMallCommuRight() }}>
                        <button className="headerMallCommuBtn">커뮤니티</button>
                        <button className="headerMallCommuBtn">쇼핑</button>
                    </div>
                </div>


                <nav className="totalMenu">
                    <Link to="/cart">장바구니</Link>
                </nav>

                <nav className="mall" style={{ display: isMall ? "block" : "none" }}>
                    <Link to="/itemall">전체상품</Link>
                    <Link to="/tent">텐트/타프</Link>
                    <Link to="/chair">테이블/체어</Link>
                    <Link to="/mat">침낭/매트</Link>
                    <Link to="/cook">취사용품</Link>
                    <Link to="/etc">소품</Link>
                </nav>

                <nav className="community" style={{ display: isMall ? "none" : "block" }}>
                    {/*<Link to="/community">대시보드</Link>*/}
                    <Link to="/campstory">캠핑 이야기</Link>
                    <Link to="/freeboard">자유 게시판</Link>
                    <Link to="/gathercamper">캠퍼 구인</Link>
                    <Link to="/reviewcamping">캠핑장 후기</Link>
                </nav>

                {isAdmin && <Admin/>}

            </aside>

            <aside className="asideBottom">
                <a href="https://www.facebook.com" target="_blank">
                    <img className='header_img1' src="./icon_headerimg/facebook_icon.png" alt="Facebook" />
                </a>
                <a href="https://www.twitter.com" target="_blank">
                    <img className='header_img2' src="./icon_headerimg/twittwe_icon.png" alt="Twitter" />
                </a>
                <a href="https://www.instagram.com" target="_blank">
                    <img className='header_img3' src="./icon_headerimg/insta_icon.png" alt="Instagram" />
                </a>
                <a href="https://www.google.com" target="_blank">
                    <img className='header_img4' src="./icon_headerimg/google_icon.png" alt="Google" />
                </a>
            </aside>

            <div className="justDeco bottom"></div>
            <div className="right"></div>
        </header>
    );
}

export default Header;