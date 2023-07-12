import MyPageInputAdd from "./MyPageInputAdd";
import React, {useEffect, useState} from 'react';
import {Member} from "../../types";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../../styles/loginStyles/RenderUserInformation.css";
interface UserData {
    label: string;
    value: string;
}

interface ChangeInfoData {
    userid: string,
    name: string,
    email: string,
    phone: string,
    [key: string]: string;
}

const RenderUserInformation: React.FC<{ user: Member }> = ({user}) => {

    const history = useNavigate();
    // 넘어온 user 데이터에서 반복문 사용 뽑을 값들 저장
    const addressUserDatas: UserData[] = [
        {label: '우편번호', value: user.address1},
        {label: '도로명 주소', value: user.address2},
        {label: '상세 주소', value: user.address3},
        {label: '참고 항목', value: user.address4},
    ];

    // 넘어온 값들에서 라벨에 주소가 포함된 값들이 있는지 체크 없으면 true
    const hasIncompleteAddress = !addressUserDatas.some(
        (data) => data.label.includes('주소') && data.value
    );

    const phoneNumberRegex = /^(?!.*[<>])(?!.*\badmin\b)\d{10,11}$/;
    const emailRegex = /^(?!.*[<>])(?!.*\badmin\b)[a-zA-Z0-9]{3,}@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z]+)\.([a-zA-Z]){1,3}$/;
    const userNameRegex = /^(?!.*[<>])(?!.*\badmin\b)([a-zA-Z]+|[가-힣]+){2,15}$/;

    //트리거 스테이트
    const [change, setChange] = useState(false);
    const [changeRed, setChangeRed] = useState(true);

    //트리거 버튼 클릭시 이벤트 처리
    const addressChange = () => {
        document.getElementById("sample4_postcode")?.focus();
        setChange(!change);
    };
    const changeRedOnly = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setChangeRed(!changeRed);
    }

    // changeForm
    const [changeFormData, setChangeFormData] = useState<ChangeInfoData>({
        userid: "",
        name: "",
        email: "",
        phone: "",
    });

    const [userData , setUserData] = useState<ChangeInfoData>({
        userid: "",
        name: "",
        email: "",
        phone: "",
    })

    useEffect(() => {
        setChangeFormData({
            userid: user.userid,
            name: user.name,
            email: user.email,
            phone: user.phone,
        });
        setUserData({
            userid: user.userid,
            name: user.name,
            email: user.email,
            phone: user.phone,
        });
        sessionStorage.setItem("username", user.name);
    }, [user]);

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChangeFormData({...changeFormData, [e.target.name]: e.target.value});
    }
    const validateCheck = (name:string, value:string) => {
        switch (name) {
            case 'name':
                return userNameRegex.test(value);
            case 'email':
                return emailRegex.test(value);
            case 'phone':
                return phoneNumberRegex.test(value);
        }
    };

    const validateForm = () => {
        const fieldsToValidate = [
            { fieldName: 'name', errorMessage: '올바른 이름 형식이 아닙니다.\n ' +
                    '"한글 또는 영어로 최소 2자이상 최대 15자 까지입니다."' },
            { fieldName: 'email', errorMessage: '올바른 이메일 형식이 아닙니다. \n' +
                    '"ex) "test@gamil.com" "영문 대소문자, 숫자 3자 이상"@, 이메일은 비밀번호' +
                    '                                    찾기에 사용됩니다."' },
            { fieldName: 'phone', errorMessage: '올바른 전화번호 형식이 아닙니다.\n' +
                    '"ex) "01011112222" 숫자만 입력해주세요 10자리 이상 최대 11자리 까지입니다."' }
        ];

        for (const field of fieldsToValidate) {
            if (!validateCheck(field.fieldName, changeFormData[field.fieldName])) {
                alert(field.errorMessage);
                document.getElementById(field.fieldName)?.focus();
                return false;
            }
        }
        return true;
    };
    // Form submit 이벤트 처리
    const changeInfo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        axios.put("/updateinfo" ,changeFormData )
            .then((response) => {
                if(response.status === 200) {
                    alert("회원 정보 수정이 성공하셨습니다.");
                    history("/mypage");
                }
            })
            .catch((error) =>{
                if(error.response.status === 423) {
                    sessionStorage.clear();
                    alert("사용자를 찾지 못했습니다. 로그인 상태를 확인해주세요.");
                }else if(error.response.status === 404){
                    alert("사용자를 찾지 못했습니다. 아이디를 확인해 주세요.")
                }else if(error.response.status=== 500){
                    alert("서버에 문제가 있습니다. 잠시만 기다려주세요.");
                }
                console.log(error.response);
                history("/mypage")
            });
    }
    // 취소 버튼 데이터 초기화
    const retunData = () => {
        setChangeFormData(userData);
        setChangeRed(!changeRed);
    }
    const deleteid =(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        axios.put("/deletemember", userData ,{
            withCredentials: true,
        })
            .then((response) => {
                alert(response.data);
                sessionStorage.clear();
                window.location.href = '/';
            })
            .catch((error) => {
                if(error.response.status === 500){
                    alert("서버에 문제가 있습니다. 잠시만 기다려주세요.");
                }else if(error.response.status === 401){
                    alert(error.response.data);
                }else if(error.response.status === 406){
                    alert(error.response.data);
                }
                console.log(error.response);
                history("/mypage");
            });
    }

    const handlLogout = () => {
        axios
            .post("/logout", null, {
                withCredentials: true,
            })
            .then((response) => {
                alert(response.data);
                sessionStorage.clear();
                window.location.href = '/';
            })
            .catch((error) => {
                console.log(error.response.data);
                alert("로그아웃 실패");
                history("/mypage");
            });
    };


    return (
        <div className={"userInfoMainDiv"}>
            <h1>{user.name}님 회원 정보</h1>
            <form onSubmit={changeInfo} className={"userInfoForm"}>
                <table className={"userInfoTable"}>
                    <thead>
                    <tr>
                        <th>항목</th>
                        <th>정보</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        {/*회원정보 수정 버튼 클릭식 readOnly = false*/}
                        <td><label htmlFor="userId">아이디</label></td>
                        <td><input type="text" id="userId" value={changeFormData.userid} name={"userid"}
                                   readOnly/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="userName">이름</label></td>
                        <td><input type="text" id="userName" value={changeFormData.name} name={"name"}
                                   readOnly={changeRed}
                                   onChange={HandleChange}/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="userEmail">이메일</label></td>
                        <td><input type="text" id="userEmail" value={changeFormData.email} name={"email"}
                                   readOnly={changeRed}
                                   onChange={HandleChange}/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="userPhone">전화번호</label></td>
                        <td><input type="text" id="userPhone" value={changeFormData.phone} name={"phone"}
                                   readOnly={changeRed}
                                   onChange={HandleChange}/></td>
                    </tr>
                    <tr>
                        <td>가입 날짜</td>
                        <td>{user.createdDate}</td>
                    </tr>
                    </tbody>
                </table>
                {!changeRed &&
                    <div>
                        <button type={"submit"}>저장하기</button>
                        <button type={"button"} onClick={retunData}>취소</button>
                    </div>
                }

            </form>
            <div className={"userInfoBtn"}>
                <button type={"button"} onClick={changeRedOnly}>회원정보 수정</button>
                <button type={"button"} onClick={deleteid}>회원탈퇴</button>
                <button onClick={handlLogout}>로그아웃</button>
            </div>


            <table className={"userInfoAddTable"}>
                <colgroup>
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '80%' }} />
                </colgroup>
                <thead>
                <tr>
                    <th>주소</th>
                    <th>정보</th>
                </tr>
                </thead>
                <tbody>
                {addressUserDatas.map(({label, value}) => (
                    <React.Fragment key={label}>
                        <tr>
                            <td>{label}</td>
                            <td>{value}</td>
                        </tr>
                    </React.Fragment>
                ))}


                </tbody>
            </table>
            <button className={"changeAdd"} onClick={addressChange}>주소 정보 수정</button>

            <div>
                {(hasIncompleteAddress || change) && <MyPageInputAdd setChange={setChange}/>}
            </div>
        </div>
    );
};

export default RenderUserInformation;