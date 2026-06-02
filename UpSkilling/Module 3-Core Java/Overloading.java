public class Overloading {

    static int add(int a, int b)             { return a + b; }
    static double add(double a, double b)    { return a + b; }
    static int add(int a, int b, int c)      { return a + b + c; }

    public static void main(String[] args) {
        System.out.println("add(3, 4)      = " + add(3, 4));
        System.out.println("add(2.5, 3.7)  = " + add(2.5, 3.7));
        System.out.println("add(1, 2, 3)   = " + add(1, 2, 3));
    }
}

/*
Output:
add(3, 4)      = 7
add(2.5, 3.7)  = 6.2
add(1, 2, 3)   = 6
*/
