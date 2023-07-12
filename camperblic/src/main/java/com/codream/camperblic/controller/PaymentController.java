package com.codream.camperblic.controller;

import com.codream.camperblic.domain.payment.CartDTO;
import com.codream.camperblic.service.PaymentService;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class PaymentController {

    private final PaymentService paymentService;
    private final JwtUtil jwtUtil;
    @Autowired
    public PaymentController(PaymentService paymentService, JwtUtil jwtUtil) {
        this.paymentService = paymentService;
        this.jwtUtil = jwtUtil;
    }

    // case1) List<Object> : 필드만 사용버전
//    @GetMapping("/cart")
//    public ResponseEntity<List<Object>> getCartListByUserId(@CookieValue(value = "token", required = false)
//                                                                 String token) {
//        if (!jwtUtil.validateToken(token)) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
//        }
//        String userid = jwtUtil.getUseridFromToken(token);
//
//        List<Object> cartList = paymentService.getCartItemsByUserId(userid);
//
//        if (!cartList.isEmpty()) {
//            return ResponseEntity.ok(cartList);
//        } else {
////            String errorMessage = "장바구니에 담긴 내역이 없습니다.";
//            return ResponseEntity.notFound().build();
//        }
//    }

    // case2) List<CartDTO> : DTO 사용버전
    @GetMapping("/cart")
    public ResponseEntity<List<CartDTO>> getCartListByUserId(@CookieValue(value = "token", required = false)
                                                             String token) {
        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.LOCKED).body(null);
        }
        String userid = jwtUtil.getUseridFromToken(token);

        List<CartDTO> cartList = paymentService.getCartItemsByUserId(userid);

        if (!cartList.isEmpty()) {
            return ResponseEntity.ok(cartList);
        } else {
//            String errorMessage = "장바구니에 담긴 내역이 없습니다.";
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/cart")
    public ResponseEntity<?> putItemcountByUserID(@CookieValue(value = "token", required = false) String token,
                                                  @RequestParam("cartid") int cartid,
                                                  @RequestParam("itemcount") int itemcount,
                                                  @RequestParam("flag") int flag
    ) {
        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.LOCKED).body(null);
        }
        String userid = jwtUtil.getUseridFromToken(token);

        try {
            // cartid, itemcount, flag 값을 사용하여 필요한 작업 수행
            paymentService.editItemcountByParam(cartid, itemcount, flag, userid);

            // 요청 처리가 성공적으로 완료되었을 경우 응답 생성
            return ResponseEntity.ok("Success");
        } catch (Exception e) {
            // 요청 처리 중 오류 발생 시 예외 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    }


}
