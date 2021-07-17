package com.bigdata.bigdataserver.service.impl;

import com.bigdata.bigdataserver.dao.ProvinceDao;
import com.bigdata.bigdataserver.service.ProvinceService;
import com.bigdata.bigdataserver.vo.Province;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProvinceServiceImpl implements ProvinceService {

    @Autowired
    ProvinceDao provinceDao;

    @Override
    public void insert(Province province) {
        provinceDao.insert(province);
    }

    @Override
    public List<Province> searchProvince() {
        return provinceDao.queryProvince();
    }
}
