package com.codream.camperblic.repository;

import com.codream.camperblic.domain.community.*;

import java.util.List;

public interface PostingRepository {

    //findAll
    List<?> findPostings(String category);


    //findById
    Campstory findCampPostingById(Long id);

    Freeboard findFreePostingById(Long id);

    Gathercamper findGatherPostingById(Long id);

    Reviewcamping findReviewPostingById(Long id);


    //uploadPosting
    Campstory uploadCampPosting(Campstory campstory);

    Freeboard uploadFreePosting(Freeboard freeboard);

    Gathercamper uploadGatherPosting(Gathercamper gathercamper);

    Reviewcamping uploadReviewPosting(Reviewcamping reviewcamping);

    //글 수정
    <T extends BaseEntity> T editPosting(Class<T> clazz, Long id, T posting);

    //글 삭제
    boolean deletePosting(String category, Long id);

    //조회수 증가
    public void increaseViewCount(String category, Long id);

    //댓글 등록
    String uploadComment(Long postid, String category, String content, String name);

    //댓글 조회
    <T extends BaseCommentEntity> List<T> findComments(String category, Long id);

    //댓글 삭제
    String deleteReply(String category, Long id);

    //답글수 감소
    void decreaseReplyCount(String category, Long id);

    // 대댓 조회
    <T extends BaseCommentEntity> List<T> findReComments(String category, Long rootId, Long mention);


    // 대댓 등록
    String uploadCampReComment(Campcomments campcomments);
    String uploadFreeReComment(Freecomments freecomments);
    String uploadGatherReComment(Gathercomments gathercomments);
    String uploadReviewReComment(Reviewcomments reviewcomments);

    // 댓글 수 증가
    void increaseReplyCount(Long mentionId, String entityName);
}
