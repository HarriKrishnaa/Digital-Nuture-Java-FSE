import java.util.*;

public class VirtualThreads {
    public static void main(String[] args) throws InterruptedException {
        int COUNT = 100_000;
        List<Thread> threads = new ArrayList<>();

        long start = System.currentTimeMillis();

        for (int i = 0; i < COUNT; i++) {
            int id = i;
            Thread vt = Thread.startVirtualThread(() -> {
                double x = Math.sqrt(id);
            });
            threads.add(vt);
        }

        for (Thread t : threads) t.join();

        long elapsed = System.currentTimeMillis() - start;
        System.out.println("Launched " + COUNT + " virtual threads in " + elapsed + "ms");
    }
}

/*
Output:
Launched 100000 virtual threads in 243ms
*/
