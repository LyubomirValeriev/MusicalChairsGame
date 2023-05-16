package com.demo.MusicalChairs;

import com.demo.MusicalChairs.entities.Player;
import com.demo.MusicalChairs.threads.ReactionThread;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Phaser;


import static com.demo.MusicalChairs.FastestReactionPhaser.removeElement;

public class PhaserRunner {
    private Phaser phaser;
    private ExecutorService executorService;
    private Map<String, Player> players;
    public static Player slowestPlayer;

    public PhaserRunner(String[] playerNames) {
        executorService = Executors.newCachedThreadPool();
        phaser = new Phaser();
        this.players = getPlayersList(playerNames);
        this.slowestPlayer = new Player("noone");
        phaser.register();
    }

    public void run() {
        System.out.println("Phase is "+phaser.getPhase());

        if (FastestReactionPhaser.players.length> 1) { // while (players.size() > 1)
            for (Map.Entry<String,Player> e : players.entrySet()) {
                executorService.submit(new ReactionThread(e.getValue(), phaser, slowestPlayer));
            }

            phaser.arriveAndAwaitAdvance();

            System.out.println("Phase is "+phaser.getPhase());

            String slowestPlayerName = slowestPlayer.getName();
            System.out.println("Slowest is "+slowestPlayerName);

            players.remove(slowestPlayerName);
           // PLAYERS.remove(slowestPlayerName);
            removeElement(FastestReactionPhaser.players , slowestPlayerName);

        }

        Optional<Map.Entry<String, Player>> e = players.entrySet().stream().findFirst();
        String winnerName = e.get().getKey();

        if(players.size() == 1) {
            System.out.println("And the winner is " + winnerName);
        }
        phaser.arriveAndDeregister();
        System.out.println("Main thread deregistered!!!");
    }

    private Map<String,Player> getPlayersList(String[] playerNames) {
        Map<String,Player> m = new HashMap<>(playerNames.length);

        for (String pn : playerNames) {
            m.put(pn, new Player(pn));
        }

        return m;
    }
}
