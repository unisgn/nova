package com.nova.repository;

import com.nova.domain.Demo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by franCiS on Jul 12, 2014.
 */
@Repository
public interface DemoRepo extends CrudRepository<Demo, Integer> {
}
