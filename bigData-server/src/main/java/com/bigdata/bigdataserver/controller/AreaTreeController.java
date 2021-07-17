package com.bigdata.bigdataserver.controller;

import com.bigdata.bigdataserver.pojo.Areatree;
import com.bigdata.bigdataserver.pojo.Chinadaylist;
import com.bigdata.bigdataserver.service.AreaTreeService;
import com.bigdata.bigdataserver.service.InterfaceService;
import com.bigdata.bigdataserver.vo.AreaTree;
import com.bigdata.bigdataserver.vo.ChinaDayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@CrossOrigin
@Controller
public class AreaTreeController {

    @Autowired
    AreaTreeService areaTreeService;

    @Autowired
    InterfaceService interfaceService;

    @RequestMapping("/getAreaTree")
    @ResponseBody
    public AreaTree getChinaDayList() {
        List<Areatree> areatrees = interfaceService.queryByAreatree();

        for (Areatree areatree : areatrees) {

            AreaTree areaTree = new AreaTree();

            areaTree.setId(0);
            areaTree.setName(areatree.getName());
            areaTree.setTodayConfirm(areatree.getToday().getConfirm());
            areaTree.setTodaySuspect(areatree.getToday().getSuspect());
            areaTree.setTodayHeal(areatree.getToday().getHeal());
            areaTree.setTodayDead(areatree.getToday().getDead());
            areaTree.setTodaySevere(areatree.getToday().getSevere());
            areaTree.setTodayStoreConfirm(areatree.getToday().getStoreConfirm());
            areaTree.setTodayInput(areatree.getToday().getInput());

            areaTree.setTotalConfirm(areatree.getTotal().getConfirm());
            areaTree.setTotalSuspect(areatree.getTotal().getSuspect());
            areaTree.setTotalHeal(areatree.getTotal().getHeal());
            areaTree.setTotalDead(areatree.getTotal().getDead());
            areaTree.setTotalSevere(areatree.getTotal().getSevere());
            areaTree.setTotalInput(areatree.getTotal().getInput());

            areaTree.setExtDataNoSymptom(areatree.getExtData().getNoSymptom());
            areaTree.setExtDataIncrNoSymptom(areatree.getExtData().getIncrNoSymptom());

            areaTree.setLastUpdateTime(areatree.getLastUpdateTime());

            System.out.println(areatree);

            areaTreeService.insert(areaTree);
        }

        return null;
    }

    @RequestMapping("/searchAreaTree")
    @ResponseBody
    public List<AreaTree> searchAreaTree() {
        return areaTreeService.searchAreaTree();
    }
}
