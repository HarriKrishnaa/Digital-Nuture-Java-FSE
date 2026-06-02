import java.util.concurrent.*;
import java.util.*;

public class ExecutorDemo {
    public static void main(String[] args) throws Exception {
        ExecutorService pool = Executors.newFixedThreadPool(3);

        List<Future<Integer>> futures = new ArrayList<>();
        for (int i = 1; i <= 5; i++) {
            final int num = i;
            futures.add(pool.submit(() -> {
                Thread.sleep(100);
                return num * num;
            }));
        }

        for (int i = 0; i < futures.size(); i++) {
            System.out.println("Task " + (i + 1) + ": result = " + futures.get(i).get());
        }

        pool.shutdown();
    }
}

/*
Output:
Task 1: result = 1
Task 2: result = 4
Task 3: result = 9
Task 4: result = 16
Task 5: result = 25
*/
