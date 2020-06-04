<?php 

function checkHeadOfGroup($link, $streamGroup, $dateOfIssue) {
    mysqli_set_charset($link, "utf8");
    $checkQuery = "SELECT sum(case when Is_a_head_of_group = 1 then 1 else 0 end) HeadOfGroup FROM student WHERE Group_number='$streamGroup' AND Date_of_issue_of_student_ticket='$dateOfIssue'";

    $checkResult = mysqli_query($link, $checkQuery);

    while ($headOfGroup = mysqli_fetch_array($checkResult)) {
        return $headOfGroup["HeadOfGroup"];
	}
}

