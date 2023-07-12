package com.codream.camperblic.repository;

import com.codream.camperblic.domain.community.*;
import com.codream.camperblic.service.PostingService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Repository
public class JpaPostingRepository implements PostingRepository {

    private final EntityManager em;

    public JpaPostingRepository(EntityManager em) {
        this.em = em;
    }

//  findAll 메서드
    @Override
    public List<?> findPostings(String category) {
        if (category.equals("campstory")) {
            return em.createQuery("select p from Campstory p ORDER BY p.id DESC", Campstory.class)
                    .getResultList();
        } else if (category.equals("freeboard")) {
            return em.createQuery("select p from Freeboard p ORDER BY p.id DESC", Freeboard.class)
                    .getResultList();
        } else if (category.equals("gathercamper")) {
            return em.createQuery("select p from Gathercamper p ORDER BY p.id DESC", Gathercamper.class)
                    .getResultList();
        } else if (category.equals("reviewcamping")) {
            return em.createQuery("select p from Reviewcamping p ORDER BY p.id DESC", Reviewcamping.class)
                    .getResultList();
        } else {
            throw new IllegalArgumentException("Invalid category: " + category);
        }
    }

    //findById
    @Override
    public Campstory findCampPostingById(Long id) {
        return em.find(Campstory.class, id);
    }

    @Override
    public Freeboard findFreePostingById(Long id) {
        return em.find(Freeboard.class, id);
    }

    @Override
    public Gathercamper findGatherPostingById(Long id) {
        return em.find(Gathercamper.class, id);
    }

    @Override
    public Reviewcamping findReviewPostingById(Long id) {
        return em.find(Reviewcamping.class, id);
    }

    //글 등록
    @Override
    public Campstory uploadCampPosting(Campstory campstory) {
        em.persist(campstory);
        return campstory;
    }

    @Override
    public Freeboard uploadFreePosting(Freeboard freeboard) {
        em.persist(freeboard);
        return freeboard;
    }

    @Override
    public Gathercamper uploadGatherPosting(Gathercamper gathercamper) {
        em.persist(gathercamper);
        return gathercamper;
    }

    @Override
    public Reviewcamping uploadReviewPosting(Reviewcamping reviewcamping) {
        em.persist(reviewcamping);
        return reviewcamping;
    }

    // 글 수정

    public <T extends BaseEntity> T editPosting(Class<T> clazz, Long id, T camp) {
        Query query = em.createQuery("UPDATE " + clazz.getSimpleName() + " c SET c.title = :title, c.content = :content WHERE c.id = :id");
        query.setParameter("title", camp.getTitle());
        query.setParameter("content", camp.getContent());
        query.setParameter("id", id);
        int updatedCount = query.executeUpdate();

        if (updatedCount > 0) {
            return em.find(clazz, id);
        } else {
            return null;
        }
    }

    //글 삭제
    @Override
    public boolean deletePosting(String category, Long id) {
        Object entity = null;
        if (category.equals("campstory")) {
            entity = em.find(Campstory.class, id);
        } else if (category.equals("freeboard")) {
            entity = em.find(Freeboard.class, id);
        } else if (category.equals("gathercamper")) {
            entity = em.find(Gathercamper.class, id);
        } else if (category.equals("reviewcamping")) {
            entity = em.find(Reviewcamping.class, id);
        }

        if (entity != null) {
            em.remove(entity);
            return true;
        }
        return false;
    }

    //조회수 증가
    public void increaseViewCount(String category, Long id) {
        if (category.equals("campstory")) {
            Campstory campstory = em.find(Campstory.class, id);
            if (campstory != null) {
                campstory.setViews(campstory.getViews() + 1);
                em.merge(campstory);
            }
        } else if (category.equals("freeboard")) {
            Freeboard freeboard = em.find(Freeboard.class, id);
            if (freeboard != null) {
                freeboard.setViews(freeboard.getViews() + 1);
                em.merge(freeboard);
            }
        } else if (category.equals("gathercamper")) {
            Gathercamper gathercamper = em.find(Gathercamper.class, id);
            if (gathercamper != null) {
                gathercamper.setViews(gathercamper.getViews() + 1);
                em.merge(gathercamper);
            }
        } else if (category.equals("reviewcamping")) {
            Reviewcamping reviewcamping = em.find(Reviewcamping.class, id);
            if (reviewcamping != null) {
                reviewcamping.setViews(reviewcamping.getViews() + 1);
                em.merge(reviewcamping);
            }
        }
    }

    //댓글 등록
    public String uploadComment(Long postid, String category, String content, String name) {
        String entityName = getCategoryEntityName(category);
        String queryString = "INSERT INTO " + entityName + " (root, name, content, mention) VALUES (:root, :name, :content, NULL)";

        Query query = em.createQuery(queryString);
        query.setParameter("root", postid);
        query.setParameter("name", name);
        query.setParameter("content", content);

        int result = query.executeUpdate();
        if (result > 0) {
            return "댓글이 성공적으로 등록되었습니다.";
        } else {
            return "댓글 등록에 실패했습니다.";
        }
    }

    // 댓글 조회
    @Override
    public <T extends BaseCommentEntity> List<T> findComments(String category, Long id) {
        String entityName = getCategoryEntityName(category);
        String queryString = "SELECT c FROM " + entityName + " c WHERE c.root = :id AND c.mention IS NULL ORDER BY c.createdate DESC";

        TypedQuery<T> query = em.createQuery(queryString, (Class<T>) BaseCommentEntity.class);
        query.setParameter("id", id);

        List<T> resultList = query.getResultList();

        return resultList;
    }

    // 댓글 삭제
    @Override
    public String deleteReply(String category, Long id) {
        decreaseReplyCount(category, id);

        String entityName = getCategoryEntityName(category);
        String queryString = "DELETE FROM " + entityName + " c WHERE c.id = :id";

        Query query = em.createQuery(queryString);
        query.setParameter("id", id);

        int result = query.executeUpdate();
        if (result > 0) {
            return "댓글이 성공적으로 삭제되었습니다.";
        } else {
            return "댓글 삭제에 실패했습니다.";
        }
    }

    //조회수 증가
    public void decreaseReplyCount(String category, Long id) {
        BaseCommentEntity entity;

        if (category.equals("campstory")) {
            entity = em.find(Campcomments.class, id);
        } else if (category.equals("freeboard")) {
            entity = em.find(Freecomments.class, id);
        } else if (category.equals("gathercamper")) {
            entity = em.find(Gathercomments.class, id);
        } else if (category.equals("reviewcamping")) {
            entity = em.find(Reviewcomments.class, id);
        } else {
            throw new IllegalArgumentException("Invalid category: " + category);
        }

        if (entity != null) {
            Long mentionId = entity.getMention();

            if (mentionId != null) {
                String entityName = entity.getClass().getSimpleName();

                String queryString = "UPDATE " + entityName + " c SET c.reply_count = c.reply_count - 1 WHERE c.id = :mentionId";

                Query query = em.createQuery(queryString);
                query.setParameter("mentionId", mentionId);

                int updatedCount = query.executeUpdate();

                if (updatedCount == 0) {
                    throw new RuntimeException("Failed to decrease reply count.");
                }
            }
        }
    }

    // 대댓글 조회
    @Override
    public <T extends BaseCommentEntity> List<T> findReComments(String category, Long rootId, Long mention) {
        String entityName = getCategoryEntityName(category);
        String queryString = "SELECT c FROM " + entityName + " c WHERE c.root = :rootId AND c.mention = :mention ORDER BY c.createdate ASC";

        TypedQuery<T> query = em.createQuery(queryString, (Class<T>) BaseCommentEntity.class);
        query.setParameter("rootId", rootId);
        query.setParameter("mention", mention);

        List<T> resultList = query.getResultList();

        return resultList;
    }

    //대댓글 등록
    public String uploadCampReComment(Campcomments campcomments) {
        em.persist(campcomments);
        increaseReplyCount(campcomments.getMention(),campcomments.getClass().getSimpleName());
        return "대댓글이 성공적으로 등록되었습니다";
    }

    @Override
    public String uploadFreeReComment(Freecomments freecomments) {
        increaseReplyCount(freecomments.getMention(),freecomments.getClass().getSimpleName());
        em.persist(freecomments);
        return "대댓글이 성공적으로 등록되었습니다";
    }

    @Override
    public String uploadGatherReComment(Gathercomments gathercomments) {
        increaseReplyCount(gathercomments.getMention(),gathercomments.getClass().getSimpleName());
        em.persist(gathercomments);
        return "대댓글이 성공적으로 등록되었습니다";
    }

    @Override
    public String uploadReviewReComment(Reviewcomments reviewcomments) {
        increaseReplyCount(reviewcomments.getMention(),reviewcomments.getClass().getSimpleName());
        em.persist(reviewcomments);
        return "대댓글이 성공적으로 등록되었습니다";
    }


    //대댓글수 증가 로직
    @Override
    public void increaseReplyCount(Long mentionId, String entityName) {
        String category = entityName;

        String queryString = "UPDATE " + category + " c SET c.reply_count = c.reply_count + 1 WHERE c.id = :mentionId";

        Query query = em.createQuery(queryString);
        query.setParameter("mentionId", mentionId);

        int updatedCount = query.executeUpdate();

        if (updatedCount == 0) {
            throw new RuntimeException("대댓글 개수를 증가시키는 데 실패했습니다.");
        }
    }

    // 카테고리에 해당하는 엔티티 이름 반환
    private String getCategoryEntityName(String category) {
        switch (category) {
            case "campstory":
                return "Campcomments";
            case "freeboard":
                return "Freecomments";
            case "gathercamper":
                return "Gathercomments";
            case "reviewcamping":
                return "Reviewcomments";
            default:
                throw new IllegalArgumentException("유효하지 않은 카테고리입니다.");
        }
    }
}
