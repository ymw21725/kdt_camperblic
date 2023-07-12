package com.codream.camperblic.service;

import com.codream.camperblic.domain.community.Campstory;
import com.codream.camperblic.domain.community.Freeboard;
import com.codream.camperblic.domain.community.Gathercamper;
import com.codream.camperblic.domain.community.Reviewcamping;
import com.codream.camperblic.domain.item.*;
import com.codream.camperblic.domain.login.Member;
import com.codream.camperblic.domain.payment.Orders;
import com.codream.camperblic.repository.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final EntityManager entityManager;

    public AdminService(AdminRepository adminRepository,EntityManager entityManager) {
        this.adminRepository = adminRepository;
        this.entityManager = entityManager;
    }

    public List<Cook> adminfindcookfive(){
        return adminRepository.adminFindCookFive();
    }

    public List<Etc> adminfindetcfive(){
        return adminRepository.adminFindEtcFive();
    }

    public List<Mat> adminfindmatfive(){
        return adminRepository.adminFindMatFive();
    }

    public List<Chair> adminfindchairfive(){
        return adminRepository.adminFindChairFive();
    }

    public List<Tent> adminfindtentfive(){
        return adminRepository.adminFindTentFive();
    }

    public List<Campstory> adminfindcamppostingsfive(){
        return adminRepository.adminFindCampPostingsFive();
    }

    public List<Freeboard> adminfindfreepostingsfive(){
        return adminRepository.adminFindFreePostingsFive();
    }

    public List<Gathercamper> adminfindgatherpostingsfive(){
        return adminRepository.adminFindGatherPostingsFive();
    }

    public List<Reviewcamping> adminfindreviewpostingsfive(){
        return adminRepository.adminFindReviewPostingsFive();
    }

    public List<Campstory> adminfindcamppostings(){
        return adminRepository.adminFindCampPostings();
    }

    public List<Freeboard> adminfindfreepostings(){
        return adminRepository.adminFindFreePostings();
    }

    public List<Gathercamper> adminfindgatherpostings(){
        return adminRepository.adminFindGatherPostings();
    }

    public List<Reviewcamping> adminfindreviewpostings(){
        return adminRepository.adminFindReviewPostings();
    }

    public List<Member> adminmemberlist(){
        return adminRepository.adminMemberList();
    }

    public List<Cook> admincookstock(){
        return adminRepository.adminCookStock();
    }

    public List<Etc> adminetcstock(){
        return adminRepository.adminEtcStock();
    }

    public List<Mat> adminmatstock(){
        return adminRepository.adminMatStock();
    }

    public List<Chair> adminchairstock(){
        return adminRepository.adminChairStock();
    }

    public List<Tent> admintentstock(){
        return adminRepository.adminTentStock();
    }

    public List<Tent> admintotalTent() { return adminRepository.adminTotalPriceTent();} // admindashboard때문에 임시

    public List<Orders> paymentfinish(){return adminRepository.paymentFinish();} // 결제완료

    public List<Orders> delivery(){return adminRepository.delivery();} // 배송중

    public List<Orders> allfinish(){return adminRepository.allFinish();} // 배송완료

    public List<Object[]> graphservice(){return adminRepository.graph();} // 그래프

    //---------------------------------------------------재고수정관련--------------------
    public Tent updateStockByIdTent(String itemId, int currentStock) {
        String id = itemId;

        Tent item = adminRepository.tentstockUpdate(id);
        if (item != null) {
            item.setCurrentStock(currentStock);
            adminRepository.adminUpdate(item);
            return item;
        } else {
            throw new EntityNotFoundException("ID가 " + id + "인 아이템을 찾을 수 없습니다.");
        }
    }

    public Chair updateStockByIdChair(String itemId, int currentStock) {
        String id = itemId;

        Chair item = adminRepository.chairstockUpdate(id);
        if (item != null) {
            item.setCurrentStock(currentStock);
            adminRepository.adminUpdate(item);
            return item;
        } else {
            throw new EntityNotFoundException("ID가 " + id + "인 아이템을 찾을 수 없습니다.");
        }
    }

    public Mat updateStockByIdMat(String itemId, int currentStock) {
        String id = itemId;

        Mat item = adminRepository.matstockUpdate(id);
        if (item != null) {
            item.setCurrentStock(currentStock);
            adminRepository.adminUpdate(item);
            return item;
        } else {
            throw new EntityNotFoundException("ID가 " + id + "인 아이템을 찾을 수 없습니다.");
        }
    }

    public Cook updateStockByIdCook(String itemId, int currentStock) {
        String id = itemId;

        Cook item = adminRepository.cookstockUpdate(id);
        if (item != null) {
            item.setCurrentStock(currentStock);
            adminRepository.adminUpdate(item);
            return item;
        } else {
            throw new EntityNotFoundException("ID가 " + id + "인 아이템을 찾을 수 없습니다.");
        }
    }

    public Etc updateStockByIdEtc(String itemId, int currentStock) {
        String id = itemId;

        Etc item = adminRepository.etcstockUpdate(id);
        if (item != null) {
            item.setCurrentStock(currentStock);
            adminRepository.adminUpdate(item);
            return item;
        } else {
            throw new EntityNotFoundException("ID가 " + id + "인 아이템을 찾을 수 없습니다.");
        }
    }

    // 게시판에서 검색

    public List<Campstory> adminsearchCampstory(String keyword) {return adminRepository.findbySearchCampstory(keyword);}

    public List<Freeboard> adminsearchFreeboard(String keyword){return adminRepository.findbySearchFreeboard(keyword);}

    public List<Gathercamper> adminsearchGathercamper(String keyword){return adminRepository.findbySearchGathercamper(keyword);}

    public List<Reviewcamping> adminsearchReview(String keyword){return adminRepository.findbySearchReview(keyword);}

    //--------------------------재고관리검색--------------

    public List<Tent> adminsearchTent(String keyword) {
        return adminRepository.findbySearchTent(keyword);
    }

    public List<Chair> adminsearchChair(String keyword) {
        return adminRepository.findbySearchChair(keyword);
    }

    public List<Mat> adminsearchMat(String keyword) {return adminRepository.findbySearchMat(keyword);}

    public List<Cook> adminsearchCook(String keyword) {
        return adminRepository.findbySearchCook(keyword);
    }

    public List<Etc> adminsearchEtc(String keyword) {
        return adminRepository.findbySearchEtc(keyword);
    }

    // -------------- 회원관리 검색 --------------------------

    public List<Member> adminsearchId(String keyword) { return adminRepository.findbySearchId(keyword);}

    public List<Member> adminsearchName(String keyword) { return adminRepository.findbySearchName(keyword);}

    public List<Member> adminsearchEmail(String keyword) { return adminRepository.findbySearchEmail(keyword);}

    public List<Member> adminsearchPhone(String keyword) { return adminRepository.findbySearchPhone(keyword);}

    // -----------------주문현황 검색 ------------------------

    public List<Orders> adminsearchOrderId(String keyword) { return adminRepository.findbySearchOrderId(keyword);}

    public List<Orders> adminsearchUserId(String keyword) { return adminRepository.findbySearchUserId(keyword);}



}