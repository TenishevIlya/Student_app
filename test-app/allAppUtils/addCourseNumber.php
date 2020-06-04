<?php

    function addCourseNumber($studentBirthDate, $groupNumber) {
        $timestamp = strtotime($studentBirthDate);
        $year_difference = date("Y")-date("Y",$timestamp);

        if (date("M") >= 9 && date("M") <= 12) {
            return ($year_difference >= 4) ? "4".$groupNumber : ($year_difference+1).$groupNumber;
        }
        else {
            return ($year_difference >= 4) ? "4".$groupNumber : $year_difference.$groupNumber;
        }
    }
