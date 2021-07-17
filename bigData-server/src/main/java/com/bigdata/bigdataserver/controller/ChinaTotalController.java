package com.bigdata.bigdataserver.controller;


import com.bigdata.bigdataserver.pojo.Chinatotal;
import com.bigdata.bigdataserver.service.ChinaTotalService;
import com.bigdata.bigdataserver.service.InterfaceService;
import com.bigdata.bigdataserver.vo.ChinaTotal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

/**
 * @Author: QK
 * @Date: 2021/7/8 17:28
 */
@CrossOrigin
@Controller
public class ChinaTotalController {
    @Resource
    ChinaTotalService chinaTotalService;
    @Resource
    InterfaceService interfaceService;

    @RequestMapping("/getchinaTotal")
    @ResponseBody
    public ChinaTotal getChinaTotal(){
        Chinatotal china = interfaceService.queryByChinatotal();
        ChinaTotal chinaTotal = new ChinaTotal();
        chinaTotal.setId(0);
        chinaTotal.setTodayConfirm(china.getToday().getConfirm());
        chinaTotal.setTodaySuspect(china.getToday().getSuspect());
        chinaTotal.setTodayHeal(china.getToday().getHeal());
        chinaTotal.setTodayDead(china.getToday().getDead());
        chinaTotal.setTodaySevere(china.getToday().getSevere());
        chinaTotal.setTodayStoreConfirm(china.getToday().getStoreConfirm());
        chinaTotal.setTodayInput(china.getToday().getInput());
        chinaTotal.setTotalConfirm(china.getTotal().getConfirm());
        chinaTotal.setTotalSuspect(china.getTotal().getConfirm());
        chinaTotal.setTotalHeal(china.getTotal().getDead());
        chinaTotal.setTotalDead(china.getTotal().getDead());
        chinaTotal.setTotalSevere(china.getTotal().getSevere());
        chinaTotal.setTotalInput(china.getTotal().getInput());
        chinaTotal.setExtDataNoSymptom(china.getExtData().getNoSymptom());
        chinaTotal.setExtDataIncrNoSymptom(china.getExtData().getIncrNoSymptom());

        chinaTotalService.insert(chinaTotal);
        return chinaTotal;
    }

    @RequestMapping("/seachChinaTotal")
    @ResponseBody
    public List<ChinaTotal> searchChinaTotal() {
        List<ChinaTotal> chinaTotalList = chinaTotalService.searchChinaTotal();
        return chinaTotalList;
    }
}
