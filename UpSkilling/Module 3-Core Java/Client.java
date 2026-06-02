import java.net.*;
import java.io.*;

public class Client {
    public static void main(String[] args) throws IOException {
        Socket         sock = new Socket("localhost", 5000);
        PrintWriter    out  = new PrintWriter(sock.getOutputStream(), true);
        BufferedReader in   = new BufferedReader(new InputStreamReader(sock.getInputStream()));
        BufferedReader kbd  = new BufferedReader(new InputStreamReader(System.in));

        String msg;
        while (true) {
            System.out.print("Client: ");
            msg = kbd.readLine();
            out.println(msg);
            System.out.println("Server: " + in.readLine());
        }
    }
}

/*
Run Client in terminal 2 (after Server is running):
  java Client

Input/Output:
Client: Hello Server!
Server: Hi Client!
*/
