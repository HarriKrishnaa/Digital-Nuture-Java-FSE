public class TypeCasting {
    public static void main(String[] args) {
        double d = 9.78;
        int i = (int) d;
        System.out.println("double " + d + " cast to int: " + i);

        int num = 42;
        double dbl = (double) num;
        System.out.println("int " + num + " cast to double: " + dbl);
    }
}

/*
Output:
double 9.78 cast to int: 9
int 42 cast to double: 42.0
*/
