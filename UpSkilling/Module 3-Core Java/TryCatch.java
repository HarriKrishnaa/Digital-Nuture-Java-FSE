import java.util.Scanner;

public class TryCatch {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter numerator: ");
        int a = sc.nextInt();
        System.out.print("Enter denominator: ");
        int b = sc.nextInt();

        try {
            int result = a / b;
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Error: Cannot divide by zero! " + e.getMessage());
        } finally {
            System.out.println("finally block always runs");
            sc.close();
        }
    }
}

/*
Input:
Enter numerator: 10
Enter denominator: 0

Output:
Error: Cannot divide by zero! / by zero
finally block always runs
*/
