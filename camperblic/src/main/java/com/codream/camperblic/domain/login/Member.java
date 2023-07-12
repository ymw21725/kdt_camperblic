package com.codream.camperblic.domain.login;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Member {

    @Id
    @Column(nullable = false)
    private String userid;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String password;
    @Column(length = 15)
    private String phone;
    @Column(length = 50)
    private String email;
    @Column(nullable = false, length = 11)
    private Integer useyn;
    @Column(length = 7 , columnDefinition = "VARCHAR(7) DEFAULT ' '")   // 우편번호
    private String address1;
    @Column(length = 50 ,columnDefinition = "VARCHAR(7) DEFAULT ' '")  //도로명 주소
    private String address2;
    @Column(length = 50, columnDefinition = "VARCHAR(7) DEFAULT ' '")   //상세 주소
    private String address3;
    @Column(length = 50, columnDefinition = "VARCHAR(7) DEFAULT ' '")  // 참고 항목
    private String address4;

    @Column(name = "created_date", nullable = false)
    private String createdDate;


    public String getAddress4() {
        return address4;
    }

    public void setAddress4(String address4) {
        this.address4 = address4;
    }


    public String getUserid() {return userid;}

    public void setUserid(String userid) {this.userid = userid;}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }


    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getUseyn() {return useyn;}

    public void setUseyn(Integer useyn) {
        this.useyn = useyn;
    }

    public String getAddress1() {
        return address1;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String getAddress2() {
        return address2;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public String getAddress3() {
        return address3;
    }

    public void setAddress3(String address3) {
        this.address3 = address3;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }

    @Override
    public String toString() {
        return "Member{" +
                "userid='" + userid + '\'' +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", useyn=" + useyn +
                ", address1='" + address1 + '\'' +
                ", address2='" + address2 + '\'' +
                ", address3='" + address3 + '\'' +
                ", address4='" + address4 + '\'' +
                ", createdDate='" + createdDate + '\'' +
                '}';
    }
}