import java.util.*;
import java.util.stream.*;

public class StreamAPI {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        List<Integer> evens = numbers.stream()
            .filter(n -> n % 2 == 0)
            .collect(Collectors.toList());

        System.out.println("Even numbers: " + evens);

        int sum = evens.stream().reduce(0, Integer::sum);
        System.out.println("Sum of evens: " + sum);
    }
}

/*
Output:
Even numbers: [2, 4, 6, 8, 10]
Sum of evens: 30
*/
