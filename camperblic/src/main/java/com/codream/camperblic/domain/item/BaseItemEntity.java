package com.codream.camperblic.domain.item;

import jakarta.persistence.*;

@MappedSuperclass
public class BaseItemEntity {


    @Id
    private String item_id;
    private String name;
    private Integer price;
    private String description;
    private String category_id;
    private String image_path;
//    @Column(insertable = false)
    private Integer amount;
    private Integer current_stock;
    private  String detail_path;

    public String getItemId() {
        return item_id;
    }

    public void setItemId(String item_id) {
        this.item_id = item_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategoryId() {
        return category_id;
    }

    public void setCategoryId(String category_id) {
        this.category_id = category_id;
    }

    public String getImagePath() {
        return image_path;
    }

    public void setImagePath(String image_path) {
        this.image_path = image_path;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Integer getCurrentStock() {
        return current_stock;
    }

    public void setCurrentStock(Integer current_stock) {
        this.current_stock = current_stock;
    }

    public String getDetailPath() {
        return detail_path;
    }

    public void setDetailPath(String detail_path) {
        this.detail_path = detail_path;
    }
}