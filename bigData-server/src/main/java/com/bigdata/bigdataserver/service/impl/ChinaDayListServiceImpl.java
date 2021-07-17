package com.bigdata.bigdataserver.service.impl;

import com.bigdata.bigdataserver.dao.ChinaDayListDao;
import com.bigdata.bigdataserver.service.ChinaDayListService;
import com.bigdata.bigdataserver.vo.ChinaDayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChinaDayListServiceImpl implements ChinaDayListService {

    @Autowired
    ChinaDayListDao chinaDayListDao;

    @Override
    public void insert(ChinaDayList chinaDayList) {
        chinaDayListDao.insert(chinaDayList);
    }

    @Override
    public List<ChinaDayList> searchChinaDayList() {
        return chinaDayListDao.queryChinaDayList();
    }
}
