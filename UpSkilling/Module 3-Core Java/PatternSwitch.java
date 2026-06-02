public class PatternSwitch {

    static String describe(Object obj) {
        return switch (obj) {
            case Integer i -> "Integer with value " + i;
            case Double  d -> "Double with value  " + d;
            case String  s -> "String of length " + s.length() + ": \"" + s + "\"";
            case null      -> "null value";
            default        -> "Unknown type: " + obj.getClass().getSimpleName();
        };
    }

    public static void main(String[] args) {
        System.out.println(describe(42));
        System.out.println(describe(3.14));
        System.out.println(describe("Hello"));
        System.out.println(describe(null));
    }
}

/*
Output:
Integer with value 42
Double with value  3.14
String of length 5: "Hello"
null value
*/
