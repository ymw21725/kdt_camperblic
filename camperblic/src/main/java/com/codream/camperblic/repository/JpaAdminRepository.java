package com.codream.camperblic.repository;

import com.codream.camperblic.domain.community.Campstory;
import com.codream.camperblic.domain.community.Freeboard;
import com.codream.camperblic.domain.community.Gathercamper;
import com.codream.camperblic.domain.community.Reviewcamping;
import com.codream.camperblic.domain.item.*;
import com.codream.camperblic.domain.login.Member;
import com.codream.camperblic.domain.payment.Orders;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Repository
public class JpaAdminRepository implements AdminRepository {

    private final EntityManager em;

    public JpaAdminRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public List<Cook> adminFindCookFive() { // 대시보드에서 cook 5개
        return em.createQuery("SELECT c FROM Cook c ORDER BY c.current_stock ASC",Cook.class)
                .setMaxResults(5)
                .getResultList();
    }

    @Override
    public List<Etc> adminFindEtcFive() { // 대시보드에서 etc 5개
        return em.createQuery("SELECT a FROM Etc a ORDER BY a.current_stock ASC",Etc.class)
                .setMaxResults(5)
                .getResultList();
    }

    @Override
    public List<Mat> adminFindMatFive() { // 대시보드에서 mat 5개
        return em.createQuery("SELECT b FROM Mat b ORDER BY b.current_stock ASC",Mat.class)
                .setMaxResults(5)
                .getResultList();
    }

    @Override
    public List<Chair> adminFindChairFive() { // 대시보드에서 chair 5개
        return em.createQuery("SELECT d FROM Chair d ORDER BY d.current_stock ASC",Chair.class)
                .setMaxResults(5)
                .getResultList();
    }

    @Override
    public List<Tent> adminFindTentFive() { // 대시보드에서 tent 5개
        return em.createQuery("SELECT e FROM Tent e ORDER BY e.current_stock ASC",Tent.class)
                .setMaxResults(5)
                .getResultList();
    }

    @Override
    public List<Campstory> adminFindCampPostingsFive() { // 대시보드에서 캠핑이야기 5개
        return em.createQuery("SELECT c FROM Campstory c ORDER BY createdate DESC",Campstory.class)
                .setMaxResults(5)
                .getResultList();
    }

    @Override
    public List<Freeboard> adminFindFreePostingsFive() { // 대시보드에서 자유게시판 5개
        return em.createQuery("SELECT a FROM Freeboard a ORDER BY createdate DESC",Freeboard.class)
                .setMaxResults(5)
                .getResultList();
    }

    @Override
    public List<Gathercamper> adminFindGatherPostingsFive() { // 대시보드에서 캠퍼구인 5개
        return em.createQuery("SELECT g FROM Gathercamper g ORDER BY createdate DESC",Gathercamper.class)
                .setMaxResults(5)
                .getResultList();
    }

    @Override
    public List<Reviewcamping> adminFindReviewPostingsFive() { // 대시보드에서 캠핑장후기 5개
        return em.createQuery("SELECT r FROM Reviewcamping r ORDER BY createdate DESC",Reviewcamping.class)
                .setMaxResults(5)
                .getResultList();
    }

    @Override
    public List<Campstory> adminFindCampPostings() { // 관리게시판에서 캠핑이야기전체출력
        return em.createQuery("select p from Campstory p ORDER BY p.id DESC", Campstory.class)
                .getResultList();
    }

    @Override
    public List<Freeboard> adminFindFreePostings() { // 관리게시판에서 자유게시판 전체출력
        return em.createQuery("select p from Freeboard p ORDER BY p.id DESC", Freeboard.class)
                .getResultList();
    }

    @Override
    public List<Gathercamper> adminFindGatherPostings() { // 관리게시판에서 캠퍼구인 전체출력
        return em.createQuery("select p from Gathercamper p ORDER BY p.id DESC", Gathercamper.class)
                .getResultList();
    }

    @Override
    public List<Reviewcamping> adminFindReviewPostings() { // 관리게시판에서 캠핑장후기 전체출력
        return em.createQuery("select p from Reviewcamping p ORDER BY p.id DESC", Reviewcamping.class)
                .getResultList();
    }

    @Override
    public List<Member> adminMemberList() { // 회원관리에서 리스트 출력
        return em.createQuery("SELECT m FROM Member m ORDER BY m.userid ASC",Member.class)
                .getResultList();
    }

    @Override
    public List<Cook> adminCookStock() { // 재고관리에서 cook인 재고리스트출력
        return em.createQuery("SELECT c FROM Cook c ORDER BY current_stock ASC",Cook.class)
                .getResultList();
    }

    @Override
    public List<Etc> adminEtcStock() { // 재고관리에서 etc인 재고리스트출력
        return em.createQuery("SELECT e FROM Etc e ORDER BY current_stock ASC",Etc.class)
                .getResultList();
    }

    @Override
    public List<Mat> adminMatStock() { // 재고관리에서 침낭/매트 재고리스트출력
        return em.createQuery("SELECT m FROM Mat m ORDER BY current_stock ASC",Mat.class)
                .getResultList();
    }

    @Override
    public List<Chair> adminChairStock() { // 재고관리에서 테이블/의자 재고리스트 출력
        return em.createQuery("SELECT a FROM Chair a ORDER BY current_stock ASC",Chair.class)
                .getResultList();
    }

    @Override
    public List<Tent> adminTentStock() { // 재고관리에서 텐트/타프 리스트 출력
        return em.createQuery("SELECT t FROM Tent t ORDER BY current_stock ASC",Tent.class)
                .getResultList();
    }

    //텐트하는거 예시(admindashboard때문에 임시로 한것)--------------------------------
    @Override
    public List<Tent> adminTotalPriceTent() {
        return em.createQuery("SELECT SUM(o.price) as tentSum FROM Tent o", Tent.class)
                .getResultList();
    }

    @Override
    public List<Chair> adminTotalPriceChair() {
        return em.createQuery("SELECT SUM(o.price) as chairSum FROM Chair o", Chair.class)
                .getResultList();
    }

    @Override
    public List<Mat> adminTotalPriceMat() {
        return em.createQuery("SELECT SUM(o.price) as matSum FROM Mat o", Mat.class)
                .getResultList();
    }

    @Override
    public List<Cook> adminTotalPriceCook() {
        return em.createQuery("SELECT SUM(o.price) as cookSum FROM Cook o", Cook.class)
                .getResultList();
    }

    @Override
    public List<Etc> adminTotalPriceEtc() {
        return em.createQuery("SELECT SUM(o.price) as etcSum FROM Etc o", Etc.class)
                .getResultList();
    }

    //-------------------------------------------------------그래프 관련

    @Override
    public List<Object[]> graph() {
        TypedQuery<Object[]> query = em.createQuery(
                "SELECT DATE(o.orderdate) AS order_date, SUM(o.deliverycost) AS total_delivery_cost " +
                        "FROM Orders o " +
                        "WHERE o.orderstatus = '배송완료' " +
                        "GROUP BY DATE(o.orderdate) " +
                        "ORDER BY DATE(o.orderdate) ASC", Object[].class);

        return query.getResultList();
    }


    // ------------주문현황 보기 ---------------
    @Override
    public List<Orders> paymentFinish() {
        return em.createQuery("SELECT o FROM Orders o WHERE o.orderstatus = '결제완료'", Orders.class)
                .getResultList();
    }

    @Override
    public List<Orders> delivery() {
        return em.createQuery("SELECT i FROM Orders i WHERE i.orderstatus = '배송중'", Orders.class)
                .getResultList();
    }

    @Override
    public List<Orders> allFinish() {
        return em.createQuery("SELECT o FROM Orders o WHERE o.orderstatus = '배송완료'", Orders.class)
                .getResultList();
    }


    // ---------- 재고수정관련 -------------------------
    @Override
    public void adminUpdate(Object object) {
        em.persist(object);
        em.flush();
    }

    @Override
    public Tent tentstockUpdate(String userid) {
        return em.find(Tent.class,userid);
    }

    @Override
    public Chair chairstockUpdate(String userid) {
        return em.find(Chair.class,userid);
    }

    @Override
    public Mat matstockUpdate(String userid) {
        return em.find(Mat.class,userid);
    }

    @Override
    public Cook cookstockUpdate(String userid) {
        return em.find(Cook.class,userid);
    }

    @Override
    public Etc etcstockUpdate(String userid) {
        return em.find(Etc.class,userid);
    }


    //-------------- 게시판관리 검색 ------------------------
    @Override
    public List<Campstory> findbySearchCampstory(String keyword) {
        return em.createQuery("SELECT p FROM Campstory p WHERE p.title LIKE :searchText order by p.id desc", Campstory.class)
                .setParameter("searchText", "%" + keyword + "%")
                .getResultList();
    }

    @Override
    public List<Freeboard> findbySearchFreeboard(String keyword) {
        return em.createQuery("SELECT p FROM Freeboard p WHERE p.title LIKE :searchText order by p.id desc", Freeboard.class)
                .setParameter("searchText", "%" + keyword + "%")
                .getResultList();
    }

    @Override
    public List<Gathercamper> findbySearchGathercamper(String keyword) {
        return em.createQuery("SELECT p FROM Gathercamper p WHERE p.title LIKE :searchText order by p.id desc", Gathercamper.class)
                .setParameter("searchText", "%" + keyword + "%")
                .getResultList();    }

    @Override
    public List<Reviewcamping> findbySearchReview(String keyword) {
        return em.createQuery("SELECT p FROM Reviewcamping p WHERE p.title LIKE :searchText order by p.id desc", Reviewcamping.class)
                .setParameter("searchText", "%" + keyword + "%")
                .getResultList();
    }

    //-----------------------재고관리 검색
    @Override
    public List<Tent> findbySearchTent(String keyword) {
        return em.createQuery("SELECT p FROM Tent p WHERE p.name LIKE :searchText order by p.current_stock", Tent.class)
                .setParameter("searchText", "%" + keyword + "%")
                .getResultList();
    }

    @Override
    public List<Chair> findbySearchChair(String keyword) {
        return em.createQuery("SELECT p FROM Chair p WHERE p.name LIKE :searchText order by p.current_stock", Chair.class)
                .setParameter("searchText", "%" + keyword + "%")
                .getResultList();
    }

    @Override
    public List<Mat> findbySearchMat(String keyword) {
        return em.createQuery("SELECT p FROM Mat p WHERE p.name LIKE :searchText order by p.current_stock", Mat.class)
                .setParameter("searchText", "%" + keyword + "%")
                .getResultList();
    }

    @Override
    public List<Cook> findbySearchCook(String keyword) {
        return em.createQuery("SELECT p FROM Cook p WHERE p.name LIKE :searchText order by p.current_stock", Cook.class)
                .setParameter("searchText", "%" + keyword + "%")
                .getResultList();
    }

    @Override
    public List<Etc> findbySearchEtc(String keyword) {
        return em.createQuery("SELECT p FROM Etc p WHERE p.name LIKE :searchText order by p.current_stock", Etc.class)
                .setParameter("searchText", "%" + keyword + "%")
                .getResultList();
    }

    //----------------회원관리 검색

    @Override
    public List<Member> findbySearchId(String keyword) {
        return em.createQuery("SELECT p FROM Member p WHERE p.userid LIKE :searchText order by p.userid asc", Member.class)
                .setParameter("searchText", "%" + keyword + "%")
                .getResultList();
    }

    @Override
    public List<Member> findbySearchName(String keyword) {
        return em.createQuery("SELECT p FROM Member p WHERE p.name LIKE :searchText order by p.userid asc", Member.class)
                .setParameter("searchText", "%" + keyword + "%")
                .getResultList();
    }

    @Override
    public List<Member> findbySearchEmail(String keyword) {
        return em.createQuery("SELECT p FROM Member p WHERE p.email LIKE :searchText order by p.userid asc", Member.class)
                .setParameter("searchText", "%" + keyword + "%")
                .getResultList();
    }

    @Override
    public List<Member> findbySearchPhone(String keyword) {
        return em.createQuery("SELECT p FROM Member p WHERE p.phone LIKE :searchText order by p.userid asc", Member.class)
                .setParameter("searchText", "%" + keyword + "%")
                .getResultList();
    }

    @Override
    public List<Orders> findbySearchOrderId(String keyword) {
        return em.createQuery("SELECT p FROM Orders p WHERE p.orderid LIKE :searchText order by p.userid asc", Orders.class)
                .setParameter("searchText", "%" + keyword + "%")
                .getResultList();
    }

    @Override
    public List<Orders> findbySearchUserId(String keyword) {
        return em.createQuery("SELECT p FROM Orders p WHERE p.userid LIKE :searchText order by p.userid asc", Orders.class)
                .setParameter("searchText", "%" + keyword + "%")
                .getResultList();
    }


}


