import java.net.*;
import java.io.*;

public class Server {
    public static void main(String[] args) throws IOException {
        ServerSocket ss = new ServerSocket(5000);
        System.out.println("Server listening on port 5000...");
        Socket sock = ss.accept();
        System.out.println("Client connected: " + sock.getInetAddress());

        BufferedReader in  = new BufferedReader(new InputStreamReader(sock.getInputStream()));
        PrintWriter    out = new PrintWriter(sock.getOutputStream(), true);
        BufferedReader kbd = new BufferedReader(new InputStreamReader(System.in));

        String msg;
        while ((msg = in.readLine()) != null) {
            System.out.println("Client: " + msg);
            System.out.print("Server: ");
            out.println(kbd.readLine());
        }
        ss.close();
    }
}

/*
Run Server first in terminal 1:
  java Server

Output:
Server listening on port 5000...
Client connected: /127.0.0.1
Client: Hello Server!
Server: (you type) Hi Client!
*/
