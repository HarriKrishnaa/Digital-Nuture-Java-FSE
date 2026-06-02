import java.util.Scanner;

public class ArrayStats {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("How many elements? ");
        int n = sc.nextInt();
        double[] arr = new double[n];

        for (int i = 0; i < n; i++) {
            System.out.print("Element [" + (i + 1) + "] = ");
            arr[i] = sc.nextDouble();
        }

        double sum = 0;
        for (double val : arr) sum += val;

        System.out.println("Sum     = " + sum);
        System.out.println("Average = " + (sum / n));
        sc.close();
    }
}

/*
Input:
How many elements? 4
Element [1] = 10
Element [2] = 20
Element [3] = 30
Element [4] = 40

Output:
Sum     = 100.0
Average = 25.0
*/
