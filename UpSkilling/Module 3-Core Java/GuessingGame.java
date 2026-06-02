import java.util.Random;
import java.util.Scanner;

public class GuessingGame {
    public static void main(String[] args) {
        int secret = new Random().nextInt(100) + 1;
        Scanner sc = new Scanner(System.in);
        int attempts = 0;

        System.out.println("Guess the number (1-100):");
        while (true) {
            System.out.print("Your guess: ");
            int guess = sc.nextInt();
            attempts++;
            if      (guess < secret) System.out.println("Too low!");
            else if (guess > secret) System.out.println("Too high!");
            else {
                System.out.println("Correct! You got it in " + attempts + " attempts.");
                break;
            }
        }
        sc.close();
    }
}

/*
Input:
Your guess: 50
Your guess: 75
Your guess: 63

Output:
Guess the number (1-100):
Too low!
Too high!
Correct! You got it in 3 attempts.
*/
