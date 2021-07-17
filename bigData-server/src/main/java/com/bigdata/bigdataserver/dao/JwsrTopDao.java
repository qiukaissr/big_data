package com.bigdata.bigdataserver.dao;

import com.bigdata.bigdataserver.vo.JwsrTop;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface JwsrTopDao {

    public void insert(JwsrTop jwsrTop);

    List<JwsrTop> queryJwsrTop();
}
