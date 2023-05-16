package com.demo.MusicalChairs.controllers;

import com.demo.MusicalChairs.FastestReactionPhaser;
import com.demo.MusicalChairs.entities.Player;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Array;
import java.util.List;
import java.util.Map;

import static com.demo.MusicalChairs.FastestReactionPhaser.*;
import static com.demo.MusicalChairs.PhaserRunner.slowestPlayer;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/chair")
public class ChairController {

private static  boolean kur = true ;
    @GetMapping("/fetch")
    public String getAllConHalls() throws JsonProcessingException {

        System.out.println("Работи");
        FastestReactionPhaser.main( new String[]{" "});
        System.out.println("Работи 2");
        String json = slowestPlayer.getName();
        System.out.println("Работи 3");
        return slowestPlayer.getName() ;
    }

    @PostMapping("/numchairs")
    public void  NumOfChairs(@RequestBody String[] chairs  ){
        String[] arr = ( String[])chairs ;
        FillArray(arr);
        String abc = "" ;
    }

    @PostMapping("/refreshchairs") // can be getMapping
    public void  refreshChairs(@RequestBody String[] chairs  ){
        refreshPlayers();
        String abc = "" ;
    }

}
