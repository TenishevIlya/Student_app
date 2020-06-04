<?php

function convertToTxt($link, $sqlValues, $tableValues, $transletedTableValues, $type) {
    $getInfoQuery = "";
    $index = 0;
    $fp = null;

    switch($type) {
        case "subjectMarks":
            $fileName = "Результаты_аттестации_по_";
            $issueDate = $sqlValues["DateOfIssue"];
            $getInfoQuery = "SELECT Mark, Mark_quantity, Name, Date_of_issue_of_student_ticket FROM countmarks WHERE Id = ".$sqlValues['examId']." AND Date_of_issue_of_student_ticket='$issueDate'";
            break;
        case "4and5":
            $fileName = "Анкетные_данные_студентов_с_4_и_5";
            $getInfoQuery = "SELECT * FROM studentwith4and5mark";
            break;    
        case "gender":
            $fileName = "Гендерный_анализ_".$sqlValues["allGroupsForGenders"];
            $getInfoQuery = "SELECT * FROM allgroupsgenders WHERE current_group=".$sqlValues["allGroupsForGenders"]."";
            break;      
    }


    $getInfoQueryRes = mysqli_query($link, $getInfoQuery);

    if (file_exists($fileName)) {
        $fp = fopen($fileName, "r+");
        fwrite($fp,"");
    }
    else {
        $fp = fopen($fileName, "x+");
        fwrite($fp,"");
    }

    while ($fieldInfo = mysqli_fetch_array($getInfoQueryRes)) {
        if ($transletedTableValues == null) {
            for ($i = 0; $i < count($tableValues); $i++) {
                $currentField = $fieldInfo[$tableValues[$i]];
                fwrite($fp, $currentField." ");
            }
        }
        else {
            for ($i = 0; $i < count($tableValues); $i++) {
                $currentField = $fieldInfo[$tableValues[$i]];
                fwrite($fp, $transletedTableValues[$i].": ".$currentField." ");
            }
        }
        fwrite($fp, "\n");
        $index++;
    } 

    header('Content-Description: File Transfer');
    header('Content-Type: text/plain');
    header('Content-Disposition: attachment; filename='.$fileName.'.txt');
    header('Content-Length: ' . filesize($fileName));
    readfile($fileName);
    exit;
    fclose($fp);
}
