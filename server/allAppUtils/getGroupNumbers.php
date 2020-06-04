<?php

function setAllGroupNumbers($link,$selectedGroup) { 
    $groupSql = 'SELECT Group_number FROM student GROUP BY Group_number';     
    $allGroups = mysqli_query($link, $groupSql);
    mysqli_set_charset($link, "utf8");
                                

    while ($streamGroup = mysqli_fetch_array($allGroups)) {
        for ($i = 1; $i <= 4; $i++) {
            $fullGroupNumber = $i. $streamGroup["Group_number"];
            if ($fullGroupNumber == $selectedGroup) {
                echo "<option selected value=".$fullGroupNumber.">".$fullGroupNumber."</option>";
            }
            else {
                echo "<option value=".$fullGroupNumber.">".$fullGroupNumber."</option>";
            }
        }
    } 
}
