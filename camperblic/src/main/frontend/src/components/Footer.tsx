import "../styles/footer.css";
import {Link} from "react-router-dom";
export default function Footer() {
    return (
        <footer>
            <section>
                <div className="inner">
                    <ul className="menu">
                        <li><a href="javascript:void(0)">회사소개</a></li>
                        <li><a href="javascript:void(0)">개인정보 처리방침</a></li>
                        <li><a href="javascript:void(0)">영상정보처리기기 운영관리 방침</a></li>
                        <li><a href="javascript:void(0)">홈페이지 이용약관</a></li>
                        <li><a href="javascript:void(0)">위치정보 이용약관</a></li>
                        <li><a href="javascript:void(0)">윤리경영</a></li>
                    </ul>

                    <div className="btn-group">
                        <a href="javascript:void(0)" className="btn btn--white">문의방법</a>
                        <a href="javascript:void(0)" className="btn btn--white">신규물품 입점제안</a>
                        <a href="javascript:void(0)" className="btn btn--white">사이트맵</a>
                    </div>

                    <div className="info">
                        <span>사업자등록번호 123-45-67890</span>
                        <span>(주)CAMPERBLIC.</span>
                        <span>TEL : 031) 1234-1234 / FAX : 031)1111-2222</span>
                        <span>개인정보 책임자 : 김호준</span>
                    </div>

                    <p className="copyright">
                        &copy; <span className="this-year"></span>CAMPERBLIC. Company. All Rights Reseved.
                    </p>

                </div>

            </section>
        </footer>
    )
}