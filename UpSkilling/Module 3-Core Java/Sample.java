public class Sample {
    public static int add(int a, int b) { return a + b; }
    public static void main(String[] args) {
        System.out.println(add(3, 4));
    }
}

/*
Compile and inspect bytecode:
  javac Sample.java
  javap -c Sample

Output of javap -c Sample:
public static int add(int, int);
  Code:
     0: iload_0
     1: iload_1
     2: iadd
     3: ireturn

public static void main(java.lang.String[]);
  Code:
     0: getstatic     #2   // Field java/lang/System.out
     3: iconst_3
     4: iconst_4
     5: invokestatic  #3   // Method add:(II)I
     8: invokevirtual #4   // Method println:(I)V
    11: return

Program Output:
7
*/
