/**
  * Copyright 2021 bejson.com 
  */
package com.bigdata.bigdataserver.pojo;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * Auto-generated: 2021-07-08 17:23:51
 *
 * @author bejson.com (i@bejson.com)
 * @website http://www.bejson.com/java2pojo/
 */
@Data
@NoArgsConstructor
public class Chinadaylist {

    private Date date;
    private Today today;
    private Total total;
    private String extData;
    private String lastUpdateTime;
}