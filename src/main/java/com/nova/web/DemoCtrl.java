package com.nova.web;

import com.nova.domain.Demo;
import com.nova.service.DemoMgr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Created by franCiS on 7/11/14.
 */

@Controller
@RequestMapping("/rest/demo")
public class DemoCtrl {

    @Autowired
    DemoMgr mgr;

    @RequestMapping(value="/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Demo findById(@PathVariable int id) {
        return mgr.findById(id);
    }
}
