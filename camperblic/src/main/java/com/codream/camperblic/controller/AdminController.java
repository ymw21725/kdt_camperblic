package com.codream.camperblic.controller;


import com.codream.camperblic.domain.community.Campstory;
import com.codream.camperblic.domain.community.Freeboard;
import com.codream.camperblic.domain.community.Gathercamper;
import com.codream.camperblic.domain.community.Reviewcamping;
import com.codream.camperblic.domain.item.*;
import com.codream.camperblic.domain.login.Member;
import com.codream.camperblic.domain.payment.Orders;
import com.codream.camperblic.service.AdminService;
import com.codream.camperblic.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AdminController {

    private AdminService adminService;
    private JwtUtil jwtUtil;
    private MemberService memberService;

    @Autowired
    public AdminController(AdminService adminService,JwtUtil jwtUtil,MemberService memberService) {
        this.adminService = adminService;
        this.jwtUtil = jwtUtil;
        this.memberService = memberService;
    }

    @GetMapping("/admindashboard/admindashboardstockcook")
    public List<Cook> admincookFive(){
        return adminService.adminfindcookfive();
    }

    @GetMapping("/admindashboard/admindashboardstocktent")
    public List<Tent> admintentFive(){
        return adminService.adminfindtentfive();
    }

    @GetMapping("/admindashboard/admindashboardstockchair")
    public List<Chair> adminchairFive(){
        return adminService.adminfindchairfive();
    }

    @GetMapping("/admindashboard/admindashboardstockmat")
    public List<Mat> adminmatFive(){
        return adminService.adminfindmatfive();
    }

    @GetMapping("/admindashboard/admindashboardstocketc")
    public List<Etc> adminetcFive(){
        return adminService.adminfindetcfive();
    }

    @GetMapping("/admindashboard/admindashboardboardcampstory")
    public List<Campstory> admincampFive(){ return adminService.adminfindcamppostingsfive(); }

    @GetMapping("/admindashboard/admindashboardboardfreeboard")
    public List<Freeboard> adminFreeFive(){ return adminService.adminfindfreepostingsfive(); }

    @GetMapping("/admindashboard/admindashboardboardgathercamper")
    public List<Gathercamper> adminGatherFive(){ return adminService.adminfindgatherpostingsfive();}

    @GetMapping("/admindashboard/admindashboardboardreview")
    public List<Reviewcamping> adminReviewFive(){ return adminService.adminfindreviewpostingsfive();}

    @GetMapping("/adminboard/adminboardcampstory")
    public List<Campstory> admincampList() { return adminService.adminfindcamppostings();}

    @GetMapping("/adminboard/adminboardfreeboard")
    public List<Freeboard> adminfreeList() { return adminService.adminfindfreepostings();}

    @GetMapping("/adminboard/adminboardgathercamper")
    public List<Gathercamper> adminfgatherList() { return adminService.adminfindgatherpostings();}

    @GetMapping("/adminboard/adminboardreview")
    public List<Reviewcamping> adminreviewList() { return adminService.adminfindreviewpostings();}

    @GetMapping("/adminstock/tent")
    public List<Tent> admintentList() {return adminService.admintentstock();}

    @GetMapping("/adminstock/chair")
    public List<Chair> adminchairList() { return adminService.adminchairstock();}

    @GetMapping("/adminstock/mat")
    public List<Mat> adminmatList() {return adminService.adminmatstock();}

    @GetMapping("/adminstock/cook")
    public List<Cook> admincookList() { return adminService.admincookstock();}

    @GetMapping("/adminstock/etc")
    public List<Etc> adminetcList() { return adminService.adminetcstock();}

    @GetMapping("/adminmember")
    public List<Member> adminmemberList() { return adminService.adminmemberlist();}

    @GetMapping("/admindashboard")
    public List<Tent> adminTotalTent() { return  adminService.admintotalTent();}

    @GetMapping("/admindashboard/admindashboardchart")
    public List<Object[]> getAdminDashboardData() {
        return adminService.graphservice();
    }

    @GetMapping("/admindashboard/orderpayment")
    public List<Orders> adminorderPayment(){return adminService.paymentfinish();}

    @GetMapping("/admindashboard/orderdelivery")
    public List<Orders> adminorderDelivery() {return adminService.delivery();}

    @GetMapping("/admindashboard/orderallfinish")
    public List<Orders> adminorderAllfinish() {return adminService.allfinish();}

    @PutMapping("/adminstock/currentstock")
    public Object getstockData(@RequestParam("itemId") String itemId,
                               @RequestParam("categoryId") String categoryId,
                               @RequestParam("currentStock") int currentStock){
        System.out.println(itemId);
        Object tmp = null;

        if(categoryId.equals("tent")){
            tmp = adminService.updateStockByIdTent(itemId,currentStock);
        } else if(categoryId.equals("chair")){
            tmp = adminService.updateStockByIdChair(itemId,currentStock);
        } else if(categoryId.equals("mat")){
            tmp = adminService.updateStockByIdMat(itemId,currentStock);
        } else if(categoryId.equals("cook")){
            tmp = adminService.updateStockByIdCook(itemId,currentStock);
        } else if(categoryId.equals("etc")){
            tmp = adminService.updateStockByIdEtc(itemId,currentStock);
        }

        return tmp;
    }


    @GetMapping("/adminboard/search/{searchCategory}")
    public Object searchPostings(@PathVariable("searchCategory") String searchCategory, @RequestParam("searchText") String searchText) {
        // 검색어를 이용하여 게시물 검색 로직 구현
        Object tmp = null;
        if (searchCategory.equals("campstory"))
            tmp = adminService.adminsearchCampstory(searchText);
        else if (searchCategory.equals("freeboard"))
            tmp = adminService.adminsearchFreeboard(searchText);
        else if (searchCategory.equals("gathercamper"))
            tmp = adminService.adminsearchGathercamper(searchText);
        else if (searchCategory.equals("reviewcamping"))
            tmp = adminService.adminsearchReview(searchText);

        return tmp;
    }

    //------------------------------재고관리 검색----------
    @GetMapping("/adminstock/search/{searchCategory}")
    public Object searchstockItems(@PathVariable("searchCategory") String searchCategory, @RequestParam("searchText") String searchText) {
        // 검색어를 이용하여 게시물 검색 로직 구현
        Object tmp = null;
        if (searchCategory.equals("tent"))
            tmp = adminService.adminsearchTent(searchText);
        else if (searchCategory.equals("chair"))
            tmp = adminService.adminsearchChair(searchText);
        else if (searchCategory.equals("mat"))
            tmp = adminService.adminsearchMat(searchText);
        else if (searchCategory.equals("cook"))
            tmp = adminService.adminsearchCook(searchText);
        else if (searchCategory.equals("etc"))
            tmp = adminService.adminsearchEtc(searchText);

        return tmp;
    }

    //----------------------------회원관리검색--------------
    @GetMapping("/adminmember/search/{searchCategory}")
    public Object searchMember(@PathVariable("searchCategory") String searchCategory, @RequestParam("searchText") String searchText) {
        // 검색어를 이용하여 게시물 검색 로직 구현
        Object tmp = null;
        if (searchCategory.equals("idSearch"))
            tmp = adminService.adminsearchId(searchText);
        else if (searchCategory.equals("nameSearch"))
            tmp = adminService.adminsearchName(searchText);
        else if (searchCategory.equals("emailSearch"))
            tmp = adminService.adminsearchEmail(searchText);
        else if (searchCategory.equals("phoneSearch"))
            tmp = adminService.adminsearchPhone(searchText);

        return tmp;
    }

    // ---------------------주문현황 검색
    @GetMapping("/admindashboard/order/search/{searchCategory}")
    public Object searchOrders(@PathVariable("searchCategory") String searchCategory, @RequestParam("searchText") String searchText) {
        // 검색어를 이용하여 게시물 검색 로직 구현
        Object tmp = null;
        if (searchCategory.equals("orderid"))
            tmp = adminService.adminsearchOrderId(searchText);
        else if (searchCategory.equals("userid"))
            tmp = adminService.adminsearchUserId(searchText);

        return tmp;
    }


}