<?php

function calculateAvailableCourses($groupNumber) {
    $cur_course=($groupNumber-$groupNumber%100)/100;
    for($i=1;$i<=$cur_course;$i++){
        echo "<option value='".$i."'>".$i." </option>";
    }
    echo "</select>";
    echo "<input type=hidden name=number_of_group value=$groupNumber>";
}