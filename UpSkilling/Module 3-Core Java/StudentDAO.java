import java.sql.*;

public class StudentDAO {
    private String url = "jdbc:sqlite:school.db";

    public void insertStudent(int id, String name, int marks) {
        String sql = "INSERT INTO students (id, name, marks) VALUES (?, ?, ?)";
        try (Connection conn = DriverManager.getConnection(url);
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            ps.setString(2, name);
            ps.setInt(3, marks);
            int rows = ps.executeUpdate();
            System.out.println(rows + " row(s) inserted.");
        } catch (SQLException e) { e.printStackTrace(); }
    }

    public void updateMarks(int id, int newMarks) {
        String sql = "UPDATE students SET marks = ? WHERE id = ?";
        try (Connection conn = DriverManager.getConnection(url);
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, newMarks);
            ps.setInt(2, id);
            int rows = ps.executeUpdate();
            System.out.println(rows + " row(s) updated.");
        } catch (SQLException e) { e.printStackTrace(); }
    }

    public static void main(String[] args) {
        StudentDAO dao = new StudentDAO();
        dao.insertStudent(3, "Carol", 90);
        dao.updateMarks(2, 78);
    }
}

/*
Output:
1 row(s) inserted.
1 row(s) updated.
*/
