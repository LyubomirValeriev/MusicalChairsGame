package com.demo.MusicalChairs;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class FastestReactionPhaser {

   // public static List<String> PLAYERS = new ArrayList<>();
    public static String[] players ;

    public static void main(String[] args) {

        PhaserRunner phaserTest = new PhaserRunner(players);
        phaserTest.run();
    }

    public static void FillArray (String[] playersList){
        if(players != null)
            if(players.length>1)
                 refreshPlayers();

        players = playersList ;

    }

    public  static  void refreshPlayers(){
        Arrays.fill(players, null);

    }

    public static void removeElement(String[] arr, String value) {
        int index = -1;
        // Find the index of the element to be removed
        for (int i = 0; i < arr.length; i++) {
            if (arr[i].equals(value)) {
                index = i;
                break;
            }
        }
        String[] newArr = new String[arr.length - 1];
        for (int i = 0, k = 0; i < arr.length; i++) {
            if (i == index) {
                continue;
            }
            newArr[k++] = arr[i];
        }
        players = newArr;
    }

}
