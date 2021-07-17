package com.bigdata.bigdataserver.service;


import com.bigdata.bigdataserver.vo.ChinaTotal;

import java.util.List;

/**
 * @Author: QK
 * @Date: 2021/7/8 16:42
 */
public interface ChinaTotalService {
    public void insert(ChinaTotal chinaTotal);

    //查询ChinaTotal
    List<ChinaTotal> searchChinaTotal();

}
