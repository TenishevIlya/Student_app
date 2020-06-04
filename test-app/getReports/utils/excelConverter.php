<?php

require('Classes/PHPExcel.php');

function convertToExcel($link, $sqlValues, $tableValues, $type) {

    $getInfoQuery = "";

    $objPHPExcel = new PHPExcel();

    $index = 4;
    $objPHPExcel->setActiveSheetIndex(0);

    $sheet = $objPHPExcel->getActiveSheet();

    $examName = "";
    $cellsLetters = ["A","B","C","D"];
    $fileName = "";

    switch($type) {
        case "subjectMarks":
            $issueDate = $sqlValues["DateOfIssue"];
            $getInfoQuery = "SELECT Mark, Mark_quantity, Name, Date_of_issue_of_student_ticket FROM countmarks WHERE Id = ".$sqlValues['examId']." AND Date_of_issue_of_student_ticket='$issueDate'";
            $sheet->setCellValue("A3", "Оценка:");
            $sheet->setCellValue("B3", "Количество:");
            break;
        case "4and5":
            $fileName = "Анкетные_данные_студентов_с_4_и_5";
            $getInfoQuery = "SELECT * FROM studentwith4and5mark";
            $sheet->setCellValue("A1", "Анкетные данные студентов, сдавших все экзамены на '4' и '5':");
            $sheet->setCellValue("A3", "Фамилия:");
            $sheet->setCellValue("B3", "Имя:");
            $sheet->setCellValue("C3", "Отчество:");
            $sheet->setCellValue("D3", "Группа:");
            break;    
        case "gender":
            $fileName = "Гендерный_анализ_".$sqlValues["allGroupsForGenders"];
            $sheet->setCellValue("A1", "Гендерный анализ студентов в : ".$sqlValues["allGroupsForGenders"]." группе");
            $sheet->setCellValue("A3", "Юноши:");
            $sheet->setCellValue("B3", "Девушки:");
            $getInfoQuery = "SELECT * FROM allgroupsgenders WHERE current_group=".$sqlValues["allGroupsForGenders"]."";
            break;      
    }
    
    $getInfoQueryRes = mysqli_query($link, $getInfoQuery);

    while ($fieldInfo = mysqli_fetch_array($getInfoQueryRes)) {
        if ($type == "subjectMarks") {
            $examName = $fieldInfo["Name"];
            $fileName = "Результаты_аттестации_по_".$examName;
        }
        for ($i = 0; $i < count($tableValues); $i++) {
            $currentField = $fieldInfo[$tableValues[$i]];
            $sheet->setCellValue($cellsLetters[$i].$index, $currentField);
        }
        $index++;
    } 

    if ($type == "subjectMarks") {
        $sheet->setCellValue("A1", 'Результаты экзамена по предмету '.$examName.' в '.$sqlValues["fullGroupNumber"].' группе');
    }

    // Rename worksheet
    $objPHPExcel->getActiveSheet()->setTitle('Simple');


    //Set active sheet index to the first sheet, so Excel opens this as the first sheet
    $objPHPExcel->setActiveSheetIndex(0);


    // Redirect output to a client’s web browser (Excel5)
    header('Content-Type: application/vnd.ms-excel');
    header('Content-Disposition: attachment;filename="'.$fileName.'.xls"');
    header('Cache-Control: max-age=0');
    // If you're serving to IE 9, then the following may be needed
    header('Cache-Control: max-age=1');

    // If you're serving to IE over SSL, then the following may be needed
    header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
    header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
    header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
    header ('Pragma: public'); // HTTP/1.0

    $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
    $objWriter->save('php://output');
    exit;
}
