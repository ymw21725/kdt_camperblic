import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../../styles/loginStyles/SignUp.css';
import axios from "axios";
import {text} from "stream/consumers";

interface SignUpForm {
    userid: string,
    password: string,
    name: string,
    email: string,
    phone: string,

    [key: string]: string;
}

const SignUp = () => {
    const history = useNavigate();
    const [signUpForm, setSignUpForm] =
        useState<SignUpForm>({
            userid: '',
            password: '',
            name: '',
            email: '',
            phone: '',
        });

    const userIdRegex = /^(?!.*[<>])(?=.*\d)(?=.*[a-z])(?!.*\badmin\b)[^<>]{5,15}$/;
    const passwordRegex = /^(?!.*[<>])(?!.*\badmin\b)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    const phoneNumberRegex = /^(?!.*[<>])(?!.*\badmin\b)\d{10,11}$/;
    const emailRegex = /^(?!.*[<>])(?!.*\badmin\b)[a-zA-Z0-9]{3,}@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z]+)\.([a-zA-Z]){1,3}$/;
    const userNameRegex = /^(?!.*[<>])(?!.*\badmin\b)([a-zA-Z]+|[가-힣]+){2,15}$/;

    const [validationStates, setValidationStates] = useState({
        name: "black",
        userid: "black",
        email: "black",
        phone: "black",
        password: "black",
    });

    const validateCheck = (name: string, value: string) => {
        switch (name) {
            case 'name':
                return userNameRegex.test(value);
            case 'userid':
                return userIdRegex.test(value);
            case 'password':
                return passwordRegex.test(value);
            case 'email':
                return emailRegex.test(value);
            case 'phone':
                return phoneNumberRegex.test(value);
        }
    };

    const validateField = (
        fieldName: string,
        fieldValue: string
    ) => {
        if (!validateCheck(fieldName, fieldValue)) {
            setValidationStates(prevStates => ({
                ...prevStates,
                [fieldName]: "red"
            }));
        } else {
            setValidationStates(prevStates => ({
                ...prevStates,
                [fieldName]: "green"
            }));
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpForm({...signUpForm, [e.target.name]: e.target.value});
        validateField(e.target.name, e.target.value);
    };
    const validateForm = () => {
        const fieldsToValidate = [
            {fieldName: 'name', errorMessage: '올바른 이름 형식이 아닙니다.'},
            {fieldName: 'userid', errorMessage: '올바른 아이디 형식이 아닙니다.'},
            {fieldName: 'password', errorMessage: '올바른 비밀번호 형식이 아닙니다.'},
            {fieldName: 'email', errorMessage: '올바른 이메일 형식이 아닙니다.'},
            {fieldName: 'phone', errorMessage: '올바른 전화번호 형식이 아닙니다.'}
        ];

        for (const field of fieldsToValidate) {
            if (!validateCheck(field.fieldName, signUpForm[field.fieldName])) {
                alert(field.errorMessage);
                document.getElementById(field.fieldName)?.focus();
                return false;
            }
        }
        return true;
    };

    const handlecheckPw= () => {
        const passwordInput = document.getElementById("pw") as HTMLInputElement;
        if(passwordInput.type === "text" ){
            passwordInput.type = "password"; // 타입 변경
        }else{
            passwordInput.type = "text";
        }
    }

    const SigupBtn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // 입력값 검증
        if (!validateForm()) {
            return;
        }
        axios.post('/signup', signUpForm)
            .then((response) => {
                // 회원가입 성공 시 로그인으로 이동
                if (response.status === 200) {
                    history('/login'); // 로그인 페이지
                    alert("회원 가입 성공 ");
                }
            })
            .catch((error) => {
                console.error(error);
                if(error.response.status=== 500){
                    alert(error.response.data);
                }else if(error.response.status === 409){
                    alert(error.response.data);
                }else {
                    console.log(error);
                    // window.location.href = '/signup';
                    alert("회원 가입 실패 ");
                }
            });
    }

    return (
        <section>
            <div className={"signupMainDiv"}>
                <div className={"signupMainDivForm"}>
                    <h1>회원가입</h1>
                    <form onSubmit={SigupBtn}>
                        <table className={"signupMainForm"}>
                            <tbody>
                            <tr>
                                <td>
                                    <label htmlFor={'name'}>이름</label>
                                    <div>
                                        <input type="text" placeholder="이름을 입력하세요" id={"name"} name={"name"}
                                               onChange={handleInputChange}/>
                                    </div>
                                    <p id={"pTag"} style={{color: validationStates.name}}>"한글 또는 영어로 최소 2자이상 최대 15자 까지입니다."</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor={'id'}>아이디</label>
                                    <div>
                                        <input type="text" placeholder="아이디를 입력하세요" id={"id"} name={"userid"}
                                               onChange={handleInputChange}/>
                                    </div>
                                    <p id={"pTag"}  style={{color: validationStates.userid}}>"소문자,숫자 최소 한 번 이상 대문자 포함 가능 5자 이상 최대
                                        15자리
                                        까지입니다."</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor={'pw'}>비밀번호</label>
                                    <div className={"signUpPwDiv"}>
                                        <input type="password" placeholder="비밀번호를 입력하세요" id={"pw"} name={"password"}
                                               onChange={handleInputChange}/>
                                        <span onClick={handlecheckPw}>확인</span>
                                    </div>
                                    <p  id={"pTag"} style={{color: validationStates.password}}>"영문 대소문자,숫자,특수문자(@,$,! %,*,?,&) 하나이상
                                        포함 8자
                                        이상 20자 이하입니다."</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor={'email'}>이메일</label>
                                    <div>
                                        <input type="text" placeholder="이메일을 입력하세요" id={"email"} name={"email"}
                                               onChange={handleInputChange}/>
                                    </div>
                                    <p id={"pTag"}  style={{color: validationStates.email}}>"ex) "test@gamil.com" "영문 대소문자, 숫자 3자
                                        이상"@,
                                        이메일은 비밀번호
                                        찾기에 사용됩니다."</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor={'phone'}>휴대전화번호</label>
                                    <div>
                                        <input type="text" placeholder="휴대전화번호를 입력하세요" id={"phone"} name={"phone"}
                                               onChange={handleInputChange}/>
                                    </div>
                                    <p id={"pTag"} style={{color: validationStates.phone}}>"ex) "01011112222" 숫자만 입력해주세요 10자리 이상 최대
                                        11자리
                                        까지입니다."</p>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <button type={"submit"} className={"signupBtn"}>회원가입</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SignUp;