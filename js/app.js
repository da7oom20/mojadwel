/**==== Global Variables ====**/
// Used with every section in Table array to manage add and remove
var id = 1;
// Used To Know Gender
var isMale;

/**==== Functions ====**/
function showCourseNumbers(arry) {
    $("option[value='courseNumber']").remove();
    arry.forEach(function(element){
        $("select[name='course-no']").append("<option value='courseNumber'>" + element.number + " - " + element.name +"</option>");
    });
}
function getTextTime(tbody) {
    var textTime = "";
    var allTRs = $(tbody).find('tr');
    var allTDs;
    var days, time;
    for(var i = 1; i < allTRs.length; i++){
        allTDs = $(allTRs[i]).find('td');
        if ($(allTDs[0]).text() === "اختبار"){
            continue;
        }
        time = $(allTDs[1]).text();

        if (time.indexOf(":") === 2 && time.lastIndexOf(":") === 13) {
            time = time.substring(11,16) + ' - ' + time.substring(0,5);
        } else if (time.indexOf(":") === 2 && time.lastIndexOf(":") === 12) {
            time = time.substring(10,15) + ' - ' + time.substring(0,5);
        } else if (time.indexOf(":") === 1 && time.lastIndexOf(":") === 11) {
            time = time.substring(10,14) + ' - ' + time.substring(0,4);
        } else if (time.indexOf(":") === 1 && time.lastIndexOf(":") === 12) {
            time = time.substring(10,15) + ' - ' + time.substring(0,4);
        }
        days = $(allTDs[2]).text();
        textTime += time + " : " + days + "<br/>";
    }
    return textTime;
}
function getNumberOfDay(charachterOfDay) {
    switch (charachterOfDay) {
        case 'U': return 1; break;
        case 'M': return 2; break;
        case 'T': return 3; break;
        case 'W': return 4; break;
        case 'R': return 5; break;
    }
}
function getTimesArray(tbody) {
    var times = [];
    var timeSlots = [];
    var allTRs = $(tbody).find('tr');
    var allTDs;
    for(var i = 1; i < allTRs.length; i++){
        allTDs = $(allTRs[i]).find('td');
        if ($(allTDs[0]).text() === "اختبار"){
            continue;
        }
        var days = $(allTDs[2]).text();
        var fromTo = $(allTDs[1]).text();
        var startHour = fromTo.charAt(1) === ":" ? Number(fromTo.substring(0, 1)) : Number(fromTo.substring(0, 2));
        var startMinute = fromTo.charAt(1) === ":" ? Number(fromTo.substring(2, 4)) : Number(fromTo.substring(3, 5));
        var lastIndexOfColon = fromTo.lastIndexOf(":");
        var endHour = Number(fromTo.substring(lastIndexOfColon - 2, lastIndexOfColon));
        var endMinute = Number(fromTo.substring(lastIndexOfColon + 1, lastIndexOfColon + 3));
        while ( !(startHour === endHour && startMinute === endMinute) ) {
            timeSlots.push((String(startHour).length === 1? "0" + String(startHour) : String(startHour)) + (String(startMinute).length === 1? "0" + String(startMinute) : String(startMinute)));
            startMinute += 5;
            if (startMinute === 60) {
                startMinute = 0;
                startHour++;
            }
            if (startHour === 13)
                startHour = 1;
        }
        for (var j = 0; j < days.length; j++) {
            times.push({
                day: getNumberOfDay(days.charAt(j)),
                times: timeSlots.slice(0)
            });
        }
        timeSlots.length = 0;
    }
    return times;
}
function getColor() {
    for (var h = 0; h < colors.length; h++) {
        if (colors[h].isUsed == false){
            colors[h].isUsed = true;
            return colors[h].color;
        }
    }
    return "#45aaf2";
}
function getDayOfLecture(number) {
    switch (number) {
        case 1: return "الأحد";
        case 2: return "الاثنين";
        case 3: return "الثلاثاء";
        case 4: return "الأربعاء";
        case 5: return "الخميس";
    }
}
function getIndexOfDeletedSection(id) {
    for (var i = 0; i < table.array.length; i++) {
        if (table.array[i].id === id)
            return i;
    }
    return -1;
}
function minutesPlus5(time) {
    time = Number(time);
    time += 5;
    time = String(time);
    if (time.length === 1) {
        return "0" + time;
    } else {
        return time;
    }
}
$.cssHooks.backgroundColor = {
    get: function(elem) {
        if (elem.currentStyle)
            var bg = elem.currentStyle["background-color"];
        else if (window.getComputedStyle)
            var bg = document.defaultView.getComputedStyle(elem,
                null).getPropertyValue("background-color");
        if (bg.search("rgb") == -1)
            return bg;
        else {
            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
        }
    }
}

/**==== Objects ====**/
//object to get sections and save them to sections array and add them to table array
var sections = {
    array: [],
    emptyArray: function () {
        this.array.length = 0;
    }
};
//object to deal with table
var table = {
    array: []
};
// colors object
var colors = [
    {
        color: "#45aaf2",
        isUsed: false
    },
    {
        color: "#4b6584",
        isUsed: false
    },
    {
        color: "#20bf6b",
        isUsed: false
    },
    {
        color: "#eb3b5a",
        isUsed: false
    },
    {
        color: "#ccae62",
        isUsed: false
    },
    {
        color: "#f7b731",
        isUsed: false
    },
    {
        color: "#fc848b",
        isUsed: false
    },
    {
        color: "#2f3640",
        isUsed: false
    },
    {
        color: "#192a56",
        isUsed: false
    },
    {
        color: "#7f8c8d",
        isUsed: false
    },
    {
        color: "#8854d0",
        isUsed: false
    },
    {
        color: "#278f85",
        isUsed: false
    }
];

/**==== Event listeners ====**/
// Get gender and disable changing gender
$("select[name='gender']").change(function () {
    // Assign Gender
    isMale = $("select[name='gender'] option:selected").attr("value") === "male"? true : false;
    // Disable gender choice
    $(this).attr("disabled", "disabled");
    // Enable course department choice
    $("select[name='course-dep']").removeAttr("disabled");
    // Enable course number choice
    $("select[name='course-no']").removeAttr("disabled");
});

// Change course numbers when department is changed
$("select[name='course-dep']").change(function () {
    switch ($("select[name='course-dep'] option:selected").attr("value")) {
        case "cs": showCourseNumbers(csCourses); break;
        case "is": showCourseNumbers(isCourses); break;
        case "it": showCourseNumbers(itCourses); break;
        case "ms": showCourseNumbers(msCourses); break;

        case "math": showCourseNumbers(mathCourses); break;
        case "stat": showCourseNumbers(statCourses); break;
        case "phys": showCourseNumbers(physCourses); break;

        case "acco": showCourseNumbers(accoCourses); break;
        case "econ": showCourseNumbers(econCourses); break;
        case "mgmt": showCourseNumbers(mgmtCourses); break;

        case "eng": showCourseNumbers(engCourses); break;

        case "qur": showCourseNumbers(qurCourses); break;
        case "aqd": showCourseNumbers(aqdCourses); break;
        case "fqh": showCourseNumbers(fqhCourses); break;
        case "nho": showCourseNumbers(nhoCourses); break;
        case "elm": showCourseNumbers(elmCourses); break;
        case "trk": showCourseNumbers(trkCourses); break;
        case "thqf": showCourseNumbers(thqfCourses); break;
    }
});

// Get sections button = Will get the page and send it to sections object to process it
$("#getSections").click(function () {
    // If didn't choose gender and dep and course warn the user
    if (isMale === undefined || $("select[name='course-dep']").val() === null || $("select[name='course-no']").val() === null) {
        swal("يجب عليك اختيار (طالب/طالبة) و (رمز المقرر) و (رقم المقرر) قبل عرض الشعب المتاحة", {
            button: "حسناً",
            icon: "info"
        });
        return;
    }

    var getSectionsButton = $("#getSections");
    var loader = $(".loader");
    var section = $("select[name='course-dep'] option:selected").text() + ' - ' + $("select[name='course-no'] option:selected").text();
    //Empty sections table
    $("#sections-table tbody tr").remove();
    //Empty sections array
    if (sections.array.length > 0) {
        sections.emptyArray();
    }
    //Remove get sections button - for not to receive more than one request at a time.
    getSectionsButton.attr('disabled', 'true');
    getSectionsButton.toggleClass('blue');
    getSectionsButton.toggleClass('gray');
    getSectionsButton.css('cursor', 'not-allowed');
    //Show loader
    loader.toggleClass("d-none");


    $.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent('https://iussb.imamu.edu.sa/PROD_ar/bwckctlg.p_disp_listcrse?term_in=143920&subj_in='
        + $("select[name='course-dep'] option:selected").text().substring(0,3) + '&crse_in='
        + $("select[name='course-no'] option:selected").text().substring(0,3)
        + '&schd_in=01') + '&callback=?', function(data){

        //this is the whole page
        var page = $($.parseHTML(data.contents.substring(3463, data.contents.length - 1764)));
        //allTitles will be an array of "th" objects which is like تراكيب محددة - 20332 - عال 104 - 173
        var allTitles = page.find('th.ddtitle');
        //allDeatis will be an array of "tr" objects of each row of datadisplaytable tables
        var allDetails = page.find('table.datadisplaytable tbody');
        var sectionDeatils;
        //If not found any section alert that
        var foundSections = false;
        var sectionID = 0;
        /**Male Student**/
        if (isMale) {
            for (var i = 0; i < allTitles.length; i++) {
                sectionDeatils = $(allTitles[i]).text().split(" - ");
                if (Math.floor(sectionDeatils[3]/10) === 17) {
                    foundSections = true;
                    $("table#sections-table tbody").append(
                        "<tr id=\"" + sectionID + "\">" +
                        "<td>"+ sectionDeatils[2].substring(0, 3) +"</td>" +
                        "<td>" + sectionDeatils[2].substring(4, 7) + "</td>" +
                        "<td>" + sectionDeatils[0] + "</td>" +
                        "<td>" + sectionDeatils[3] + "</td>" +
                        "<td class='crn'>" + sectionDeatils[1] + "</td>" +
                        "<td dir='ltr'>" + getTextTime(allDetails[i]) + "</td>" +
                        "<td>" +
                        "<button type=\"button\" class=\"add\">+</button>" +
                        "</td>"
                        +"</tr>"
                    );
                    sections.array.push({
                        id: sectionID,
                        dep: sectionDeatils[2].substring(0, 3),
                        number: sectionDeatils[2].substring(4, 7),
                        name: sectionDeatils[0],
                        section: sectionDeatils[3],
                        crn: sectionDeatils[1],
                        time:getTimesArray(allDetails[i])
                    });
                    // Color rows
                    if (sectionID % 2 === 0) {
                        $("table#sections-table tbody tr").last().css("background-color", "aliceblue");
                    }
                    // If section is already in timetable disable its add section button
                    var crn = sectionDeatils[1];
                    for (var j = 0; j < table.array.length; j++) {
                        if (table.array[j].crn === crn) {
                            var addSectionButton = $("#" + sectionID + " button");
                            addSectionButton.attr('disabled', 'true');
                            addSectionButton.toggleClass("btn-secondary");
                            addSectionButton.css('cursor', 'not-allowed');
                            break;
                        }
                    }
                    sectionID++;
                }
            }
        /**Female Student**/
        } else {
            for (var i = 0; i < allTitles.length; i++) {
                sectionDeatils = $(allTitles[i]).text().split(" - ");
                if (Math.floor(sectionDeatils[3]/10) === 37 || sectionDeatils[3] === 071) {
                    foundSections = true;
                    $("table#sections-table tbody").append(
                        "<tr id=\"" + sectionID + "\">" +
                        "<td>"+ sectionDeatils[2].substring(0, 3) +"</td>" +
                        "<td>" + sectionDeatils[2].substring(4, 7) + "</td>" +
                        "<td>" + sectionDeatils[0] + "</td>" +
                        "<td>" + sectionDeatils[3] + "</td>" +
                        "<td class='crn'>" + sectionDeatils[1] + "</td>" +
                        "<td dir='ltr'>" + getTextTime(allDetails[i]) + "</td>" +
                        "<td>" +
                        "<button type=\"button\" class=\"add\">+</button>" +
                        "</td>"
                        +"</tr>"
                    );
                    sections.array.push({
                        id: sectionID,
                        dep: sectionDeatils[2].substring(0, 3),
                        number: sectionDeatils[2].substring(4, 7),
                        name: sectionDeatils[0],
                        section: sectionDeatils[3],
                        crn: sectionDeatils[1],
                        time:getTimesArray(allDetails[i])
                    });
                    // Color rows
                    if (sectionID % 2 === 0) {
                        $("table#sections-table tbody tr").last().css("background-color", "aliceblue");
                    }
                    // If section is already in timetable disable its add section button
                    var crn = sectionDeatils[1];
                    for (var j = 0; j < table.array.length; j++) {
                        if (table.array[j].crn === crn) {
                            var addSectionButton = $("#" + sectionID + " button");
                            addSectionButton.attr('disabled', 'true');
                            addSectionButton.toggleClass("btn-secondary");
                            addSectionButton.css('cursor', 'not-allowed');
                            break;
                        }
                    }
                    sectionID++;
                }
            }
        }
        // If didn't find any Section
        if (foundSections === false) {
            swal("لا يوجد شعب متاحة لمادة:", section, "error", {button: "حسناً"});
        }

        //Hide loader
        loader.toggleClass("d-none");
        //Show get sections button
        getSectionsButton.removeAttr('disabled');
        getSectionsButton.toggleClass('gray');
        getSectionsButton.toggleClass('blue');
        getSectionsButton.css('cursor', 'pointer');


    }).fail(function(){
        swal("تعذّر جلب الشعب", "تأكد من اتصالك بالانترنت", "error", {button: "حسناً"});
        //Hide loader
        loader.toggleClass("d-none");
        //Show get sections button
        getSectionsButton.removeAttr('disabled');
        getSectionsButton.toggleClass('gray');
        getSectionsButton.toggleClass('blue');
        getSectionsButton.css('cursor', 'pointer');
    });
});


// Add section button = send section to table and draw it to the table
// "Delegated events" adds event listeners to elements added after page load is completed.
$("#sections-table").on("click", ".add", function () {
    var rowID = $(this).parent().parent().attr("id");
    var crn = sections.array[rowID].crn;

        // If section conflicts with another section
        var conflictMessage = "يوجد تعارض مع الشعب التالية : \n";
        var conflictExists = false;
        table.array.forEach(function (t) {
            t.time.forEach(function (t2) {
                sections.array[rowID].time.forEach(function (t3) {
                    if (t3.day === t2.day) {
                        // loop through times array to detect confliction.
                        loop1:
                        for (var i = 0; i < t2.times.length; i++) {
                            for (var j = 0; j < t3.times.length; j++) {
                                if (t2.times[i] === t3.times[j]) {
                                    conflictMessage += t.dep + " " + t.number + " - " + t.section + " : يوم " + getDayOfLecture(t2.day) + " " + t2.times[i].substring(0, 2) + ':' + t2.times[i].substring(2, 4) + "\n";
                                    conflictExists = true;
                                    break loop1;
                                }
                            }
                        }
                    }
                });
            });
        });

        if (conflictExists) {
            swal("هناك تعارض!", conflictMessage, "error", {button: "حسناً"});
        } else {
            $(this).attr('disabled', 'true');
            $(this).toggleClass("btn-secondary");
            $(this).css('cursor', 'not-allowed');
            table.array.push(sections.array[rowID]);
            table.array[table.array.length - 1].color = getColor();
            table.array[table.array.length - 1].id = id++;

            var lastElementInTableArray = table.array[table.array.length - 1];
            var selectedCell;
            for (var i = 0; i < lastElementInTableArray.time.length; i++) {
                for (var j = 0; j < lastElementInTableArray.time[i].times.length; j++) {
                    selectedCell = $('#timetable tbody tr#row' + lastElementInTableArray.time[i].times[j] + ' td.day' + lastElementInTableArray.time[i].day);
                    if (j !== 0) {
                        selectedCell.remove();
                    } else {
                        selectedCell.html(
                            '<span class="float-right">' + lastElementInTableArray.dep + ' ' + lastElementInTableArray.number + ' - ' + lastElementInTableArray.section + '</span>' +
                            '<span class="float-left d-none d-md-block">' + lastElementInTableArray.time[i].times[0].substring(0, 2) + ':' + lastElementInTableArray.time[i].times[0].substring(2, 4) + '</span><br>' +
                            '<span>' + (lastElementInTableArray.name.length > 15 ? lastElementInTableArray.name.substring(0, 15) + "..." : lastElementInTableArray.name) + '</span><br>' +
                            '<span class="float-right">' + '3193' + '</span>' +
                            '<span class="float-left d-none d-md-block">' + lastElementInTableArray.time[i].times[lastElementInTableArray.time[i].times.length - 1].substring(0, 2) + ':' + minutesPlus5(lastElementInTableArray.time[i].times[lastElementInTableArray.time[i].times.length - 1].substring(2, 4)) + '</span>'
                        );
                        selectedCell.css('background-color', "");
                        selectedCell.attr('style', 'background-color: ' + lastElementInTableArray.color);
                        selectedCell.attr('rowspan', lastElementInTableArray.time[i].times.length);
                        selectedCell.addClass("cell-" + lastElementInTableArray.id + "-table");
                        selectedCell.addClass("filled-cell");
                    }
                }
            }

            $("#added-sections-table tr:nth-child(1)").append('<td class="cell-' + lastElementInTableArray.id + '">' + lastElementInTableArray.dep + " " + lastElementInTableArray.number + "-" + lastElementInTableArray.section + '</td>');
            $("#added-sections-table tr:nth-child(2)").append('<td class="cell-' + lastElementInTableArray.id + '">' + lastElementInTableArray.crn + '</td>');
            $("#added-sections-table tr:nth-child(3)").append('<td class="cell-' + lastElementInTableArray.id + '"><button type="button" class="remove-button">-</button></td>');

            swal("تم إضافة الشعبة إلى الجدول بنجاح!", {
                buttons: false,
                timer: 1000,
                icon: "success"
            });
        }
});

// Remove section from table
$("#added-sections-table").on("click", ".remove-button", function () {
    var id = Number($(this).parent().attr("class").substring(5));
    var cells = $(".cell-" + id + "-table");
    var details = $(".cell-" + id);
    var color = cells.first().css("background-color");
    var index = getIndexOfDeletedSection(id);
    // Remove cells from timetable
    cells.each(function () {
        $(this).empty();
        $(this).removeAttr("style");
        $(this).toggleClass("filled-cell");
        $(this).toggleClass("cell-" + id + "-table");
        $(this).removeAttr("rowspan");
    });
    // Add deleted cells
    table.array[index].time.forEach(function (t) {
        for (var i = 1; i < t.times.length; i++) {
            if (t.day === 1) {
                if (t.times[i].substring(2, 4) === "00"){
                    $('<td class="day' + t.day + '"></td>').insertAfter( $("#row" + t.times[i] + " th"));
                } else {
                    $("#row" + t.times[i]).prepend('<td class="day' + t.day + '"></td>');
                }

            } else {
                var days = $("#row" + t.times[i] + " td");
                // console.log(days, "#row" + t.times[i] + " td");
                var foundBigger = false;
                for (var j = 0; j < days.length; j++) {
                   if (Number($(days[j]).attr("class").substring(3)) > t.day) {
                       $('<td class="day' + t.day + '"></td>').insertBefore( $(days[j]));
                       foundBigger = true;
                       break;
                   }
                }
                // When tr is empty or there is no bigger number
                if (!foundBigger) {
                    $("#row" + t.times[i]).append('<td class="day' + t.day + '"></td>');
                }
                // days = $("#row" + t.times[i] + " td");
                // console.log(days, "#row" + t.times[i] + " td");
            }
        }
    });
    // Remove details from added sections table
    details.each(function () {
        $(this).remove();
    });
    // Clear add section button if exists in sections table.
    for (var i = 0; i < sections.array.length; i++) {
        if (sections.array[i].crn === table.array[index].crn) {
            var addSectionButton = $("#" + i + " button");
            addSectionButton.removeAttr('disabled');
            addSectionButton.toggleClass("btn-secondary");
            addSectionButton.css('cursor', 'pointer');
        }
    }
    // Delete section from table array
    table.array.splice(index, 1);
    // Clear color from color object
    for(var i = 0; i < colors.length; i++){
        if (colors[i].color === color) {
            colors[i].isUsed = false;
            break;
        }
    }

    swal("تم إزالة الشعبة بنجاح!", {
        buttons: false,
        timer: 700,
        icon: "success"
    });
});