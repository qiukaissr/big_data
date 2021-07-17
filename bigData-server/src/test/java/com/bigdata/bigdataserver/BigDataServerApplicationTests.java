package com.bigdata.bigdataserver;

import com.bigdata.bigdataserver.dao.ChinaDayListDao;
import com.bigdata.bigdataserver.dao.ChinaTotalDao;
import com.bigdata.bigdataserver.vo.ChinaDayList;
import com.bigdata.bigdataserver.vo.ChinaTotal;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class BigDataServerApplicationTests {


    @Autowired
    ChinaTotalDao chinaTotalDao;

    @Autowired
    ChinaDayListDao chinaDayListDao;

    @Test
    public void testDao() {
        List<ChinaDayList> chinaDayLists = chinaDayListDao.queryChinaDayList();
        System.out.println(chinaDayLists);
    }

}
