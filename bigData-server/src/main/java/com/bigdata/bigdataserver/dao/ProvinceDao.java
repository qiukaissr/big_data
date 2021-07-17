package com.bigdata.bigdataserver.dao;

import com.bigdata.bigdataserver.vo.Province;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProvinceDao {
    public void insert(Province province);

    //Province查询
    List<Province> queryProvince();
}