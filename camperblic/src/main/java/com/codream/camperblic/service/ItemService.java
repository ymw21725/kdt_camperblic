package com.codream.camperblic.service;

import com.codream.camperblic.domain.item.*;
import com.codream.camperblic.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {
    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public void saveCook(Cook cook) {
        try {
            itemRepository.saveCook(cook);
            System.out.println("서비스단 성공");
        } catch (Exception e) {
            System.out.println("서비스단 오류");
        }
    }

    public void saveEtc(Etc etc) {
        itemRepository.saveEtc(etc);
    }

    public void saveMat(Mat mat) {
        itemRepository.saveMat(mat);
    }

    public void saveChair(Chair chair) {
        itemRepository.saveChair(chair);
    }

    public void saveTent(Tent tent) {
        itemRepository.saveTent(tent);
    }

    public List<Cook> findCooks() {
        return itemRepository.findAllCook();
    }

    public List<Etc> findEtc() {
        return itemRepository.findAllEtc();
    }

    public List<Mat> findMat() {
        return itemRepository.findAllMat();
    }

    public List<Chair> findChair() {
        return itemRepository.findAllChair();
    }

    public List<Tent> findTent() {
        return itemRepository.findAllTent();
    }

    public Cook findCookDetail(String itemId) {
        return itemRepository.findCookById(itemId);
    }

    public Chair findChairDetail(String itemId) {
        return itemRepository.findChairById(itemId);
    }

    public Mat findMatDetail(String itemId) {
        return itemRepository.findMatById(itemId);
    }

    public Tent findTentDetail(String itemId) {
        return itemRepository.findTentById(itemId);
    }

    public Etc findEtcDetail(String itemId) {
        return itemRepository.findEtcById(itemId);
    }

    public void addItem(String categoryId, Object item) {
        if (categoryId.equals("cook") && item instanceof Cook) {
            Cook cook = (Cook) item;
            itemRepository.saveCook(cook);
        } else if (categoryId.equals("etc") && item instanceof Etc) {
            Etc etc = (Etc) item;
            itemRepository.saveEtc(etc);
        } else if (categoryId.equals("mat") && item instanceof Mat) {
            Mat mat = (Mat) item;
            itemRepository.saveMat(mat);
        } else if (categoryId.equals("chair") && item instanceof Chair) {
            Chair chair = (Chair) item;
            itemRepository.saveChair(chair);
        } else if (categoryId.equals("tent") && item instanceof Tent) {
            Tent tent = (Tent) item;
            itemRepository.saveTent(tent);
        } else {
            // 예외 처리 또는 오류 처리
        }
    }
}