package com.codream.camperblic.domain.payment;

public class CartDTO {

    private int cartid;
    private String image_path;
    private String name;
    private int itemcount;
    private int price;

    public CartDTO(int cartid, String image_path, String name, int itemcount, int price) {
        this.cartid = cartid;
        this.image_path = image_path;
        this.name = name;
        this.itemcount = itemcount;
        this.price = price;
    }

    public int getCartid() {
        return cartid;
    }

    public void setCartid(int cartid) {
        this.cartid = cartid;
    }

    public String getImage_path() {
        return image_path;
    }

    public void setImage_path(String image_path) {
        this.image_path = image_path;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getItemcount() {
        return itemcount;
    }

    public void setItemcount(int itemcount) {
        this.itemcount = itemcount;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}
