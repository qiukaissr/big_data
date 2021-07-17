package com.bigdata.bigdataserver.controller;

import com.bigdata.bigdataserver.pojo.Jwsrtop;
import com.bigdata.bigdataserver.service.InterfaceService;
import com.bigdata.bigdataserver.service.JwsrTopService;
import com.bigdata.bigdataserver.vo.JwsrTop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@CrossOrigin
@Controller
public class JwsrTopController {

    @Autowired
    JwsrTopService jwsrTopService;

    @Autowired
    InterfaceService interfaceService;

    @RequestMapping("/getTop")
    @ResponseBody
    public JwsrTop getTop() {
        List<Jwsrtop> jwsrtopList = interfaceService.queryByJwsrtop();
        for (Jwsrtop jwsrtop : jwsrtopList) {
            JwsrTop jwsrTop = new JwsrTop();

            jwsrTop.setId(0);
            jwsrTop.setName(jwsrtop.getName());
            jwsrTop.setJwsrNum(jwsrtop.getJwsrNum());
            jwsrTop.setEname(jwsrtop.getEname());

            System.out.println(jwsrTop);

            jwsrTopService.insert(jwsrTop);
        }
        return null;
    }

    @RequestMapping("/searchJwsrTop")
    @ResponseBody
    public List<JwsrTop> searchJwsrTop() {
        return jwsrTopService.searchJwsrTop();
    }

}
