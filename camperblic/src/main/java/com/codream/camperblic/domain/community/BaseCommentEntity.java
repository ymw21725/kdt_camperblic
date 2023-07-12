package com.codream.camperblic.domain.community;

import jakarta.persistence.*;

@MappedSuperclass
public class BaseCommentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private Long id;
    private Long root;
    private String name;
    @Column(insertable = false, updatable = false)
    private String createdate;
    private String content;
    private Long mention;
    private String tagname;
    @Column(name = "reply_count", insertable = false)
    private Integer reply_count;
    @Column(name = "like_count", insertable = false)
    private Integer like_count;
    @Column(name = "dislike_count", insertable = false)
    private Integer dislike_count;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRoot() {
        return root;
    }

    public void setRoot(Long root) {
        this.root = root;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCreatedate() {
        return createdate;
    }

    public void setCreatedate(String createdate) {
        this.createdate = createdate;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getMention() {
        return mention;
    }

    public void setMention(Long mention) {
        this.mention = mention;
    }

    public String getTagname() {
        return tagname;
    }

    public void setTagname(String tagname) {
        this.tagname = tagname;
    }

    public Integer getReply_count() {
        return reply_count;
    }

    public void setReply_count(Integer reply_count) {
        this.reply_count = reply_count;
    }

    public Integer getLike_count() {
        return like_count;
    }

    public void setLike_count(Integer like_count) {
        this.like_count = like_count;
    }

    public Integer getDislike_count() {
        return dislike_count;
    }

    public void setDislike_count(Integer dislike_count) {
        this.dislike_count = dislike_count;
    }
}
