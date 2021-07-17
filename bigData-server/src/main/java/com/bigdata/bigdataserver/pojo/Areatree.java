/**
  * Copyright 2021 bejson.com 
  */
package com.bigdata.bigdataserver.pojo;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

/**
 * Auto-generated: 2021-07-08 17:23:51
 *
 * @author bejson.com (i@bejson.com)
 * @website http://www.bejson.com/java2pojo/
 */
@Data
@NoArgsConstructor
public class Areatree {

    private Today today;
    private Total total;
    private ExtData extData;
    private String name;
    private Date lastUpdateTime;
    private List<Children> children;
}