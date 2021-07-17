package com.bigdata.bigdataserver.service;

import com.bigdata.bigdataserver.vo.AreaTree;

import java.util.List;

public interface AreaTreeService {
    public void insert(AreaTree areaTree);

    List<AreaTree> searchAreaTree();
}
