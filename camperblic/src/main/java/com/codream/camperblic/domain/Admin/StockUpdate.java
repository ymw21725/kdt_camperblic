package com.codream.camperblic.domain.Admin;

public class StockUpdate {
    private String username;
    private int currentstock;
    private String categoryid;

    public StockUpdate(String username, int currentstock, String categoryid) {
        this.username = username;
        this.currentstock = currentstock;
        this.categoryid = categoryid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getCurrentstock() {
        return currentstock;
    }

    public void setCurrentstock(int currentstock) {
        this.currentstock = currentstock;
    }

    public String getCategoryid() {
        return categoryid;
    }

    public void setCategoryid(String categoryid) {
        this.categoryid = categoryid;
    }
}