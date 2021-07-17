package com.bigdata.bigdataserver.dao;

import com.bigdata.bigdataserver.vo.ChinaDayList;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ChinaDayListDao {

    public void insert(ChinaDayList chinaDayList);

    //查询ChinaDayList
    List<ChinaDayList> queryChinaDayList();
}
