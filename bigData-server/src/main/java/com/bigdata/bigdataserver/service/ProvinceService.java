package com.bigdata.bigdataserver.service;

import com.bigdata.bigdataserver.vo.Province;

import java.util.List;

public interface ProvinceService {
    public void insert(Province province);

    List<Province> searchProvince();
}
