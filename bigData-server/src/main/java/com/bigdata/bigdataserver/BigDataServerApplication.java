package com.bigdata.bigdataserver;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("com.bigdata.bigdataserver.dao")
@SpringBootApplication
public class BigDataServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(BigDataServerApplication.class, args);
    }

}
