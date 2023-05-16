package com.demo.MusicalChairs.BogusBusinessLogic;

import com.demo.MusicalChairs.entities.Player;

import java.util.Random;

public class BogusBusinessLogic {
    private static final Random RANDOM = new Random();
    private static final int MAX_EXEC_TIME = 10000;// 10 seconds

    public void processMeaningfulLogic(Player player, Player slowestPlayer) {
        Integer executionTime = RANDOM.nextInt(MAX_EXEC_TIME);

        try {
            Thread.sleep(executionTime.longValue());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        slowestPlayer.setName(player.getName());
    }

}
