import java.util.Scanner;

public class GradeCalc {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter marks (0-100): ");
        int marks = sc.nextInt();

        char grade;
        if      (marks >= 90) grade = 'A';
        else if (marks >= 80) grade = 'B';
        else if (marks >= 70) grade = 'C';
        else if (marks >= 60) grade = 'D';
        else                  grade = 'F';

        System.out.println("Marks: " + marks + " -> Grade: " + grade);
        sc.close();
    }
}

/*
Input:
Enter marks (0-100): 85

Output:
Marks: 85 -> Grade: B
*/
