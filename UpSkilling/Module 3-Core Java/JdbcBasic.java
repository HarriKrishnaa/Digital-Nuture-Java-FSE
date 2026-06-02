import java.sql.*;

public class JdbcBasic {
    public static void main(String[] args) throws Exception {
        String url = "jdbc:sqlite:school.db";

        try (Connection conn = DriverManager.getConnection(url);
             Statement stmt = conn.createStatement()) {

            stmt.execute("CREATE TABLE IF NOT EXISTS students " +
                         "(id INTEGER PRIMARY KEY, name TEXT, marks INTEGER)");

            stmt.execute("INSERT OR IGNORE INTO students VALUES (1,'Alice',85)");
            stmt.execute("INSERT OR IGNORE INTO students VALUES (2,'Bob',72)");

            ResultSet rs = stmt.executeQuery("SELECT * FROM students");
            System.out.printf("%-5s %-10s %-6s%n", "ID", "Name", "Marks");
            while (rs.next()) {
                System.out.printf("%-5d %-10s %-6d%n",
                    rs.getInt("id"), rs.getString("name"), rs.getInt("marks"));
            }
        }
    }
}

/*
Output:
ID    Name       Marks
1     Alice      85
2     Bob        72
*/
