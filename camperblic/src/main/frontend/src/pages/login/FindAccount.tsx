import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/loginStyles/FindAccount.css';

interface findEmail {
    name: string;
    email: string;
    code: string;
}

const FindAccount = () => {
    const [userFindEmailData, setuserFindEmailData] = useState<findEmail>({
        name: '',
        email: '',
        code: '',
    });

    const history = useNavigate();
    const [flag, setFlag] = useState(0);
    const [check, setCheck] = useState(false);
    const [isEmailSending, setIsEmailSending] = useState(false); // 이메일 전송 중 여부를 저장하는 상태 추가

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setuserFindEmailData({ ...userFindEmailData, [e.target.name]: e.target.value });
    };

    const handleChangeForm = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsEmailSending(true); // 이메일 전송 중으로 설정
        axios
            .get('/sendemail', { params: userFindEmailData })
            .then((response) => {
                if (response.status === 200) {
                    alert(response.data);
                    setFlag(1);
                    setCheck(true);
                    setIsEmailSending(false);
                }
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    alert('사용자를 찾지 못했습니다. 입력하신 정보를 확인해주세요.');
                } else if (error.response.status === 406) {
                    alert(error.response.data);
                } else if (error.response.status === 500) {
                    alert('서버에 문제가 있습니다. 잠시만 기다려주세요.');
                } else {
                    alert(error.response.data);
                }
                console.log(error);
                setIsEmailSending(false);
            });
    };

    const handlCheckCode = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        axios
            .get('/checkcode', { params: userFindEmailData })
            .then((response) => {
                alert(response.data);
            })
            .catch((error) => {
                alert(error.response.data);
                history('/findaccount');
            });
    };

    return (
        <section>
            <div className={"findAccountMainDiv"}>
                <div className="findAccountFormDiv">
                    <h1 className="findAccountH1">CAMPERBLIC</h1>
                    <h3 className="findAccountH3">아이디 찾기</h3>
                    <div className="findAccountInputDiv">
                        <label htmlFor="userName">이름</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="이름을 입력해주세요."
                            id="username"
                            onChange={handleInputChange}
                        />
                        <label htmlFor="userEmail">이메일</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="이메일을 입력해주세요."
                            id="userEmail"
                            onChange={handleInputChange}
                        />
                        {!check ? (
                            <button id="sendEmailBtn" onClick={handleChangeForm} disabled={isEmailSending}>
                                {isEmailSending ? '전송중...' : '이메일 인증코드 받기'}
                            </button>
                        ) : (
                            <div className={"reSendEmail"}>
                                <span>메일을 못받으셨으면 재전송버튼을 눌러주세요</span>
                                <button id="sendEmailBtn" onClick={handleChangeForm} disabled={isEmailSending}>
                                    {isEmailSending ? '전송중...' : '재전송 하기'}
                                </button>
                            </div>
                        )}
                    </div>
                    {flag === 1 && (
                        <div className="codeVerificationDiv">
                            <h3 className="codeVerificationH3">인증 코드</h3>
                            <br />
                            <input
                                type="text"
                                placeholder="인증 코드 6자리를 입력해주세요."
                                onChange={handleInputChange}
                                name="code"
                            />
                            <button onClick={handlCheckCode}>코드 인증</button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FindAccount;
