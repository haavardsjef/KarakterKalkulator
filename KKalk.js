$(document).ready(function() {
    $(document).on('click', ' .delete', function() {
        $(this).parents("tr").remove();
        updateTotals();
        saveState();
    });
});

function addSubject(subjectId, subjectName, grade, points) {
    var deleteButton = '<button class="delete btn btn-danger">Slett</button>'
    var row = '<tr>' +
        '<td>' + subjectId + '</td>' +
        '<td>' + subjectName + '</td>' +
        '<td>' + grade + '</td>' +
        '<td>' + points + '</td>' +
        '<td>' + deleteButton + '</td>' +
        '</tr>';
    $("#karaktertable").append(row);
    updateTotals();
    saveState();
}

function getInput() {
    /*if (validateInput()){*/
    var subjectId = document.getElementById("subjectId").value;
    var subjectName = document.getElementById("subjectName").value;
    var grade = document.getElementById("grade").value;
    var points = document.getElementById("points").value;
    addSubject(subjectId, subjectName, grade, points);
    /*}*/
}

function getPoints() {
    var table = document.getElementById('karaktertable');
    var sum = 0;
    for (var r = 1, n = table.rows.length; r < n; r++) {
        sum += parseFloat(table.rows[r].cells[3].innerHTML);
    }
    return sum;
}

function getAverage() {
    return convertToAlphabetical(getNumericalAverage());
}

function getNumericalAverage() {
    var table = document.getElementById('karaktertable');
    var sum = 0.0;
    for (var r = 1, n = table.rows.length; r < n; r++) {
        sum += convertToNumerical(table.rows[r].cells[2].innerHTML) * parseFloat(table.rows[r].cells[3].innerHTML);
    }
    return sum / getPoints();
}

function convertToNumerical(grade) {
    if (grade == "A") {
        return 5.0;
    }
    if (grade == "B") {
        return 4.0;
    }
    if (grade == "C") {
        return 3.0;
    }
    if (grade == "D") {
        return 2.0;
    }
    if (grade == "E") {
        return 1.0;
    }
    return 0.0;
}

function convertToAlphabetical(grade) {
    if (grade >= 4.5) {
        return "A";
    }
    if (grade >= 3.5) {
        return "B";
    }
    if (grade >= 2.5) {
        return "C";
    }
    if (grade >= 1.5) {
        return "D";
    }
    if (grade >= 0.5) {
        return "E";
    }
    return "F";
}

function updateTotals() {
    var average = document.getElementById("average");
    var numericalAverage = document.getElementById("numericalAverage");
    var totalPoints = document.getElementById("totalPoints");
    average.innerHTML = getAverage();
    numericalAverage.innerHTML = Math.round(getNumericalAverage() * 10) / 10;
    totalPoints.innerHTML = Math.round(getPoints() * 10) / 10;
}

function validateInput() {
    var validGrades = ["A", "B", "C", "D", "E"];
    var grade = document.forms["addSubject"]["grade"].value;
    var points = document.forms["addSubject"]["points"].value;
    if (validGrades.indexOf(grade) == -1) {
        alert("Må inneholde gyldig karakter!");
        return false;
    }
    if (points < 0 || isNaN(points) || points == "") {
        alert("Studiepoeng må være et all over 0!")
        return false;
    }
    return true;
}

function removeSubject() {
    // Not yet implemented
    updateTotals();
}

function getSubjectIds() {
    var table = document.getElementById('karaktertable');
    var ids = [];
    for (var r = 1, n = table.rows.length; r < n; r++) {
        ids.push(table.rows[r].cells[0].innerHTML);
    }
    return ids;
}


function getSubjectNames() {
    var table = document.getElementById('karaktertable');
    var names = [];
    for (var r = 1, n = table.rows.length; r < n; r++) {
        names.push(table.rows[r].cells[1].innerHTML);
    }
    return names;
}


function getGrades() {
    var table = document.getElementById('karaktertable');
    var grades = [];
    for (var r = 1, n = table.rows.length; r < n; r++) {
        grades.push(table.rows[r].cells[2].innerHTML);
    }
    return grades;
}


function getPointsArray() {
    var table = document.getElementById('karaktertable');
    var points = [];
    for (var r = 1, n = table.rows.length; r < n; r++) {
        points.push(table.rows[r].cells[3].innerHTML);
    }
    return points;
}

function saveState() {
    var info = [getSubjectIds(), getSubjectNames(), getGrades(), getPointsArray()];
    if (info != []) {
        localStorage.setItem("grades", info);
    } else {
        localStorage.removeItem("grades");
    }


}

function loadState() {
    clearTable();
    var x = "" + localStorage.getItem("grades");
    if (x != ",,,") {
        var y = x.split(',');
        var numb = y.length / 4;
        for (var i = 0; i < numb; i++) {
            addSubject(y[i], y[i + numb], y[i + numb * 2], y[i + numb * 3]);
        }
    }

}

function clearTable() {
    var table = document.getElementById('karaktertable');
    var rows = table.rows.length;
    for (i = 1; i < rows; i++) {
        table.deleteRow(1);
    }
}