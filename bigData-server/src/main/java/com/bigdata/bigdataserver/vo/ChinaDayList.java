package com.bigdata.bigdataserver.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class ChinaDayList {

    private Integer id;
    private Date date;
    private Integer todayConfirm;
    private Integer todaySuspect;
    private Integer todayHeal;
    private Integer todayDead;
    private Integer todaySevere;
    private Integer todayStoreConfirm;
    private Integer todayInput;
    private Integer totalConfirm;
    private Integer totalSuspect;
    private Integer totalHeal;
    private Integer totalDead;
    private Integer totalSevere;
    private Integer totalInput;
    private Integer totalStoreConfirm;

}
