class MyThread extends Thread {
    String tName;
    MyThread(String tName) { this.tName = tName; }
    public void run() {
        for (int i = 1; i <= 3; i++)
            System.out.println(tName + " - message " + i);
    }
}

class MyRunnable implements Runnable {
    public void run() {
        for (int i = 1; i <= 3; i++)
            System.out.println("Runnable - message " + i);
    }
}

public class Threads {
    public static void main(String[] args) {
        MyThread t1 = new MyThread("Thread-1");
        Thread   t2 = new Thread(new MyRunnable());
        t1.start();
        t2.start();
    }
}

/*
Output (order may vary due to concurrent execution):
Thread-1 - message 1
Runnable - message 1
Thread-1 - message 2
Runnable - message 2
Thread-1 - message 3
Runnable - message 3
*/
