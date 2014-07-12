import org.junit.Test;

import java.sql.Statement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by franCiS on Jul 12, 2014.
 */
public class JdbcTest {
    public static void main(String[] args) {
        JdbcTest test = new JdbcTest();
        test.mysqlTest();
        test.postgresTest();
    }

    private void mysqlTest() {
        String url = "jdbc:mysql://localhost:3306/nova";
        String username = "root";
        String password = "admin";
        try {
            String sql = "SELECT name FROM demo WHERE 1=1";
            String name;

            Connection conn = DriverManager.getConnection(url, username, password);
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);
            while(rs.next()) {
                name = rs.getString("name");
                System.out.println(name);
            }
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private void postgresTest() {
        String url = "jdbc:postgresql://localhost:5432/demo";
        String username = "postgres";
        String password = "";
        try {
            String sql = "SELECT count(*) AS cnt FROM tast WHERE 1=1";
            int count;

            Connection conn = DriverManager.getConnection(url, username, password);
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);
            while(rs.next()) {
                count = rs.getInt("cnt");
                System.out.println(count);
            }
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
