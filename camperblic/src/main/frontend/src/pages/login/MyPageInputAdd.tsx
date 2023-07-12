import React, {useEffect, useState} from 'react';
import "../../styles/loginStyles/MyPageInputAdd.css"
import axios from "axios";
import {useNavigate} from "react-router-dom";

interface AddressData {
    zonecode: string;
    roadAddress: string;
    jibunAddress: string;
    bname: string;
    apartment: string;
    buildingName: string;
    autoRoadAddress: string;
    autoJibunAddress: string;
}

interface  AddressForm{
    address1: string;
    address2: string;
    address3: string;
    address4: string;
}
interface MyPageInputAddProps {
    setChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyPageInputAdd:React.FC<MyPageInputAddProps> = ({setChange}) => {
    const history = useNavigate ();
    const [userAddress , setUserAdderss] = useState<AddressForm>({
        address1 :"",
        address2 :"",
        address3 :"",
        address4 :"",

    });

    const handlePostcodeSearch = () => {
        new (window as any).daum.Postcode({
            oncomplete: (data: AddressData) => {
                const roadAddr = data.roadAddress;
                const extraRoadAddr = /[동|로|가]$/g.test(data.bname) ? data.bname : '';
                const buildingName = data.buildingName;
                let extraAddress = '';

                if (buildingName !== '' && data.apartment === 'Y') {
                    extraAddress = extraRoadAddr !== '' ? `, ${buildingName}` : buildingName;
                }

                if (extraAddress !== '') {
                    extraAddress = ` (${extraAddress})`;
                }

                (document.getElementById('sample4_postcode') as HTMLInputElement).value = data.zonecode;
                (document.getElementById('sample4_roadAddress') as HTMLInputElement).value = roadAddr;
                (document.getElementById('sample4_jibunAddress') as HTMLInputElement).value = data.jibunAddress;
                (document.getElementById('sample4_extraAddress') as HTMLInputElement).value = extraAddress;

                setUserAdderss({
                    ...userAddress,
                    address1 : data.zonecode,
                    address2 : roadAddr,
                    address4 : extraAddress,
                });

                const guideTextBox = document.getElementById('guide');
                if (data.autoRoadAddress) {
                    const expRoadAddr = `${data.autoRoadAddress}${extraAddress}`;
                    guideTextBox!.innerHTML = `(예상 도로명 주소: ${expRoadAddr})`;
                    guideTextBox!.style.display = 'block';
                } else if (data.autoJibunAddress) {
                    const expJibunAddr = data.autoJibunAddress;
                    guideTextBox!.innerHTML = `(예상 지번 주소: ${expJibunAddr})`;
                    guideTextBox!.style.display = 'block';
                } else {
                    guideTextBox!.innerHTML = '';
                    guideTextBox!.style.display = 'none';
                }
            },
        }).open();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserAdderss({ ...userAddress, [e.target.name]: e.target.value });
    };

    const handlChange = () => {
        setChange(false);
    }

    const handleSubmit =  (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        axios.put("/addAddress" , userAddress)
            .then((response) => {
                if (response.status === 200) {
                    window.location.href = '/mypage';// 성공시 마이페이지
                    alert("정보 수정 성공 ");
                }
            })
            .catch((error) => {
                if(error.response.status === 401){
                    alert("사용자를 찾지 못했습니다. 로그인 상태를 확인해주세요.")
                }else if(error.response.status === 500){
                    alert("서버에 문제가 있습니다. 잠시만 기다려주세요.");
                }
                console.log(error.response);
                window.location.href = '/mypage';

            });

    }

    useEffect(() => {
        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <form className={"addMainForm"} >
            <h1>주소 추가</h1>
            <table className={"addMainTable"}>
                <colgroup>
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '70%' }} />
                    <col style={{ width: '15%' }} />
                </colgroup>
                <tbody>
                <tr className={"addMainTableTr"}>
                    <th>우편번호</th>
                    <td>
                        <input type="text" id={"sample4_postcode"} name={"address1"} placeholder="우편번호" onChange={handleInputChange} readOnly />
                    </td>
                    <td>
                        <button type="button" onClick={handlePostcodeSearch}>우편번호 찾기</button>
                    </td>
                </tr>
                <tr>
                    <th>도로명 주소</th>
                    <td colSpan={2}>
                        <input type="text" id={"sample4_roadAddress"} name={"address2"} placeholder="도로명주소"  onChange={handleInputChange } readOnly/>
                    </td>
                </tr>
                <tr className={"jibunAddress"} >
                    <th>지번 주소</th>
                    <td colSpan={2}>
                        <input type="text" id="sample4_jibunAddress" placeholder="지번주소" readOnly/>
                    </td>
                </tr>
                <tr style={{ color: '#999', display: 'none' }}>
                    <th></th>
                    <td>
                        <span id="guide" style={{ color: '#999', display: 'none' }}></span>
                    </td>
                </tr>
                <tr>
                    <th>상세 주소</th>
                    <td colSpan={2}>
                        <input type="text" id={"sample4_detailAddress"} name={"address3"} placeholder="상세주소" onChange={handleInputChange}/>
                    </td>
                </tr>
                <tr>
                    <th>참고 항목</th>
                    <td colSpan={2}>
                        <input type="text" id={"sample4_extraAddress"} name={"address4"} placeholder="참고항목" onChange={handleInputChange} readOnly/>
                    </td>
                </tr>
                </tbody>
            </table>
            <button type="submit" onClick={handleSubmit} className={"addMainFormBtn"}>저장</button>
            <button type={"button"} onClick={handlChange}>취소</button>
        </form>
    );
};

export default MyPageInputAdd;
