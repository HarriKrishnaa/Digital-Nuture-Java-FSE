package com.greetings;

import com.utils.StringUtil;

public class Main {
    public static void main(String[] args) {
        System.out.println(StringUtil.shout("hello from modules"));
    }
}

/*
This file belongs to module com.greetings.
Directory structure:
  com.greetings/
    module-info.java
    com/greetings/Main.java

module-info.java for com.greetings:
  module com.greetings {
      requires com.utils;
  }

Compile:
  javac --module-path mods -d mods/com.greetings com.greetings/module-info.java com.greetings/com/greetings/Main.java

Run:
  java --module-path mods -m com.greetings/com.greetings.Main

Output:
HELLO FROM MODULES!
*/
