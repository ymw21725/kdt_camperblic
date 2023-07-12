package com.codream.camperblic.repository;

import com.codream.camperblic.domain.login.Member;
import com.codream.camperblic.domain.payment.Orders;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository {

    Optional<Member> findByUserId(String userid);
    Optional<Member> findByUserName(String name);

    Optional<Member> findByUernNameAndEmail(String name, String email);
    List<Orders> findOrderList(String userid);

    void save(Member member);

    void changepw(Member member);

    boolean findById(String userid);
    Optional<Member> update(Member member);

}