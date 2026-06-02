import java.lang.reflect.*;

class MathOps {
    public int add(int a, int b) { return a + b; }
    public int mul(int a, int b) { return a * b; }
}

public class ReflectionDemo {
    public static void main(String[] args) throws Exception {
        Class<?> clazz = Class.forName("MathOps");
        Object obj = clazz.getDeclaredConstructor().newInstance();

        System.out.println("Methods in MathOps:");
        for (Method m : clazz.getDeclaredMethods()) {
            System.out.println("  " + m.getName() + " -> params: " + m.getParameterCount());
        }

        Method addMethod = clazz.getMethod("add", int.class, int.class);
        Object result = addMethod.invoke(obj, 7, 5);
        System.out.println("add(7, 5) via reflection = " + result);
    }
}

/*
Output:
Methods in MathOps:
  add -> params: 2
  mul -> params: 2
add(7, 5) via reflection = 12
*/
