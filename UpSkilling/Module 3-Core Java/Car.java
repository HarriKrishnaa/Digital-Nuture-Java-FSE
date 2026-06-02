public class Car {
    String make;
    String model;
    int    year;

    Car(String make, String model, int year) {
        this.make  = make;
        this.model = model;
        this.year  = year;
    }

    void displayDetails() {
        System.out.println(year + " " + make + " " + model);
    }

    public static void main(String[] args) {
        Car c1 = new Car("Toyota", "Corolla", 2022);
        Car c2 = new Car("Honda",  "Civic",   2023);
        c1.displayDetails();
        c2.displayDetails();
    }
}

/*
Output:
2022 Toyota Corolla
2023 Honda Civic
*/
