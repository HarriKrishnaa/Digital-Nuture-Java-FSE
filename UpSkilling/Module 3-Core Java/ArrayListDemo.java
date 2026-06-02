import java.util.*;

public class ArrayListDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<String> names = new ArrayList<>();

        System.out.print("How many students? ");
        int n = sc.nextInt();
        sc.nextLine();

        for (int i = 0; i < n; i++) {
            System.out.print("Name " + (i + 1) + ": ");
            names.add(sc.nextLine());
        }

        System.out.println("\nAll students:");
        for (String name : names)
            System.out.println(" - " + name);
        sc.close();
    }
}

/*
Input:
How many students? 3
Name 1: Alice
Name 2: Bob
Name 3: Charlie

Output:
All students:
 - Alice
 - Bob
 - Charlie
*/
