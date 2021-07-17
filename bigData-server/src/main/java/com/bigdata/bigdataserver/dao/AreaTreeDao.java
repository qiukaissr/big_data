package com.bigdata.bigdataserver.dao;

import com.bigdata.bigdataserver.vo.AreaTree;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AreaTreeDao {
    public void insert(AreaTree areaTree);

    //AreaTree查询
    List<AreaTree> queryAreaTree();
}
