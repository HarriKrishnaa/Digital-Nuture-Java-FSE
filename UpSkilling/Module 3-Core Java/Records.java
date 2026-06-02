import java.util.*;
import java.util.stream.*;

record Person(String name, int age) {}

public class Records {
    public static void main(String[] args) {
        List<Person> people = List.of(
            new Person("Alice", 30),
            new Person("Bob",   17),
            new Person("Carol", 25),
            new Person("Dave",  15)
        );

        people.forEach(System.out::println);

        System.out.println("\nAdults (18+):");
        people.stream()
              .filter(p -> p.age() >= 18)
              .forEach(System.out::println);
    }
}

/*
Output:
Person[name=Alice, age=30]
Person[name=Bob, age=17]
Person[name=Carol, age=25]
Person[name=Dave, age=15]

Adults (18+):
Person[name=Alice, age=30]
Person[name=Carol, age=25]
*/
