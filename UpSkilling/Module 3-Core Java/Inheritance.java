class Animal {
    void makeSound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Dog says: Bark");
    }
}

public class Inheritance {
    public static void main(String[] args) {
        Animal a = new Animal();
        Animal d = new Dog();
        a.makeSound();
        d.makeSound();
    }
}

/*
Output:
Animal makes a sound
Dog says: Bark
*/
