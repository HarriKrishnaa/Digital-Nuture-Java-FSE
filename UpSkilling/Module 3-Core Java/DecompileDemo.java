import java.util.List;
import java.util.ArrayList;

public class DecompileDemo {
    private List<String> items = new ArrayList<>();

    public void addItem(String item) {
        items.add(item);
    }

    public List<String> getItems() {
        return items;
    }

    public static void main(String[] args) {
        DecompileDemo d = new DecompileDemo();
        d.addItem("Java");
        d.addItem("Python");
        System.out.println(d.getItems());
    }
}

/*
Steps to decompile:
  javac DecompileDemo.java
  java -jar cfr-0.152.jar DecompileDemo.class

Decompiled output (CFR) will look like:
  public class DecompileDemo {
      private List items = new ArrayList();
      public void addItem(String item) { this.items.add(item); }
      public List getItems() { return this.items; }
      ...
  }

Note: Generic type <String> is erased to raw List in bytecode.

Program Output:
[Java, Python]
*/
