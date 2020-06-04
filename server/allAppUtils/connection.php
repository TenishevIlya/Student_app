<?php

    function createConnection() {
        $link = mysqli_connect("localhost", "tenishev_303_user", "tenishev220999","tenishev_303");
        mysqli_set_charset($link, "utf8");
        date_default_timezone_set('UTC');  
        
        return $link;
    }
