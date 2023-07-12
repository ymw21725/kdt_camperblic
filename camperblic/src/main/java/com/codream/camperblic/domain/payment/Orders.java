package com.codream.camperblic.domain.payment;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Orders {

    @Id
    private String orderid;

    private String addressee;
    private String userid;
    private String address1;
    private String address2;
    private String address3;
    private String orderstatus;
    private int deliverycost;
    private LocalDateTime orderdate;


    public String getOrderid() {
        return orderid;
    }

    public void setOrderid(String orderid) {
        this.orderid = orderid;
    }

    public String getAddressee() {
        return addressee;
    }

    public void setAddressee(String addressee) {
        this.addressee = addressee;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
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

    public String getOrderstatus() {
        return orderstatus;
    }

    public void setOrderstatus(String orderstatus) {
        this.orderstatus = orderstatus;
    }

    public int getDeliverycost() {
        return deliverycost;
    }

    public void setDeliverycost(int deliverycost) {
        this.deliverycost = deliverycost;
    }

    public LocalDateTime getOrderdate() {
        return orderdate;
    }

    public void setOrderdate(LocalDateTime orderdate) {
        this.orderdate = orderdate;
    }
}