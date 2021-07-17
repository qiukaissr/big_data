package com.bigdata.bigdataserver.controller;

import com.bigdata.bigdataserver.pojo.Children;
import com.bigdata.bigdataserver.service.InterfaceService;
import com.bigdata.bigdataserver.service.ProvinceService;
import com.bigdata.bigdataserver.vo.Province;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@CrossOrigin
@Controller
public class ProvinceController {

    @Autowired
    ProvinceService provinceService;

    @Autowired
    InterfaceService interfaceService;

    @RequestMapping("/getProvinceList")
    @ResponseBody
    public Province getProvince() {
        List<Children> childrenList = interfaceService.queryByProvince();
        Children children = childrenList.get(2);

        for (int i = 0; i < 34; i++) {
            Province province = new Province();
            province.setId(0);
            province.setName(children.getChildren().get(i).getName());
            province.setTodayConfirm(children.getChildren().get(i).getToday().getConfirm());
            province.setTodaySuspect(children.getChildren().get(i).getToday().getSuspect());
            province.setTodayHeal(children.getChildren().get(i).getToday().getHeal());
            province.setTodayDead(children.getChildren().get(i).getToday().getDead());
            province.setTodaySevere(children.getChildren().get(i).getToday().getSevere());
            province.setTodayStoreConfirm(children.getChildren().get(i).getToday().getStoreConfirm());
            province.setTodayInput(children.getChildren().get(i).getToday().getInput());

            province.setTotalConfirm(children.getChildren().get(i).getTotal().getConfirm());
            province.setTotalSuspect(children.getChildren().get(i).getTotal().getSuspect());
            province.setTotalHeal(children.getChildren().get(i).getTotal().getHeal());
            province.setTotalDead(children.getChildren().get(i).getTotal().getDead());
            province.setTotalSevere(children.getChildren().get(i).getTotal().getSevere());
            province.setTotalInput(children.getChildren().get(i).getTotal().getInput());

            province.setLastUpdateTime(children.getChildren().get(i).getLastUpdateTime());

            System.out.println(province);

            provinceService.insert(province);

        }

        return null;
    }

    @RequestMapping("/searchProvince")
    @ResponseBody
    public List<Province> searchProvince() {
        return provinceService.searchProvince();
    }

}
