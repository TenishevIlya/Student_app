<?php

function createSelectOfExams($link, $course, $group) {
    mysqli_set_charset($link, "utf8");
    if($course==0)			
		echo "<p>Предметы на факультете математики и ИТ";
	else echo "<p>Предметы " .$course." курса";
    
    $getDirectionQuery = "SELECT DISTINCT Direction_code FROM student WHERE Group_number = $group";   
    $directionRes = mysqli_query($link, $getDirectionQuery);
    
    $directionCode = "";	
    while ($direction = mysqli_fetch_array($directionRes)) {
        $directionCode = $direction['Direction_code'];
	}
    
    $getExamsNamesQuery = "SELECT DISTINCT subject.Name as title, subject.Id as id FROM subject JOIN student ON Direction_code WHERE subject.Study_direction_code = '$directionCode' AND subject.Number_of_course = $course AND student.Group_number=$group AND subject.Number_of_course = $course ORDER BY subject.Name";
    $allExams = mysqli_query($link, $getExamsNamesQuery);  

    if ($allExams) {
        echo "<p><select id='allSubjectsList' name='subjects' class='custom-select'>";
	    while($subject = mysqli_fetch_array($allExams)){
		    echo "<option value='".$subject['id']."'>".$subject['title']."</option>";
	    }
	    echo "</select>";
    }   
    // else {
    //     echo "Запрос не выполнен\n"; 
    // } 
}
