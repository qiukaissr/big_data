package com.bigdata.bigdataserver.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.JSONPath;

import com.bigdata.bigdataserver.pojo.*;
import com.bigdata.bigdataserver.service.InterfaceService;
import com.bigdata.bigdataserver.vo.ChinaTotal;
import com.bigdata.bigdataserver.vo.Province;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import javax.xml.ws.spi.http.HttpHandler;
import java.util.List;

/**
 * @Author: QK
 * @Date: 2021/7/8 17:17
 */
@Service
public class InterfaceServiceImpl implements InterfaceService {
    @Resource
    RestTemplate restTemplate;

    @Override
    public Chinatotal queryByChinatotal() {
        String jsonString = this.getJSONString();
        Integer code = (Integer) JSONPath.read(jsonString,"$.code");
        if(code == 10000){
            JSONObject chinatotalJO = (JSONObject)JSONPath.read(jsonString,"$.data.chinaTotal");
            Chinatotal chinatotal = JSON.parseObject(chinatotalJO.toString(), Chinatotal.class);
            return chinatotal;
        }
        return null;
    }

    @Override
    public List<Chinadaylist> queryByChinadaylist() {
        String jsonString = this.getJSONString();
        Integer code = (Integer) JSONPath.read(jsonString,"$.code");
        if(code == 10000){
            JSONArray chinadayListJA = (JSONArray) JSONPath.read(jsonString,"$.data.chinaDayList");
            List<Chinadaylist> chinadaylists = JSON.parseArray(chinadayListJA.toString(), Chinadaylist.class);
            return chinadaylists;
        }
        return null;
    }

    @Override
    public List<Areatree> queryByAreatree() {
        String jsonString = this.getJSONString();
        Integer code = (Integer) JSONPath.read(jsonString,"$.code");
        if(code == 10000){
            JSONArray areatreeListJA = (JSONArray) JSONPath.read(jsonString,"$.data.areaTree");
            List<Areatree> areatreelists = JSON.parseArray(areatreeListJA.toString(), Areatree.class);
            return areatreelists;
        }
        return null;
    }

    @Override
    public List<Children> queryByProvince() {
        String jsonString = this.getJSONString();
        Integer code = (Integer) JSONPath.read(jsonString,"$.code");
        if(code == 10000){
            JSONArray provinceListJA = (JSONArray) JSONPath.read(jsonString,"$.data.areaTree");
            List<Children> childrenList = JSON.parseArray(provinceListJA.toString(), Children.class);
            return childrenList;
        }
        return null;
    }

    @Override
    public List<Jwsrtop> queryByJwsrtop() {
        String jsonString = this.getJSONString2();
        JSONArray jwsrtopListJA = (JSONArray) JSONPath.read(jsonString,"$.data.jwsrTop");
        List<Jwsrtop> jwsrtopList = JSON.parseArray(jwsrtopListJA.toString(), Jwsrtop.class);
        return jwsrtopList;
    }

    private String getJSONString(){
        HttpHeaders headers = new HttpHeaders();
        headers.add("User-Agent","Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        HttpEntity <Resource> httpEntity =new HttpEntity<>(headers);
        String url ="https://c.m.163.com/ug/api/wuhan/app/data/list-total";
        String jsonString =restTemplate.exchange(url, HttpMethod.GET,httpEntity,String.class).getBody();
        return jsonString;
    }

    private String getJSONString2(){
        HttpHeaders headers = new HttpHeaders();
        headers.add("User-Agent","Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        HttpEntity <Resource> httpEntity =new HttpEntity<>(headers);
        String url ="https://interface.sina.cn/news/wap/fymap2020_data.d.json";
        String jsonString =restTemplate.exchange(url, HttpMethod.GET,httpEntity,String.class).getBody();
        return jsonString;
    }
}
