<?php 

function createSelectOfStudents($link, $streamGroup, $course) {
	$date_of_issue=date("Y")-$course;
	if (date("m")=="09"||date("m")=="10"||date("m")=="11"||date("m")=="12"){
		$date_of_issue=$date_of_issue+1;
	}
	$date_of_issue=$date_of_issue."-09-01";
	$dateForCertainGroup = date("Y")-$course. "-09-01";

	$getAllStudentsQuery = 'SELECT * FROM student WHERE student.Group_number = '.$streamGroup.' and (student.Date_of_issue_of_student_ticket = "'.$dateForCertainGroup.'" OR (student.Date_of_issue_of_student_ticket < "'.$dateForCertainGroup.'" AND '.$course.' = 4)) ORDER BY student.Group_number,Surname';
	$allStudents = mysqli_query($link, $getAllStudentsQuery);
	mysqli_set_charset($link, "utf8");

    echo "<p><select name=student_id class='custom-select'>";
    if($allStudents) {
		while($student = mysqli_fetch_array($allStudents)){
	        echo "<option value=".$student['Id'].">".$student['Surname']." ".$student['Name']." ".$student['Patronimyc']."</option>";
        }
    }
	echo "</select>";
}
