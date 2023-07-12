package com.codream.camperblic.controller;

import com.codream.camperblic.domain.community.*;
import com.codream.camperblic.service.PostingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MainController {
    private final PostingService postingService;

    @Autowired
    public MainController(PostingService postingService) {
        this.postingService = postingService;
    }

    // 게시글 리스트 조회
    @GetMapping("/findboardlist")
    public List<?> getPostings(@RequestParam ("category") String category) {
        return postingService.findPostings(category);
    }

    //게시글 조회
    @GetMapping("/boarddetail/{category}/{id}")
    public Object getPostingDetail(@PathVariable("category") String category, @PathVariable("id") Long id) {
        if (category.equals("campstory")) {
            return postingService.findCampPostingDetail(id);
        } else if (category.equals("freeboard")) {
            return postingService.findFreePostingDetail(id);
        } else if (category.equals("gathercamper")) {
            return postingService.findGatherPostingDetail(id);
        } else if (category.equals("reviewcamping")) {
            return postingService.findReviewPostingDetail(id);
        } else {
            throw new IllegalArgumentException("Invalid category: " + category);
        }
    }

    //게시글 등록
    @PostMapping("/write/campstory")
    public Long boardPosting(@RequestBody Campstory campstory) {
        return postingService.uploadCampPosting(campstory);
    }

    @PostMapping("/write/freeboard")
    public Long boardPosting(@RequestBody Freeboard freeboard) {
        return postingService.uploadFreePosting(freeboard);
    }

    @PostMapping("/write/gathercamper")
    public Long boardPosting(@RequestBody Gathercamper gathercamper) {
        return postingService.uploadGatherPosting(gathercamper);
    }

    @PostMapping("/write/reviewcamping")
    public Long boardPosting(@RequestBody Reviewcamping reviewcamping) {
        return postingService.uploadReviewPosting(reviewcamping);
    }

    //게시글 수정
    @PutMapping("/edit/campstory")
    public String editCampstoryPosting(@RequestBody Campstory posting, @RequestParam("id") Long id) {
        postingService.editCampPosting(id, posting);
        return "게시글이 성공적으로 수정되었습니다.";
    }

    @PutMapping("/edit/freeboard")
    public String editFreeboardPosting(@RequestBody Freeboard posting, @RequestParam("id") Long id) {
        postingService.editFreePosting(id, posting);
        return "게시글이 성공적으로 수정되었습니다.";
    }

    @PutMapping("/edit/gathercamper")
    public String editGathercamperPosting(@RequestBody Gathercamper posting, @RequestParam("id") Long id) {
        postingService.editGatherPosting(id, posting);
        return "게시글이 성공적으로 수정되었습니다.";
    }

    @PutMapping("/edit/reviewcamping")
    public String editReviewcampingPosting(@RequestBody Reviewcamping posting, @RequestParam("id") Long id) {
        postingService.editReviewPosting(id, posting);
        return "게시글이 성공적으로 수정되었습니다.";
    }

    //게시글 삭제
    @DeleteMapping("/delete-posting")
    public String deletePosting(@RequestParam("category") String category,
                                @RequestParam("id") Long id) {
        postingService.deletePosting(category, id);
        return "게시글이 성공적으로 삭제되었습니다.";
    }

    //조회수 증가
    @PutMapping("/increase-view")
    public ResponseEntity<String> increaseViewCount(@RequestParam("category") String category,
                                                    @RequestParam("id") Long id) {
        System.out.println("category = " + category);
        postingService.increaseViews(category, id);
        return ResponseEntity.ok("View count increased successfully");
    }

    //댓글 등록
    @PostMapping("/add-comment")
    public String CommentPosting(@RequestParam Long postid,
                               @RequestParam String category,
                               @RequestParam String content,
                               @RequestParam String name) {
        return postingService.uploadComment(postid, category, content, name);
    }

    //댓글 조회
    @GetMapping("get-comments")
    public <T extends BaseCommentEntity> List<T> getComments(@RequestParam("category") String category,
                                                             @RequestParam("id") Long id) {
        return postingService.findComments(category, id);
    }

    //댓글 삭제
    @DeleteMapping("/delete-replies")
    public String deleteReplies(@RequestParam("category") String category,
                                @RequestParam("id") Long id) {
        return postingService.deleteReply(category, id);
    }


    //대댓글 조회
    @GetMapping("/re-reply")
    public <T extends BaseCommentEntity> List<T> getReplyComments(@RequestParam("category") String category,
                                                                  @RequestParam("root") Long rootId,
                                                                  @RequestParam("mention") Long mention) {

        return postingService.findReComments(category, rootId, mention);
    }


    //대댓글 등록
    @PostMapping("/add-recomment/campstory")
    public String ReCommentPosting(@RequestBody Campcomments campcomments) {
        postingService.uploadCampReComment(campcomments);
        return "성공";
    }
    @PostMapping("/add-recomment/freeboard")
    public String ReCommentPosting(@RequestBody Freecomments freecomments) {
        postingService.uploadFreeReComment(freecomments);
        return "성공";
    }
    @PostMapping("/add-recomment/gathercamper")
    public String ReCommentPosting(@RequestBody Gathercomments gathercomments) {
        postingService.uploadGatherReComment(gathercomments);
        return "성공";
    }
    @PostMapping("/add-recomment/reviewcamping")
    public String ReCommentPosting(@RequestBody Reviewcomments reviewcomments) {
        postingService.uploadReviewReComment(reviewcomments);
        return "성공";
    }

}