import java.sql.*;

public class Transaction {
    static String URL = "jdbc:sqlite:bank.db";

    static void transfer(int fromId, int toId, double amount) {
        String debit  = "UPDATE accounts SET balance = balance - ? WHERE id = ?";
        String credit = "UPDATE accounts SET balance = balance + ? WHERE id = ?";

        try (Connection conn = DriverManager.getConnection(URL)) {
            conn.setAutoCommit(false);
            try (
                PreparedStatement d = conn.prepareStatement(debit);
                PreparedStatement c = conn.prepareStatement(credit)
            ) {
                d.setDouble(1, amount); d.setInt(2, fromId); d.executeUpdate();
                c.setDouble(1, amount); c.setInt(2, toId);   c.executeUpdate();
                conn.commit();
                System.out.println("Transfer of " + amount + " successful.");
            } catch (SQLException e) {
                conn.rollback();
                System.out.println("Transaction rolled back: " + e.getMessage());
            }
        } catch (SQLException e) { e.printStackTrace(); }
    }

    public static void main(String[] args) {
        transfer(1, 2, 500.0);
    }
}

/*
Output (on success):
Transfer of 500.0 successful.

Output (on failure, e.g. insufficient balance constraint):
Transaction rolled back: ...
*/
