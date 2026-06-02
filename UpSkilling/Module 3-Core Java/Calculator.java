import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter first number: ");
        double a = sc.nextDouble();
        System.out.print("Enter second number: ");
        double b = sc.nextDouble();
        System.out.print("Choose operation (+, -, *, /): ");
        char op = sc.next().charAt(0);

        double result;
        switch (op) {
            case '+': result = a + b; break;
            case '-': result = a - b; break;
            case '*': result = a * b; break;
            case '/':
                if (b == 0) { System.out.println("Cannot divide by zero!"); return; }
                result = a / b; break;
            default: System.out.println("Invalid operator"); return;
        }
        System.out.println("Result: " + a + " " + op + " " + b + " = " + result);
        sc.close();
    }
}

/*
Input:
Enter first number: 10
Enter second number: 4
Choose operation (+, -, *, /): /

Output:
Result: 10.0 / 4.0 = 2.5
*/
