package com.demo.MusicalChairs.threads;

import com.demo.MusicalChairs.BogusBusinessLogic.BogusBusinessLogic;
import com.demo.MusicalChairs.entities.Player;

import java.util.concurrent.Phaser;
public class ReactionThread extends Thread {

    private Player player;
    private Player slowestPlayer;
    private Phaser phaser;
    private BogusBusinessLogic businessLogic;

    public ReactionThread(Player player, Phaser phaser, Player slowestPlayer) {
        this.player = player;
        this.slowestPlayer = slowestPlayer;
        this.phaser = phaser;
        businessLogic = new BogusBusinessLogic();

        phaser.register();
    }

    @Override
    public void run() {
        //phaser.arriveAndAwaitAdvance(); //TODO: that's the wrong line in the application
        System.out.println(player.getName()+" registered the action!");

        businessLogic.processMeaningfulLogic(player, slowestPlayer);

        System.out.println(player.getName()+" reacted!");

        phaser.arriveAndDeregister();
    }
}
