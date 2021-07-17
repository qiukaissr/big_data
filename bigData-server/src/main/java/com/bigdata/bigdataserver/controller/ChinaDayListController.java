package com.bigdata.bigdataserver.controller;

import com.bigdata.bigdataserver.pojo.Chinadaylist;
import com.bigdata.bigdataserver.service.ChinaDayListService;
import com.bigdata.bigdataserver.service.InterfaceService;
import com.bigdata.bigdataserver.vo.ChinaDayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@CrossOrigin
@Controller
public class ChinaDayListController {

    @Autowired
    ChinaDayListService chinaDayListService;

    @Autowired
    InterfaceService interfaceService;

    @RequestMapping("/getChinaDayList")
    @ResponseBody
    public ChinaDayList getChinaDayList() {
        List<Chinadaylist> chinadaylists = interfaceService.queryByChinadaylist();

        for (Chinadaylist chinadaylist : chinadaylists) {

            ChinaDayList chinaDayList = new ChinaDayList();

            chinaDayList.setId(0);
            chinaDayList.setDate(chinadaylist.getDate());
            chinaDayList.setTodayConfirm(chinadaylist.getToday().getConfirm());
            chinaDayList.setTodaySuspect(chinadaylist.getToday().getSuspect());
            chinaDayList.setTodayHeal(chinadaylist.getToday().getHeal());
            chinaDayList.setTodayDead(chinadaylist.getToday().getDead());
            chinaDayList.setTodaySevere(chinadaylist.getToday().getSevere());
            chinaDayList.setTodayStoreConfirm(chinadaylist.getToday().getStoreConfirm());
            chinaDayList.setTodayInput(chinadaylist.getToday().getInput());

            chinaDayList.setTotalConfirm(chinadaylist.getTotal().getConfirm());
            chinaDayList.setTotalSuspect(chinadaylist.getTotal().getSuspect());
            chinaDayList.setTotalHeal(chinadaylist.getTotal().getHeal());
            chinaDayList.setTotalDead(chinadaylist.getTotal().getDead());
            chinaDayList.setTotalSevere(chinadaylist.getTotal().getSevere());
            chinaDayList.setTotalInput(chinadaylist.getTotal().getInput());
            chinaDayList.setTotalStoreConfirm(chinadaylist.getTotal().getStoreconfirm());

            System.out.println(chinaDayList);

            chinaDayListService.insert(chinaDayList);
        }

        return null;
    }

    @RequestMapping("/searchChinaDayList")
    @ResponseBody
    private List<ChinaDayList> searchChinaDayList() {
        List<ChinaDayList> chinaDayLists = chinaDayListService.searchChinaDayList();
        return chinaDayLists;
    }

}
