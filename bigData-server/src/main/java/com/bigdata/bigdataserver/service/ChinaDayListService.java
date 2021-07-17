package com.bigdata.bigdataserver.service;

import com.bigdata.bigdataserver.vo.ChinaDayList;

import java.util.List;

public interface ChinaDayListService {

    public void insert(ChinaDayList chinaDayList);

    List<ChinaDayList> searchChinaDayList();

}
