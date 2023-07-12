package com.codream.camperblic.controller;

import com.codream.camperblic.S3UploadService;
import com.codream.camperblic.domain.item.*;
import com.codream.camperblic.domain.payment.AllProduct;
import com.codream.camperblic.domain.payment.Cart;
import com.codream.camperblic.service.ItemService;
import com.codream.camperblic.service.PaymentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
public class ItemController {

    private ItemService itemService;
    private final S3UploadService s3UploadService;
    private PaymentService paymentService;
    private final JwtUtil jwtUtil;

//    private final String uploadDirectory;

    @Autowired
    public ItemController(ItemService itemService, PaymentService paymentService, JwtUtil jwtUtil
                          , S3UploadService s3UploadService
            /*@Value("${upload.directory}") String uploadDirectory*/) {
        this.itemService = itemService;
        this.paymentService = paymentService;
        this.jwtUtil = jwtUtil;
        this.s3UploadService = s3UploadService;
//        this.uploadDirectory = uploadDirectory;
    }

    @PutMapping("/cart/{count}")
    public ResponseEntity<Cart> addToCart(@CookieValue(value = "token", required = false) String token,
                                          @RequestParam("categoryId") String categoryId,
                                          @PathVariable("count") int count, @RequestParam("itemId") AllProduct itemId) {
        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        try {
            String userid = jwtUtil.getUseridFromToken(token);
            Cart cart = new Cart();
            cart.setUserid(userid);
            cart.setCategory_id(categoryId);
            cart.setItemcount(count);
            cart.setAllProduct(itemId);
            Cart savedCart = paymentService.addCart(cart);
            return ResponseEntity.ok(savedCart);
        } catch (Exception e) {
            System.out.println(e.toString());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/cook")
    public List<Cook> cooks() {
        return itemService.findCooks();
    }

    @GetMapping("/etc")
    public List<Etc> etc() {
        return itemService.findEtc();
    }

    @GetMapping("/mat")
    public List<Mat> mat() {
        return itemService.findMat();
    }

    @GetMapping("/chair")
    public List<Chair> chair() {
        return itemService.findChair();
    }

    @GetMapping("/tent")
    public List<Tent> tent() {
        return itemService.findTent();
    }

    @GetMapping("/itemdetail/{categoryId}/{itemId}")
    public Object getItemDetail(@PathVariable("categoryId") String categoryId, @PathVariable("itemId") String itemId) {
        System.out.println("요청들어옴 디테일");
        Object itemDetail = null;

        if (categoryId.equals("cook")) {
            itemDetail = itemService.findCookDetail(itemId);
            System.out.println("서비스에 요청 보냈음");
        } else if (categoryId.equals("mat")) {
            itemDetail = itemService.findMatDetail(itemId);
        } else if (categoryId.equals("etc")) {
            itemDetail = itemService.findEtcDetail(itemId);
        } else if (categoryId.equals("chair")) {
            itemDetail = itemService.findChairDetail(itemId);
        } else if (categoryId.equals("tent")) {
            itemDetail = itemService.findTentDetail(itemId);
        }

        return itemDetail;
    }

    @PostMapping("/productinit/cook")
    public String handleAddProductCook(  @RequestParam("product") String productJson,
                                         @RequestParam("imagePath") MultipartFile mainImage,
                                         @RequestParam("detailPath") MultipartFile detailImage,
                                         @RequestParam("description") String description) {
        try {
            // ObjectMapper 인스턴스 생성
            ObjectMapper objectMapper = new ObjectMapper();
            // productJson은 JSON 문자열로 된 상품 객체를 의미합니다.
            // JSON 문자열을 Java 객체로 변환합니다.
            Cook cook = objectMapper.readValue(productJson, Cook.class);
            Map<String, String> imagePaths = pathImg(mainImage, detailImage);
            if(imagePaths == null){
                return "이미지 뿜!!";
            }
            String mainImagePath = imagePaths.get("mainImagePath");
            String detailImagePath = imagePaths.get("detailImagePath");
            cook.setDetailPath(detailImagePath);
            cook.setImagePath(mainImagePath);
            cook.setDescription(description);
            cook.setCategoryId("cook");
            cook.setAmount(1);
            itemService.saveCook(cook);
            return "야미~~~";
        }catch (Exception e){
            System.out.println(e.getMessage());
            return "임시";
        }
    }

    @PostMapping("/productinit/chair")
    public String handleAddProductChair(@RequestParam("product") String productJson,
                                        @RequestParam("imagePath") MultipartFile mainImage,
                                        @RequestParam("detailPath") MultipartFile detailImage,
                                        @RequestParam("description") String description){
        try {
            // ObjectMapper 인스턴스 생성
            ObjectMapper objectMapper = new ObjectMapper();
            // productJson은 JSON 문자열로 된 상품 객체를 의미합니다.
            // JSON 문자열을 Java 객체로 변환합니다.
            Chair chair = objectMapper.readValue(productJson, Chair.class);
            Map<String, String> imagePaths = pathImg(mainImage, detailImage);
            if(imagePaths == null){
                return "이미지 뿜!!";
            }
            String mainImagePath = imagePaths.get("mainImagePath");
            String detailImagePath = imagePaths.get("detailImagePath");
            chair.setDetailPath(detailImagePath);
            chair.setImagePath(mainImagePath);
            chair.setDescription(description);
            chair.setCategoryId("chair");
            chair.setAmount(1);
            itemService.saveChair(chair);
            return "야미~~~";
        }catch (Exception e){
            System.out.println(e.getMessage());
            return "임시";
        }
    }

    @PostMapping("/productinit/mat")
    public String handleAddProductMat(@RequestParam("product") String productJson,
                                      @RequestParam("imagePath") MultipartFile mainImage,
                                      @RequestParam("detailPath") MultipartFile detailImage,
                                      @RequestParam("description") String description) {
        try {
            // ObjectMapper 인스턴스 생성
            ObjectMapper objectMapper = new ObjectMapper();
            // productJson은 JSON 문자열로 된 상품 객체를 의미합니다.
            // JSON 문자열을 Java 객체로 변환합니다.
            Mat mat = objectMapper.readValue(productJson, Mat.class);
            Map<String, String> imagePaths = pathImg(mainImage, detailImage);
            if(imagePaths == null){
                return "이미지 뿜!!";
            }
            String mainImagePath = imagePaths.get("mainImagePath");
            String detailImagePath = imagePaths.get("detailImagePath");
            mat.setDetailPath(detailImagePath);
            mat.setImagePath(mainImagePath);
            mat.setDescription(description);
            mat.setCategoryId("mat");
            mat.setAmount(1);
            itemService.saveMat(mat);
            return "야미~~~";
        }catch (Exception e){
            System.out.println(e.getMessage());
            return "임시";
        }
    }

    @PostMapping("/productinit/tent")
    public String handleAddProductTent(@RequestParam("product") String productJson,
                                       @RequestParam("imagePath") MultipartFile mainImage,
                                       @RequestParam("detailPath") MultipartFile detailImage,
                                       @RequestParam("description") String description){
        try {
            // ObjectMapper 인스턴스 생성
            ObjectMapper objectMapper = new ObjectMapper();
            // productJson은 JSON 문자열로 된 상품 객체를 의미합니다.
            // JSON 문자열을 Java 객체로 변환합니다.
            Tent tent = objectMapper.readValue(productJson, Tent.class);
            Map<String, String> imagePaths = pathImg(mainImage, detailImage);
            if(imagePaths == null){
                return "이미지 뿜!!";
            }
            String mainImagePath = imagePaths.get("mainImagePath");
            String detailImagePath = imagePaths.get("detailImagePath");
            tent.setDetailPath(detailImagePath);
            tent.setImagePath(mainImagePath);
            tent.setDescription(description);
            tent.setCategoryId("tent");
            tent.setAmount(1);
            itemService.saveTent(tent);
            return "야미~~~";
        }catch (Exception e){
            System.out.println(e.getMessage());
            return "임시";
        }
    }

    @PostMapping("/productinit/etc")
    public String handleAddProductEtc(@RequestParam("product") String productJson,
                                      @RequestParam("imagePath") MultipartFile mainImage,
                                      @RequestParam("detailPath") MultipartFile detailImage,
                                      @RequestParam("description") String description){
        try {
            // ObjectMapper 인스턴스 생성
            ObjectMapper objectMapper = new ObjectMapper();
            // productJson은 JSON 문자열로 된 상품 객체를 의미합니다.
            // JSON 문자열을 Java 객체로 변환합니다.
            Etc etc = objectMapper.readValue(productJson, Etc.class);
            Map<String, String> imagePaths = pathImg(mainImage, detailImage);
            if(imagePaths == null){
                return "이미지 뿜!!";
            }
            String mainImagePath = imagePaths.get("mainImagePath");
            String detailImagePath = imagePaths.get("detailImagePath");
            etc.setDetailPath(detailImagePath);
            etc.setImagePath(mainImagePath);
            etc.setDescription(description);
            etc.setCategoryId("etc");
            etc.setAmount(1);
            itemService.saveEtc(etc);
            return "야미~~~";
        }catch (Exception e){
            System.out.println(e.getMessage());
            return "임시";
        }
    }

    public Map<String, String> pathImg (MultipartFile mainImage , MultipartFile detailImage){
        try {
            String dbmainImg = s3UploadService.saveFile(mainImage);
            String dbdetailImg = s3UploadService.saveFile(detailImage);

            // 이미지 경로를 저장할 Map 생성
            Map<String, String> imagePaths = new HashMap<>();
            imagePaths.put("mainImagePath", dbmainImg);
            imagePaths.put("detailImagePath", dbdetailImg);

            return imagePaths;
        }catch (Exception e){
            return null;
        }
    }






}



