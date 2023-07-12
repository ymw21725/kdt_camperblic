package com.codream.camperblic.service;

import com.codream.camperblic.domain.community.*;
import com.codream.camperblic.repository.JpaPostingRepository;
import com.codream.camperblic.repository.PostingRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class PostingService {

    private final PostingRepository postingRepository;

    public PostingService(PostingRepository postingRepository) {
        this.postingRepository = postingRepository;
    }

    // find list
    public List<?> findPostings(String category) {
        return postingRepository.findPostings(category);
    }

    // find detail
    public Campstory findCampPostingDetail(Long id) {
        return postingRepository.findCampPostingById(id);
    }

    public Freeboard findFreePostingDetail(Long id) {
        return postingRepository.findFreePostingById(id);
    }

    public Gathercamper findGatherPostingDetail(Long id) {
        return postingRepository.findGatherPostingById(id);
    }

    public Reviewcamping findReviewPostingDetail(Long id) {
        return postingRepository.findReviewPostingById(id);
    }

    // 글 등록
    public Long uploadCampPosting(Campstory campstory) {
        return postingRepository.uploadCampPosting(campstory).getId();
    }

    public Long uploadFreePosting(Freeboard freeboard) {
        return postingRepository.uploadFreePosting(freeboard).getId();
    }

    public Long uploadGatherPosting(Gathercamper gathercamper) {
        return postingRepository.uploadGatherPosting(gathercamper).getId();
    }

    public Long uploadReviewPosting(Reviewcamping reviewcamping) {
        return postingRepository.uploadReviewPosting(reviewcamping).getId();
    }

    //글 수정

    public Campstory editCampPosting(Long id, Campstory campstory) {
        return postingRepository.editPosting(Campstory.class, id, campstory);
    }

    public Freeboard editFreePosting(Long id, Freeboard freeboard) {
        return postingRepository.editPosting(Freeboard.class, id, freeboard);
    }

    public Gathercamper editGatherPosting(Long id, Gathercamper gathercamper) {
        return postingRepository.editPosting(Gathercamper.class, id, gathercamper);
    }

    public Reviewcamping editReviewPosting(Long id, Reviewcamping reviewcamping) {
        return postingRepository.editPosting(Reviewcamping.class, id, reviewcamping);
    }

    // 게시글 삭제
    public boolean deletePosting(String category, Long id) {
        postingRepository.deletePosting(category, id);
        return true;
    }

    // 조회수 증가
    public boolean increaseViews(String category, Long id) {
        postingRepository.increaseViewCount(category, id);
        return true;
    }

    //댓글 등록
    public String uploadComment(Long postid, String category, String content, String name) {
        return postingRepository.uploadComment(postid, category, content, name);
    }

    //댓글 조회
    public <T extends BaseCommentEntity> List<T> findComments(String category, Long id) {
        return postingRepository.findComments(category, id);
    }

    //댓글 삭제
    public String deleteReply(String category, Long id) {

        return postingRepository.deleteReply(category, id);
    }

    //대댓글 조회
    public <T extends BaseCommentEntity> List<T> findReComments(String category, Long rootId, Long mention) {
        return postingRepository.findReComments(category, rootId, mention);
    }

    public String uploadCampReComment(Campcomments campcomments) {
        return postingRepository.uploadCampReComment(campcomments);
    }

    public String uploadFreeReComment(Freecomments freecomments) {
        return postingRepository.uploadFreeReComment(freecomments);
    }

    public String uploadGatherReComment(Gathercomments gathercomments) {
        return postingRepository.uploadGatherReComment(gathercomments);
    }

    public String uploadReviewReComment(Reviewcomments reviewcomments) {
        return postingRepository.uploadReviewReComment(reviewcomments);
    }
}
