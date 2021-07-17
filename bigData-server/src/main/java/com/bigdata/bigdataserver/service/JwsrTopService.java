package com.bigdata.bigdataserver.service;

import com.bigdata.bigdataserver.vo.JwsrTop;

import java.util.List;

public interface JwsrTopService {

    public void insert(JwsrTop jwsrTop);

    List<JwsrTop> searchJwsrTop();
}
