/**
  * Copyright 2021 bejson.com 
  */
package com.bigdata.bigdataserver.pojo;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Date;

/**
 * Auto-generated: 2021-07-08 17:23:51
 *
 * @author bejson.com (i@bejson.com)
 * @website http://www.bejson.com/java2pojo/
 */
@lombok.Data
@NoArgsConstructor
public class Data {

    private Chinatotal chinaTotal;
    private List<Chinadaylist> chinaDayList;
    private Date lastUpdateTime;
    private Date overseaLastUpdateTime;
    private List<Areatree> areaTree;

}