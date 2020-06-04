<?php

function get4And5Students($link) {
    $getInfoQuery = "SELECT Surname, Name, Patronymic, concat(case when YEAR(NOW())-YEAR(student.Date_of_issue_of_student_ticket) > 4 then '4' else YEAR(NOW())-YEAR(student.Date_of_issue_of_student_ticket) end ,Group_number) AS group_number INTO OUTFILE 'Загрузки/info.txt' FROM student INNER JOIN exam ON student.Id = exam.Student_id WHERE exam.Mark != 3 AND Mark != 2 AND Mark != 'Зачёт' GROUP BY Surname ORDER BY group_number";
    $getInfoQueryRes = mysqli_query($link, $getInfoQuery);

    $fp = fopen("info.txt", "r+");
    $mytext = "Это строку необходимо нам записать\r\n"; // Исходная строка
    $test = fwrite($fp, $mytext); // Запись в файл
   
    // if (file_exists("info.txt")) {
    //     $mytext = "Это строку необходимо нам записать\r\n";
    // }

    if (file_exists("info.txt")) {
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        //header('Content-Disposition: attachment; filename="'.basename("info.txt").'"');
        // header('Expires: 0');
        // header('Cache-Control: must-revalidate');
        // header('Pragma: public');
        header('Content-Length: ' . filesize("info.txt"));
        readfile("info.txt");
        exit;
    }
    fclose($fp);

    // if ($getInfoQueryRes) {
    //     echo "Получены данные";
    // }
    // else {
    //     echo "Запрос не выполнен";
    // }
}
