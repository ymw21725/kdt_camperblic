import React, {useEffect, useState} from 'react';
import '../../styles/loginStyles/Login.css';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from "axios";

interface LoginFrom {
    userid: string,
    password: string,
}


const Login = () => {
    const history = useNavigate();
    const [loginForm, setLoginForm] = useState<LoginFrom>({
        userid: '',
        password: '',
    });

    useEffect(() => {
        if (sessionStorage.getItem("username") != null) {
            history("/");
        }
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm({...loginForm, [e.target.name]: e.target.value});
    };

    const LoginBtn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('/login', loginForm, {withCredentials: true})
            .then((response) => {
                // 로그인 성공 시 홈으로 이동
                if (response.status === 200) {
                    console.log(response.data.message);
                    const username = response.data.username;
                    const userId = response.data.userId;
                    sessionStorage.setItem("username", username);
                    sessionStorage.setItem("userId", userId);
                    window.location.href = "/";
                    alert('로그인 성공');
                }
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    console.error(error);
                    alert("사용자를 찾을 수 없습니다.");
                } else if (error.response.status === 401) {
                    alert("사용자를 찾을 수 없습니다.");
                }else if(error.response.status === 406){
                    alert("비밀번호가 일치하지 않습니다.");
                } else {
                    console.error(error.response.data);

                }
            });
    };

    // 세션에 사용자 이름이 있다면 마이페이지로 이동하는 함수
    const username = sessionStorage.getItem("username");
    const goToMyPage = () => {
        if (username) {
            history(`/mypage/${username}`); // 마이페이지 경로로 이동
        } else {
            alert("세션에 사용자 이름이 없습니다.");
        }
    };

    return (
        <section>
            <div className={"loginMainDiv"}>
                <div className={'loginFormDiv'}>
                    <h1 className={'loginH1'}>CAMPERBLIC.</h1>
                    <div className={'borderDiv'}>
                        <form onSubmit={LoginBtn}>
                            <div className={"inputMainDiv"}>
                                <input type={"text"} placeholder={"아이디"} name={"userid"} onChange={handleInputChange}/>
                                <input type={"password"} placeholder={"비밀번호"} name={"password"}
                                       onChange={handleInputChange}/>
                            </div>
                            <div>
                                <button className={'loginBtn'}>로그인</button>
                            </div>
                        </form>
                        <div className={'linkTODiv'}>
                            <Link to='/findaccount' className={'linkTo'}> 아이디 찾기 </Link>
                            <Link to='/findpassword' className={'linkTo'}>비밀번호 찾기 </Link>
                            <Link to='/signup'> 회원가입</Link>
                        </div>

                        {username && <button onClick={goToMyPage}>마이페이지</button>} {/* 세션에 사용자 이름이 있을 경우에만 버튼 표시 */}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;