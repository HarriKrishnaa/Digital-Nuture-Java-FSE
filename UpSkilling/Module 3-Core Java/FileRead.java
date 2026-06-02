import java.io.*;

public class FileRead {
    public static void main(String[] args) {
        try (BufferedReader br = new BufferedReader(new FileReader("output.txt"))) {
            System.out.println("Contents of output.txt:");
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
        } catch (FileNotFoundException e) {
            System.out.println("File not found. Run FileWrite first.");
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }
    }
}

/*
Output (assuming output.txt contains "Hello from Java!"):
Contents of output.txt:
Hello from Java!
*/
