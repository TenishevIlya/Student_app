<?php

function createDatePickerWithValidation($cur_course, $exam_course) {
    $need_date=date("Y")-($cur_course-$exam_course);
    if (date("m")!="09"&&date("m")!="10"&&date("m")!="11"&&date("m")!="12"){
        $need_date=$need_date-1;
    }
    $need_date=$need_date."-09-01";
    $cur_date=date("Y")."-".date("m")."-".date("d");
    echo "<p>Дата сдачи:&nbsp;&nbsp;&nbsp;&nbsp;<input type='date' name='date_of_pass' required min=\"".$need_date."\"    max=\"".$cur_date."\"/><br/>";
}
