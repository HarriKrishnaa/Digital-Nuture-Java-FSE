import java.util.Scanner;

public class Factorial {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a non-negative integer: ");
        int n = sc.nextInt();

        if (n < 0) {
            System.out.println("Factorial undefined for negative numbers");
            return;
        }

        long fact = 1;
        for (int i = 2; i <= n; i++) fact *= i;

        System.out.println(n + "! = " + fact);
        sc.close();
    }
}

/*
Input:
Enter a non-negative integer: 6

Output:
6! = 720
*/
