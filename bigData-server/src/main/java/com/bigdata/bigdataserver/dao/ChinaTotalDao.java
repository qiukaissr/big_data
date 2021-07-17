package com.bigdata.bigdataserver.dao;

import com.bigdata.bigdataserver.vo.ChinaTotal;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @Author: QK
 * @Date: 2021/7/8 17:35
 */
@Mapper
public interface ChinaTotalDao {
    public void insert(ChinaTotal chinaTotal);

    //查询ChinaTotal
    List<ChinaTotal> queryChinaTotal();
}
