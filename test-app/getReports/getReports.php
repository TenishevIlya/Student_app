<?php
    include("./utils/excelConverter.php");
    include("./utils/txtConverter.php");
    include("../allAppUtils/connection.php");
    include("../allAppUtils/getGroupNumbers.php");
    include("../allAppUtils/calculateAvailableCourses.php");
    $link = createConnection();
    $num = 0;

    session_start();

    if (isset($_POST["format4And5"])) {
        $tableValues = ["Surname", "Name", "Patronymic", "group_number"];
        $sqlValues = array();
       
        if (isset($_POST["get4and5"])) {
            if ($_POST["format4And5"] === "txt") {
                convertToTxt($link, $sqlValues, $tableValues, null, "4and5");
            }
            else {
                convertToExcel($link, $sqlValues, $tableValues, "4and5");
            }
        }
    }

    if (isset($_POST["formatGender"])) {
        $tableValues = ["Men", "Women"];
        $transletedTableValues = ["Юноши", "Девушки"];
        $sqlValues = array("allGroupsForGenders" => $_POST["allGroupsForGenders"]);
       
        if (isset($_POST["getGendersData"])) {
            if ($_POST["formatGender"] == "txt") {
                convertToTxt($link, $sqlValues, $tableValues, $transletedTableValues, "gender");
            }
            else {
                convertToExcel($link, $sqlValues, $tableValues, "gender");
            }
        }
    }  
    if (isset($_POST["formatSubjectMarks"])) {
        $exam;
        if (isset($_POST["subjects"])) {
            $exam = $_POST["subjects"];
        }

        $tableValues = ["Mark", "Mark_quantity"];
        $sqlValues = array("examId" => $exam, 
                           "fullGroupNumber" => $_SESSION["fullGroupNumber"],
                           "DateOfIssue" => $_SESSION["DateOfIssue"]);
        $transletedTableValues = ["Оценка", "Количество"];                   
       
        if (isset($_POST["formatSubjectMarks"])) {
            if (isset($_POST["getAllSubjectMarks"])) {
                if ($_POST["formatSubjectMarks"] == "txt") {
                    convertToTxt($link, $sqlValues, $tableValues, $transletedTableValues, "subjectMarks");
                }
                else {
                    convertToExcel($link, $sqlValues, $tableValues, "subjectMarks");
                }
            }
        } 
    } 
?>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    </head>
    <body>
        <nav class="navbar navbar-expand-lg navbar-light bg-secondary">
            <a class="navbar-brand" href="#">Студенты</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a href="../index.php" class="mr-3">На главную</a>
            <a href="../addStudent/addStudent.php" class="mr-3">Добавить информацию о студенте</a>
            <a href="../addExam/addExam.php" class="mr-3">Добавить информацию об экзамене</a>
        </nav>

        <div class="container mt-3">
            <div>
                <div>
                    <h4 class="h4">Сводная информация об экзамене по определенному предмету в одной группе</h4> 
                    <div class="row">
                        <div class="col-6">
                            <form action="<?=$_SERVER['REQUEST_URI']?>" method=post id = "list_of_group">
                            Выберите группу: <select name=numbers_of_group onchange = "document.getElementById('list_of_group').submit();" class="custom-select" id="select-group">
                                <option value="0"> Группа </option>
                                <?php
                                setAllGroupNumbers($link, null);
                                ?>
                                </select>
                            </form>
                            <p> Выберите курс:
                                <form action="<?=$_SERVER['REQUEST_URI']?>" method=post id = "list_of_course"'>
                                    <select name=number_of_course onchange = "document.getElementById('list_of_course').submit()" class="custom-select">
                                        <option value="0"> Курс </option>
                                        <?php
                                        calculateAvailableCourses($_POST['numbers_of_group']);
                                        ?>
                                </form>
                            </p>
                            <p>
                                <?php
                                    error_reporting(0); 
                                    $course=0;
                                    $num = 0;
                                    if (isset($_POST["number_of_course"])) {
                                        $num = $_POST["number_of_group"];
                                        $subjectCourse = $_POST["number_of_course"];
                                        
                                        $studentCourse = $num[0];
                                        $group = $num[1]. $num[2]; //?
                                        
                                        $_SESSION["subjectCourse"] = $_POST["number_of_course"];
                                        $_SESSION["studentCourse"] = $studentCourse;
                                        $_SESSION["group"] = $group;
                                        $_SESSION["fullGroupNumber"] = $num;
                                        $_SESSION["DateOfIssue"] = (date("Y")-$studentCourse)."-09-01";
                                    }
                                    $current_course=($num-$num%100)/100;
                                ?>
                            
                                <?php	
                                    if($num==0)			
                                    echo "<p>Студенты факультета математики и ИТ";
                                    else echo "<p>Студенты " .$num." группы";
                                ?>
                                <?php	

                                    $select_course = $num[0];
                                    $group = $num[1]. $num[2]; //?

                                    // $last_num=$num%100;
                                    // $lastGroup = $num[1].$num[2];
                                    
                                ?>
                            </p>
                        </div>
                    </div>
                    <form method="post">
                        <div class="row">
                            <div class="col-6">
                                <?php	
                                    include("../allAppUtils/getSelectOfExams.php");
                                    createSelectOfExams($link, $subjectCourse, $group);
                                ?>  
                                <label for="formatSubjectMarks">Выберите формат очета: </label>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input
                                        type="radio"
                                        id="marks1"
                                        name="formatSubjectMarks"
                                        class="custom-control-input"
                                        value="txt"
                                    />
                                    <label class="custom-control-label" for="marks1"
                                        >Текстовый документ</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input
                                        type="radio"
                                        id="marks2"
                                        name="formatSubjectMarks"
                                        value="xls"
                                        class="custom-control-input"
                                    />
                                    <label class="custom-control-label" for="marks2"
                                        >Excel</label>
                                </div>
                            </div>
                            <div class="col-2"></div>
                            <div class="col-2"></div>
                        </div>
                        <button class='btn btn-primary btn-sm mt-1' id="btn" name='getAllSubjectMarks' type="submit">Получить данные</button>
                    </form>
                </div>
                <hr>
                <form method="post">
                    <h4 class="h4">Анкетные данные студентов, сдавших все экзамены на 4 и 5</h4>
                    <div class="row mt-1">
                        <div class="col-6">
                            <label for="format4And5">Выберите формат очета: </label>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input
                                    type="radio"
                                    id="customRadioInline1"
                                    name="format4And5"
                                    class="custom-control-input"
                                    value="txt"
                                />
                                <label class="custom-control-label" for="customRadioInline1"
                                    >Текстовый документ</label>
                            </div>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input
                                    type="radio"
                                    id="customRadioInline2"
                                    name="format4And5"
                                    value="xls"
                                    class="custom-control-input"
                                />
                                <label class="custom-control-label" for="customRadioInline2"
                                    >Excel</label>
                            </div>
                        </div>
                        <div class="col-2"></div>
                        <div class="col-2"></div>
                    </div>
                    <button class='btn btn-primary btn-sm mt-1' name='get4and5' type="submit">Получить данные</button>
                </form>
                <hr>
                <form method="post">
                    <h4 class="h4">Гендерный анализ</h4>
                    <div class="row mt-1">
                        <div class="col-6">
                            <p class='mb-1'>Выберите группу
                            <select name="allGroupsForGenders" class="form-control">
                                <?php 
                                    setAllGroupNumbers($link, null);
                                ?>
                            </select></p>
                            <label for="format">Выберите формат очета: </label>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input
                                    type="radio"
                                    id="gender1"
                                    name="formatGender"
                                    class="custom-control-input"
                                    value="txt"
                                />
                                <label class="custom-control-label" for="gender1"
                                    >Текстовый документ</label>
                            </div>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input
                                    type="radio"
                                    id="gender2"
                                    name="formatGender"
                                    value="xls"
                                    class="custom-control-input"
                                />
                                <label class="custom-control-label" for="gender2"
                                    >Excel</label>
                            </div>
                        </div>
                        <div class="col-2"></div>
                        <div class="col-2"></div>
                    </div>
                    <button class='btn btn-primary btn-sm mt-1' name='getGendersData' type="submit">Получить данные</button>
                </form>
            </div>
            <hr>
        </div>

        <script>
            let btn = document.getElementById("btn");
            let subjects = document.getElementById("allSubjectsList");
            btn.addEventListener("click", () => {
                console.log(<?php 
                    echo $select_course;
                    echo $group;    
                ?>);
                localStorage.setItem("subject", subjects.value);
            });
            console.log(<?php print_r(mysqli_fetch_array($getInfoQueryRes))?>)
        </script>

        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    </body>
</html>