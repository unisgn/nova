package com.nova.service.impl;

import com.nova.domain.Demo;
import com.nova.repository.DemoRepo;
import com.nova.service.DemoMgr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by franCiS on 7/11/14.
 */

@Service
public class DemoMgrImpl implements DemoMgr {
    @Autowired
    private DemoRepo repo;

    public Demo add(Demo demo) {
        return (Demo)repo.save(demo);
    }

    public Demo findById(int id) {
        return (Demo)repo.findOne(id);
    }
}
