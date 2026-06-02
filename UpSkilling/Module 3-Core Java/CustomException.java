class InvalidAgeException extends Exception {
    InvalidAgeException(String message) { super(message); }
}

public class CustomException {

    static void validateAge(int age) throws InvalidAgeException {
        if (age < 18)
            throw new InvalidAgeException("Age " + age + " is below minimum (18)");
        System.out.println("Age " + age + ": Access granted.");
    }

    public static void main(String[] args) {
        try { validateAge(15); }
        catch (InvalidAgeException e) { System.out.println("Caught: " + e.getMessage()); }

        try { validateAge(21); }
        catch (InvalidAgeException e) { System.out.println("Caught: " + e.getMessage()); }
    }
}

/*
Output:
Caught: Age 15 is below minimum (18)
Age 21: Access granted.
*/
