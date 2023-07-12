package com.codream.camperblic.controller;

import com.codream.camperblic.domain.login.Member;
import com.codream.camperblic.domain.payment.Orders;
import com.codream.camperblic.service.MailService;
import com.codream.camperblic.service.MemberService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;

@CrossOrigin(origins = "http://camperblic.store", allowCredentials = "true")
@RestController
public class MemberController {

    private final MemberService memberService;
    private final JwtUtil jwtUtil;
    private PasswordEncoder passwordEncoder;

    private MailService mailService;

    @Autowired
    public MemberController(MemberService memberService, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, MailService mailService) {
        this.memberService = memberService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.mailService = mailService;
    }

    @GetMapping("/finduserid")
    public ResponseEntity<Member> finduserid(@RequestParam("userIdData") String userid) {
        try {
            Member member = memberService.findByUserId(userid)
                    .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
            return ResponseEntity.ok().body(member);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(null);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Member member, HttpServletResponse response) {
        try {
            String userid = member.getUserid();
            String userPw = member.getPassword();
            Member foundMember = memberService.findByUserId(userid)
                    .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
            // 시큐리티 버전
            if (!passwordEncoder.matches(userPw, foundMember.getPassword())) {
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("비밀번호가 일치하지 않습니다.");
            }
            // 세션에 로그인 정보 저장
//      session.setAttribute("username", foundMember.getName());
//      session.setAttribute("userid", foundMember.getUserid());
            // 유저 정보를 JSON 형태로 반환
            String jsonData = "{\"message\": \"로그인 성공\", \"userId\": \"" + foundMember.getUserid() + "\", \"username\": \"" + foundMember.getName() + "\"}";

            // JWT 토큰 생성
            String token = jwtUtil.generateToken(foundMember.getUserid(), foundMember.getName());

            // JWT 토큰을 쿠키로 설정
            Cookie tokenCookie = new Cookie("token", token);
            tokenCookie.setDomain("camperblic.store"); // 클라이언트의 도메인에 맞게 설정
            tokenCookie.setPath("/"); // 클라이언트의 경로에 맞게 설정
            tokenCookie.setHttpOnly(true);
            tokenCookie.setMaxAge(2 * 60 * 60 + 30 * 60);
            response.addCookie(tokenCookie);

            // CORS 설정
            response.setHeader("Access-Control-Allow-Origin", "http://camperblic.store");
//            response.setHeader("Access-Control-Allow-Origin", "*");
            response.setHeader("Access-Control-Allow-Credentials", "true");

            return ResponseEntity.ok(jsonData);
        } catch (IllegalArgumentException ie) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다.");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }


    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        try {
            // 세션 무효화
            request.getSession().invalidate();
            // 쿠키 제거
            Cookie[] cookies = request.getCookies();
            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    cookie.setMaxAge(0); // 쿠키를 만료시킴
                    cookie.setPath("/"); // 동일한 경로로 설정
                    cookie.setDomain("camperblic.store"); // 도메인 설정
                    cookie.setSecure(false); // Secure 속성 설정
                    response.addCookie(cookie); // 응답 헤더에 쿠키를 추가
                }
            }

            // 'Access-Control-Allow-Origin' 헤더 설정
            response.setHeader("Access-Control-Allow-Origin", "http://camperblic.store");
//            // 'Access-Control-Allow-Credentials' 헤더 설정
            response.setHeader("Access-Control-Allow-Credentials", "true");

            return ResponseEntity.ok().body("로그아웃 성공하셨습니다.");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("로그아웃 실패");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody Member member) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd/HH:mm");
        String currentDate = dateFormat.format(new Date());
        if (!memberService.findById(member.getUserid())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 존재하는 아이디입니다.");
        }
        try {
            String encodePw = passwordEncoder.encode(member.getPassword());
            member.setPassword(encodePw);
            member.setUseyn(1);
            member.setCreatedDate(currentDate);
            memberService.saveUser(member);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버에 문제가 생겼습니다." +
                    "잠시후 다시 해주세요.");
        }
    }

    @GetMapping("/mypage")
    public ResponseEntity<Map<String, Object>> findTokenUserId(@CookieValue(value = "token", required = false) String token) {
        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.LOCKED).body(null);
        }
        String userid = jwtUtil.getUseridFromToken(token);
        Optional<Member> member = memberService.findByUserId(userid);
        List<Orders> orders = memberService.findOrderList(userid);
        if (member.isPresent()) {
            Map<String, Object> response = new HashMap<>();
            response.put("member", member.get());
            response.put("orders", orders);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/addAddress")
    public ResponseEntity<Member> addAddress(@CookieValue(value = "token", required = false) String token, @RequestBody Member member) {
        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        try {
            System.out.println(member.toString());
            String userid = jwtUtil.getUseridFromToken(token);
            Optional<Member> userData = memberService.findByUserId(userid);
            if (!userData.isPresent()) {
                return ResponseEntity.notFound().build();
            } else {
                Member user = userData.get();
                user.setAddress1(member.getAddress1());
                user.setAddress2(member.getAddress2());
                user.setAddress3(member.getAddress3());
                user.setAddress4(member.getAddress4());
                memberService.upDate(user);
                System.out.println(user);
                return ResponseEntity.status(HttpStatus.OK).body(member);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/updateinfo")
    public ResponseEntity<Member> updateinfo(@CookieValue(value = "token", required = false) String token, @RequestBody Member member) {
        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.LOCKED).body(null);
        }
        try {
            System.out.println(member.toString());
            String userid = jwtUtil.getUseridFromToken(token);
            Optional<Member> userData = memberService.findByUserId(userid);
            if (!userData.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                Member user = userData.get();
                user.setName(member.getName());
                user.setEmail(member.getEmail());
                user.setPhone(member.getPhone());
                memberService.upDate(user);
                System.out.println(user.toString());
                return ResponseEntity.ok().body(user);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/changepw")
    public ResponseEntity<String> changepw(@RequestBody Member member, @RequestParam("changePw") String password) {
        try {
            // 아이디로 찾아서 이메일 비교 해야될듯!! 추가 하자 호준아
            String encodePw = passwordEncoder.encode(password);
            member.setPassword(encodePw);
            memberService.changePw(member);
            return ResponseEntity.ok().body("비밀번호 변경 성공했습니다. 로그인 해주세요");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("비밀번호 변경 실패");
        }
    }

    @PutMapping("/deletemember")
    public ResponseEntity<String> deletemember(@CookieValue(value = "token", required = false) String token,
                                               HttpServletRequest request, HttpServletResponse response) {
        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.LOCKED).body("사용자를 찾지 못했습니다. 로그인 상태를 확인해주세요.");
        }
        try {
            String userid = jwtUtil.getUseridFromToken(token);
            Optional<Member> userData = memberService.findByUserId(userid);
            if (!userData.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("사용자를 찾지 못했습니다.");
            } else {
                userData.get().setUseyn(2);
                memberService.deleteMember(userData.get());
                // 세션 무효화
                request.getSession().invalidate();

                // 쿠키 제거
                Cookie[] cookies = request.getCookies();
                if (cookies != null) {
                    for (Cookie cookie : cookies) {
                        cookie.setMaxAge(0); // 쿠키를 만료시킴
                        cookie.setPath("/"); // 동일한 경로로 설정
                        cookie.setDomain("camperblic.store"); // 도메인 설정
                        cookie.setSecure(false); // Secure 속성 설정
                        response.addCookie(cookie); // 응답 헤더에 쿠키를 추가
                    }
                }


                // 'Access-Control-Allow-Origin' 헤더 설정
                response.setHeader("Access-Control-Allow-Origin", "http://camperblic.store");
//            // 'Access-Control-Allow-Credentials' 헤더 설정
                response.setHeader("Access-Control-Allow-Credentials", "true");
                return ResponseEntity.ok().body("회원 탈퇴를 성공하셨습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/sendemail")
    public ResponseEntity<String> sendemail(@RequestParam("email") String email, @RequestParam("name") String name) {
        try {
            Optional<Member> member = memberService.findByUernNameAndEmail(name, email);
            if (!member.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("사용자를 찾을 수 없습니다.");
            }
//          .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

            mailService.sendEmail(email, name);
            return ResponseEntity.status(HttpStatus.OK).body("메일 전송을 성공하셨습니다.");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("메일 전송을 실패 했습니다.");
        }
    }

    @GetMapping("/checkcode")
    public String checkcode(@RequestParam("code") String code, @RequestParam("name") String name, @RequestParam("email") String email) {
        try {
            if(!mailService.verifyCode(code)){
                return "인증 코드가 틀렸습니다.";
            }
            Optional<Member> member = memberService.findByUernNameAndEmail(name, email);
            if (!member.isPresent()) {
                return "사용자를 찾을 수 없습니다.";
            }
            mailService.sendEmailId(email, member.get().getUserid(), name);
            return "메일로 아이디를 전송 했습니다.";
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "서버에 에러가 생겼습니다.";
        }

    }


}