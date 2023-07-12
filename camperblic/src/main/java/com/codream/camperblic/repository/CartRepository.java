package com.codream.camperblic.repository;

import com.codream.camperblic.domain.payment.Cart;
import com.codream.camperblic.domain.payment.CartDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {

//    @Query("SELECT ap.image_path, ap.name, c.itemcount, ap.price FROM Cart c JOIN c.allProduct ap WHERE c.userid = :userid")
//    List<Object> findCartItemsByUserId(@Param("userid") String userid);

    @Query("SELECT new com.codream.camperblic.domain.payment.CartDTO(c.cartid, ap.image_path, ap.name, c.itemcount, ap.price) FROM Cart c JOIN c.allProduct ap WHERE c.userid = :userid")
    List<CartDTO> findCartItemsByUserId(@Param("userid") String userid);

    @Modifying
    @jakarta.transaction.Transactional
    @Query("update Cart c SET c.itemcount = :calculationResult where c.cartid = :cartid and c.userid = :userid")
    void updateCartItemcount(@Param("cartid") int cartid, @Param("calculationResult") int calculationResult, @Param("userid") String userid);

    default void calcItemcount(@Param("cartid") int cartid, @Param("itemcount") int itemcount, @Param("flag") int flag, @Param("userid") String userid){
        System.out.println("jpa 로직 진입");
        // 계산 로직을 구현하여 calculationResult 값을 계산
        int calculationResult = itemcount + flag;
        System.out.println("calculationResult 출력체크=>" +  calculationResult);

        // updateCartItemcount 메서드를 호출하여 업데이트 수행
        updateCartItemcount(cartid, calculationResult, userid);
        System.out.println("jpa 로직 종료");
    }

    Cart save(Cart cart);
}
