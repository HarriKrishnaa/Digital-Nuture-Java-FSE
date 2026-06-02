interface Playable {
    void play();
}

class Guitar implements Playable {
    public void play() { System.out.println("Strumming the Guitar"); }
}

class Piano implements Playable {
    public void play() { System.out.println("Playing the Piano"); }
}

public class Interfaces {
    public static void main(String[] args) {
        Playable g = new Guitar();
        Playable p = new Piano();
        g.play();
        p.play();
    }
}

/*
Output:
Strumming the Guitar
Playing the Piano
*/
