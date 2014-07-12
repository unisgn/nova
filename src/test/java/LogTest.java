import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by franCiS on Jul 12, 2014.
 */
public class LogTest {
    public static void main(String[] args) {
        Logger logger = LoggerFactory.getLogger(LogTest.class);
        logger.info("log testie");
    }

}
