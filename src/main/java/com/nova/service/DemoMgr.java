package com.nova.service;

import com.nova.domain.Demo;
import org.springframework.stereotype.Service;

/**
 * Created by franCiS on 7/11/14.
 */
public interface DemoMgr {
    public Demo add(Demo demo);
    public Demo findById(int id);
}
