package com.codream.camperblic.domain.payment;

import jakarta.persistence.*;

@Entity
@Table(name = "allproduct")
public class AllProduct {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String itemid;
    private String name;
    private Integer price;
    private String description;
    private String category_id;
    private String image_path;
    private Integer amount;
    private Integer current_stock;

    public AllProduct() {
        // 기본 생성자
    }

    // getter ===========================
    public String getItemid() {
        return itemid;
    }

    public String getName() {
        return name;
    }

    public Integer getPrice() {
        return price;
    }

    public String getDescription() {
        return description;
    }

    public String getCategory_id() {
        return category_id;
    }

    public String getImage_path() {
        return image_path;
    }

    public Integer getAmount() {
        return amount;
    }

    public Integer getCurrent_stock() {
        return current_stock;
    }
    // getter ^===========================^
}
