package com.nova.domain;

import javax.persistence.*;

/**
 * Created by franCiS on 7/11/14.
 */

@Table
@Entity
public class Demo extends AbstractEntity<Integer> {
    private String name;

    public Demo(){}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
