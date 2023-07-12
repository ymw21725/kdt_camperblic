package com.codream.camperblic.domain.payment;

import jakarta.persistence.*;

@Entity
@Table(name = "cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cartid")
    private int cartid;

    private String userid;  // 로그인 확인 된 회원ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "itemid")
    private AllProduct allProduct;

    private int itemcount;  // 카트에 담긴 상품 개수

    @Column(name = "category_id")
    private String category_id;

    public Cart() {
        // 기본 생성자
    }

    // getter ===========================
    public int getCartid() {
        return cartid;
    }

    public String getUserid() {
        return userid;
    }

    public AllProduct getAllProduct() {
        return allProduct;
    }

    public int getItemcount() {
        return itemcount;
    }

    public String getCategory_id() {
        return category_id;
    }
    // getter ^===========================^


    public void setCartid(int cartid) {
        this.cartid = cartid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public void setAllProduct(AllProduct allProduct) {
        this.allProduct = allProduct;
    }

    public void setItemcount(int itemcount) {
        this.itemcount = itemcount;
    }

    public void setCategory_id(String category_id) {
        this.category_id = category_id;
    }
}
