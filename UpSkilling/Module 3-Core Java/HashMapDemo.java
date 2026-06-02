import java.util.*;

public class HashMapDemo {
    public static void main(String[] args) {
        Map<Integer, String> students = new HashMap<>();
        Scanner sc = new Scanner(System.in);

        students.put(101, "Alice");
        students.put(102, "Bob");
        students.put(103, "Charlie");

        System.out.print("Enter student ID to look up: ");
        int id = sc.nextInt();

        String name = students.getOrDefault(id, "Not found");
        System.out.println("Student ID " + id + " -> " + name);
        sc.close();
    }
}

/*
Input:
Enter student ID to look up: 102

Output:
Student ID 102 -> Bob

Input:
Enter student ID to look up: 999

Output:
Student ID 999 -> Not found
*/
