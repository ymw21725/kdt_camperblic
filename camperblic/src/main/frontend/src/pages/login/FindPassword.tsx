import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {Member} from "../../types";
import {useNavigate} from "react-router-dom";
import "../../styles/loginStyles/FindPassword.css"
const FindPassword = () => {
    const history = useNavigate();
    const [userIdData, setUserIdData] = useState("");
    const [changePw, setChangePw] = useState("");
    const [flag, setFlag] = useState(0);
    const passwordRegex = /^(?!.*[<>])(?!.*\badmin\b)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    const [userDataPw, setUserDataPw] = useState<Member>({
        userid: "",
        name: "",
        email: "",
        phone: "",
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        createdDate: "",
    });

    const validateForm = () => {
        if (!passwordRegex.test(changePw)) {
            alert("올바른 비밀번호 형식이 아닙니다.\n" +
                "\"영문 대소문자,숫자,특수문자(@,$,! %,*,?,&) 하나이상 포함 8자 이상 20자 이하입니다.\"");
            document.getElementById("password")?.focus();
            return false;
        }
         return true;
    }

    const handleChan = ((e: React.ChangeEvent<HTMLInputElement>) => {
        setUserIdData(e.target.value);
    });
    const handlePw = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.get("/finduserid", {params: {userIdData: userIdData}})
            .then((response) => {
                setUserDataPw({...response.data});
                setFlag(1);
            })
            .catch((error) => {
                console.log(error);
                alert("아이디가 일치하지 않습니다.")
            });
    };
    const handleChangePw = ((e: React.ChangeEvent<HTMLInputElement>) => {
        setChangePw(e.target.value);
    });

    const handleChangeForm = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        axios.put("/changepw", userDataPw, {params: {changePw: changePw}})
            .then((response) => {
                alert(response.data)
            })
            .catch((error) => {
                console.log(error.response.data);

            })
    };


    return (
        <section>
            <div className={"findPwMainDiv"}>
                <div className={"findPwDiv"}>
                    <h1>CAMPERBLIC.</h1>
                    <form onSubmit={handlePw} className={"findPwFormDiv"}>
                        <div className={"findPwInputDiv"}>
                            <label htmlFor={"name"}>아이디</label>
                            <input type={"text"} id={"name"} name={"userid"} placeholder={"아이디를 입력하세요"} onChange={handleChan}/>
                        </div>
                        <button type={"submit"} className={"findPwChangeBtn"}>다음</button>
                    </form>
                    {flag == 1 &&
                      <div className={"findPwChangeInputDiv"}>
                        <label htmlFor={"password"}>비밀번호 변경</label>
                        <input type={"text"} name={"password"} placeholder={"변경할 비밀번호를 입력해주세요."}
                               onChange={handleChangePw} id={"password"}/>
                        <button className={"findPwChangeBtn"} type={"button"} onClick={handleChangeForm}>변경하기</button>
                      </div>
                    }
                </div>
            </div>
        </section>
    );
};

export default FindPassword;