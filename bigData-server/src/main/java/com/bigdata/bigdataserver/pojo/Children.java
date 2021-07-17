package com.bigdata.bigdataserver.pojo;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
public class Children {
    private Today today;
    private Total total;
    private String name;
    private Date lastUpdateTime;
    private List<Children> children;
}
