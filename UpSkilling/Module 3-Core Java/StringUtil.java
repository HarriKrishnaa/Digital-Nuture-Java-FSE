package com.utils;

public class StringUtil {
    public static String shout(String s) { return s.toUpperCase() + "!"; }
}

/*
This file belongs to module com.utils.
Directory structure:
  com.utils/
    module-info.java
    com/utils/StringUtil.java

module-info.java for com.utils:
  module com.utils {
      exports com.utils;
  }

Compile:
  javac -d mods/com.utils com.utils/module-info.java com.utils/com/utils/StringUtil.java
*/
