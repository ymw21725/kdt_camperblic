package com.codream.camperblic.service;

import com.codream.camperblic.domain.login.Member;
import com.codream.camperblic.domain.payment.Orders;
import com.codream.camperblic.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {this.memberRepository = memberRepository;}
    public Optional<Member> findByUserId(String userid) {return memberRepository.findByUserId(userid);}
    public Optional<Member> findByUserName(String name) {return memberRepository.findByUserName(name);}

    public Optional<Member> findByUernNameAndEmail(String name, String email) { return memberRepository.findByUernNameAndEmail(name, email);}
    public List<Orders> findOrderList(String userid) {return memberRepository.findOrderList(userid);}
    public Optional<Member> upDate(Member member) {return memberRepository.update(member);}

    public void  changePw(Member member) {memberRepository.changepw(member);}
    public void saveUser(Member member) {  memberRepository.save(member);}
    public void deleteMember(Member member) {memberRepository.save(member);}

    public boolean findById(String userid) { return memberRepository.findById(userid); }
}