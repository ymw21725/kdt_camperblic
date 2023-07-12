package com.codream.camperblic.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class MailService {
    private final JavaMailSender javaMailSender;
    private final Environment environment;
    private String verificationCode; // 난수 코드 저장 변수

    @Autowired
    public MailService(JavaMailSender javaMailSender, Environment environment) {
        this.javaMailSender = javaMailSender;
        this.environment = environment;
    }

    public void sendEmail(String recipientEmail, String name) throws MessagingException {
        // MimeMessage 생성
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, false, "utf-8");
        helper.setFrom(new InternetAddress(environment.getProperty("spring.mail.username"))); // 보내는 이메일 주소 설정
        helper.setTo(recipientEmail); // 수신자 이메일 주소 설정
        helper.setSubject("Camperblic 인증 메일입니다."); // 이메일 제목 설정

        // 이메일 내용 생성
        verificationCode = generateRandomCode(); // 난수 코드 생성 후 저장
        String body = createEmailContent(name, verificationCode);
        helper.setText(body, true); // 이메일 내용 설정

        // 이메일 전송
        javaMailSender.send(message);
    }

    public void sendEmailId(String recipientEmail, String userid , String name) throws MessagingException{
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, false, "utf-8");
        helper.setFrom(new InternetAddress(environment.getProperty("spring.mail.username"))); // 보내는 이메일 주소 설정
        helper.setTo(recipientEmail); // 수신자 이메일 주소 설정
        helper.setSubject("Camperblic " + name +" 님 아이디 확인 메일입니다."); // 이메일 제목 설정

        String body = createEmailContentId(name , userid);
        helper.setText(body, true); // 이메일 내용 설정

        javaMailSender.send(message);
    }

    private String generateRandomCode() {
        StringBuilder sb = new StringBuilder();

        Random random = new Random();
        for (int i = 0; i < 6; i++) {
            int randomDigit = random.nextInt(10); // 0부터 9까지의 난수 생성
            sb.append(randomDigit);
        }

        return sb.toString();
    }

    /**
     * 난수 코드를 생성하여 저장된 코드와 비교하여 일치 여부를 반환하는 메소드
     *
     * @param code 입력한 코드
     * @return 코드 일치 여부
     */
    public boolean verifyCode(String code) {
        // 입력한 코드와 저장된 코드를 비교하여 일치 여부를 반환합니다.
        return verificationCode.equals(code);
    }


    private String createEmailContent(String name, String verificationCode) {
        StringBuilder sb = new StringBuilder();
        // 인사 및 안내
        sb.append("안녕하세요, ").append(name).append("님!<br><br>");
        sb.append("아이디를 찾기 위한 인증 코드를 안내드립니다.<br><br>");
        // 본문 내용
        sb.append("<span style=\"font-size: 20px; font-weight: bold;\">인증 코드: ").append(verificationCode).append("</span><br><br>");
        sb.append("인증 코드를 입력하여 아이디 찾기를 완료해주세요.<br><br>");
        // 마무리
        sb.append("감사합니다.<br>");
        sb.append("코드림(Codream) 팀 드림");

        return sb.toString();
    }

    private String createEmailContentId(String name, String userid) {
        StringBuilder sb = new StringBuilder();
        // 인사 및 안내
        sb.append("안녕하세요, ").append(name).append("님!<br><br>");
        sb.append("아이디를 안내드립니다.<br><br>");
        // 본문 내용
        sb.append("<span style=\"font-size: 20px; font-weight: bold;\">아이디: ").append(userid).append(" 입니다.</span><br><br>");
        sb.append("아이들 입력하여 비밀번호를 찾기<br><br>");
        sb.append("링크: <a href=\"").append("http://localhost:3000/findpassword").append("\">")
                .append("http://localhost:3000/findpassword").append("</a><br><br>");

        sb.append("로그인 하기<br><br>");
        sb.append("링크: <a href=\"").append("http://localhost:3000/login").append("\">")
                .append("http://localhost:3000/login").append("</a><br><br>");
        // 마무리
        sb.append("감사합니다.<br>");
        sb.append("코드림(Codream) 팀 드림");

        return sb.toString();
    }

}