package com.nova.domain;

import org.springframework.data.jpa.domain.AbstractAuditable;

import javax.persistence.MappedSuperclass;
import javax.persistence.Version;
import java.io.Serializable;

/**
 *
 * Created by franCiS on Jul 11, 2014.
 */
@MappedSuperclass
public abstract class AuditableEntity<PK extends Serializable> extends AbstractAuditable<User, PK> {
    @Version
    private int version;

    private boolean archived = false;

    private boolean active = true;
}
