import {Link} from "react-router-dom";
import '../styles/admin.css';

export default function Admin() {

    return (
        <nav className="adminMenu" >
            <Link to="/admindashboard">대시보드</Link>
            <Link to="/adminboard">관리 게시판</Link>
            <Link to="/adminmember">회원관리</Link>
            <Link to="/adminstock">재고관리</Link>
        </nav>
    );
}