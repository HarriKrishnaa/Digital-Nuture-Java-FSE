import java.util.*;

public class Lambdas {
    public static void main(String[] args) {
        List<String> fruits = new ArrayList<>(
            Arrays.asList("Banana", "Apple", "Mango", "Cherry")
        );

        Collections.sort(fruits, (a, b) -> a.compareTo(b));
        System.out.println("Alphabetical: " + fruits);

        fruits.sort((a, b) -> Integer.compare(a.length(), b.length()));
        System.out.println("By length:    " + fruits);
    }
}

/*
Output:
Alphabetical: [Apple, Banana, Cherry, Mango]
By length:    [Apple, Mango, Banana, Cherry]
*/
