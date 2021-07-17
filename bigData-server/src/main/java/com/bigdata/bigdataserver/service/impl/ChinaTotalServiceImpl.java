package com.bigdata.bigdataserver.service.impl;

import com.bigdata.bigdataserver.dao.ChinaTotalDao;

import com.bigdata.bigdataserver.service.ChinaTotalService;
import com.bigdata.bigdataserver.vo.ChinaTotal;
import org.springframework.stereotype.Service;


import javax.annotation.Resource;
import java.util.List;

/**
 * @Author: QK
 * @Date: 2021/7/8 17:11
 */
@Service
public class ChinaTotalServiceImpl implements ChinaTotalService {
    @Resource
    ChinaTotalDao chinaTotalDao;

    @Override
    public void insert(ChinaTotal chinaTotal) {
        chinaTotalDao.insert(chinaTotal);
    }

    @Override
    public List<ChinaTotal> searchChinaTotal() {
        return chinaTotalDao.queryChinaTotal();
    }
}
