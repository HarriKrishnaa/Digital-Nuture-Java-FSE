import java.util.Scanner;

public class Palindrome {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a string: ");
        String input = sc.nextLine();

        String cleaned = input.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
        String reversed = new StringBuilder(cleaned).reverse().toString();

        if (cleaned.equals(reversed))
            System.out.println("\"" + input + "\" IS a palindrome");
        else
            System.out.println("\"" + input + "\" is NOT a palindrome");
        sc.close();
    }
}

/*
Input:
Enter a string: A man, a plan, a canal: Panama

Output:
"A man, a plan, a canal: Panama" IS a palindrome

Input:
Enter a string: Hello

Output:
"Hello" is NOT a palindrome
*/
