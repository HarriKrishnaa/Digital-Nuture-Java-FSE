import java.util.Scanner;

public class LeapYear {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a year: ");
        int year = sc.nextInt();

        boolean isLeap = (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);

        if (isLeap)
            System.out.println(year + " is a Leap Year");
        else
            System.out.println(year + " is NOT a Leap Year");
        sc.close();
    }
}

/*
Input:
Enter a year: 2000

Output:
2000 is a Leap Year

Input:
Enter a year: 1900

Output:
1900 is NOT a Leap Year
*/
