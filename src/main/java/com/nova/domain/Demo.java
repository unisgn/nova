package com.nova.domain;

import javax.persistence.*;

/**
 * Created by franCiS on 7/11/14.
 */

@Table
@Entity
public class Demo extends AbstractEntity<Integer> {
    private String name;
}
