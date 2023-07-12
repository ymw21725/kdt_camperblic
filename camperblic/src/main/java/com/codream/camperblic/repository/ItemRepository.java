package com.codream.camperblic.repository;

import com.codream.camperblic.domain.community.Campstory;
import com.codream.camperblic.domain.item.*;

import java.util.List;

public interface ItemRepository {

    void saveCook(Cook cook);

    void saveEtc(Etc etc);

    void saveMat(Mat mat);

    void saveChair(Chair chair);

    void saveTent(Tent tent);

    List<Cook> findAllCook();

    List<Etc> findAllEtc();

    List<Mat> findAllMat();

    List<Chair> findAllChair();

    List<Tent> findAllTent();

    Cook findCookById(String itemId);

    Chair findChairById(String itemId);

    Mat findMatById(String itemId);

    Tent findTentById(String itemId);

    Etc findEtcById(String itemId);
}

