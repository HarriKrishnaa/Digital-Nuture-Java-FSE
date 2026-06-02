public class OperatorPrecedence {
    public static void main(String[] args) {
        int r1 = 10 + 5 * 2;
        int r2 = (10 + 5) * 2;
        int r3 = 20 / 4 - 3 + 2;
        int r4 = 10 % 3 * 2;
        int r5 = 2 + 3 * 4 - 1;

        System.out.println("10 + 5 * 2     = " + r1);
        System.out.println("(10 + 5) * 2   = " + r2);
        System.out.println("20 / 4 - 3 + 2 = " + r3);
        System.out.println("10 % 3 * 2     = " + r4);
        System.out.println("2 + 3 * 4 - 1  = " + r5);
    }
}

/*
Output:
10 + 5 * 2     = 20
(10 + 5) * 2   = 30
20 / 4 - 3 + 2 = 4
10 % 3 * 2     = 2
2 + 3 * 4 - 1  = 13
*/
