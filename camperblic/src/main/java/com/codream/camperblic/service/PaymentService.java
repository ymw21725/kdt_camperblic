package com.codream.camperblic.service;

import com.codream.camperblic.domain.payment.Cart;
import com.codream.camperblic.domain.payment.CartDTO;
import com.codream.camperblic.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    private final CartRepository cartRepository;

    @Autowired
    public PaymentService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    // case1) List<Object> : 필드만 사용버전
    //    public List<Object> getCartItemsByUserId(String userid) {
    //        return cartRepository.findCartItemsByUserId(userid);
    //    }

    // case2) List<CartDTO> : DTO 사용버전
    public List<CartDTO> getCartItemsByUserId(String userid) {
        return cartRepository.findCartItemsByUserId(userid);
    }

    public void editItemcountByParam(int cartid, int itemcount, int flag, String userid){
        cartRepository.calcItemcount(cartid, itemcount, flag, userid);
    }

    public Cart addCart(Cart cart) { return cartRepository.save(cart); }

}
