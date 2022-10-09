var dataset = [];
var columns = [];
var weatherDataset = [];
var weatherColumns = [];
const midnight = [0, 6];
const morning = [6, 12];
const afternoon = [12, 18];
const night = [18, 0];

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

$('document').ready(function(){
    $('#d').on('change', function() {
        $('button[id=submit]').attr('value', $(this).find(":selected").attr('value'));
    })
})

if (document.getElementById('upload') != null) {
    const uploadConfirm = document.getElementById('upload').addEventListener('click', () => {
        Papa.parse(document.getElementById('file').files[0],
        {
            download: true,
            //header: true,
            skipEmptyLines: true,
            complete: function(results) {
                var dorms = [];
                dataset = results.data;

                for (var i = 0; i < dataset[0].length; i++) {
                    var columnName = dataset[0][i];
                    var dashIndex = columnName.indexOf(' - ');
                    var dormName = columnName.substring(0, dashIndex);

                    columns.push(columnName);
                    
                    if (dashIndex > -1 && !dorms.includes(dormName)) {
                        var dorm = document.createElement('option');
                        dorm.value = dormName;
                        dorm.innerHTML = dormName;
                        dorm.id = dormName;
        
                        document.getElementById('options').appendChild(dorm);
    
                        dorms.push(dormName);
                    }
                }
                
                document.getElementById('submit').value = dorms[0];
            }
        })
    });

    const weatherConfirm = document.getElementById('upload').addEventListener('click', () => {
        Papa.parse(document.getElementById('weather').files[0],
        {
            download: true,
            //header: true,
            skipEmptyLines: true,
            complete: function(results) {

                weatherDataset = results.data;
                weatherColumns.push(weatherDataset[0][0]);

                for (var i = 1; i < weatherDataset[0].length; i++) {
                    var columnName = weatherDataset[0][i];
                    var dashIndex = columnName.indexOf(' - ');
                    columnName = columnName.substring(dashIndex + 3);

                    weatherColumns.push(columnName);
                }
            }
        }) 
    });
}

function analysis(button) {
    var dormName = button.value;

    /*
    var p = document.createElement('p');
    p.innerHTML = 'Analyzing ' + dormName;
    p.id = dormName;
    document.getElementById('d').appendChild(p);

    */

    var cols = [0];
    var colsName = [];

    for (var i = 1; i < dataset[0].length; i++) {
        if (dataset[0][i].includes(dormName)) {
            cols.push(i);
            colsName.push(dataset[0][i]);
        }
    }

    var allTotalSums = [];
    var allMidNightSums = [];
    var allMorningSums = [];
    var allAfternoonSums = [];
    var allNightSums = [];

    var totalSums = [];
    var midNightSums = [];
    var morningSums = [];
    var afternoonSums = [];
    var nightSums = [];

    var totalWeathers = [];
    var midNightWeathers = [];
    var morningWeathers = [];
    var afternoonWeathers = [];
    var nightWeathers = [];
    
    var days = 0.0;
    var midNightDays = 0.0;
    var morningDays = 0.0;
    var afternoonDays = 0.0;
    var nightDays = 0.0;

    var allDays = 0.0;
    var allMidNightDays = 0.0;
    var allMorningDays = 0.0;
    var allAfternoonDays = 0.0;
    var allNightDays = 0.0;
    
    var colIndex = 1;

    var lastMonthAvg = [];
    
    var currMonthAvg = [];

    var lastMonthdays = 0.0;
    var currMonthDays = 0.0;

    var currYear = 2022;
    var currMonth = 10;
    var lastMonth = currMonth - 1;


    for (var i = 1; i < dataset[0].length; i++) {
        var totalSum = 0.0;
        var midNightSum = 0.0;
        var morningSum = 0.0;
        var afternoonSum = 0.0;
        var nightSum = 0.0;

        var allTotalSum = 0.0;
        var allMidNightSum = 0.0;
        var allMorningSum = 0.0;
        var allAfternoonSum = 0.0;
        var allNightSum = 0.0;

        var lastMonthSum = 0.0;
        var currMonthSum = 0.0;

        for (var j = 1; j < dataset.length; j++) {
            var value = parseFloat(dataset[j][i]);
            var regex = /([0-1][0-9]|2[0-3]):00:00/g;
            var time = String(dataset[j][0].match(regex));
        
            if (cols.includes(i)) {


                var year = dataset[j][0].substring(0, 4);
                var month = dataset[j][0].substring(5, 7);
                time = time.substring(0, time.indexOf(':'));

                if (Number.isInteger(value) || isFloat(value) || value == 0) {
                    totalSum += value;
                    days += 1.0;

                    if (time >= midnight[0] && time < midnight[1]) {
                        midNightSum += value;
                        midNightDays += 1;
                    } else if (time >= morning[0] && time < morning[1]) {
                        morningSum += value;
                        morningDays += 1;
                    } else if (time >= afternoon[0] && time < afternoon[1]) {
                        afternoonSum += value;
                        afternoonDays += 1;
                    } else if (time >= night[0]) {
                        nightSum += value;
                        nightDays += 1;
                    }
                }

                if (Number.isInteger(value) || isFloat(value)) {

                    if (year == currYear && month == currMonth) {
                        currMonthSum += value;
                        currMonthDays += 1;
                    } 
                    
                    if (year == currYear && month == lastMonth) {
                        lastMonthSum += value;
                        lastMonthdays += 1;
                    }
    
                }
                
            }

            if (Number.isInteger(value) || isFloat(value) || value == 0) {
                allTotalSum += value;
                allDays += 1.0;

                if (time >= midnight[0] && time < midnight[1]) {
                    allMidNightSum += value;
                    allMidNightDays += 1;
                } else if (time >= morning[0] && time < morning[1]) {
                    allMorningSum += value;
                    allMorningDays += 1;
                } else if (time >= afternoon[0] && time < afternoon[1]) {
                    allAfternoonSum += value;
                    allAfternoonDays += 1;
                } else if (time >= night[0]) {
                    allNightSum += value;
                    allNightDays += 1;
                }
            }

        }

        if (cols.includes(i)) {
            totalSums.push(totalSum / days);
            midNightSums.push(midNightSum / midNightDays);
            morningSums.push(morningSum / morningDays);
            afternoonSums.push(afternoonSum / afternoonDays);
            nightSums.push(nightSum / nightDays);
            if (currMonthDays > 0) {
                currMonthAvg.push(currMonthSum / currMonthDays);          
            } else {
                currMonthAvg.push(null);
            }

            if (lastMonthdays > 0){
                lastMonthAvg.push(lastMonthSum / lastMonthdays);
            } else {
                lastMonthAvg.push(null);
            }
        }

        allTotalSums.push(allTotalSum / allDays);
        allMidNightSums.push(allMidNightSum / allMidNightDays);
        allMorningSums.push(allMorningSum / allMorningDays);
        allAfternoonSums.push(allAfternoonSum / allAfternoonDays);
        allNightSums.push(allNightSum / allNightDays);

        days = 0.0;
        midNightDays = 0.0;
        morningDays = 0.0
        afternoonDays = 0.0;
        nightDays = 0.0;

        allDays = 0.0;
        allMidNightDays = 0.0;
        allMorningDays = 0.0;
        allAfternoonDays = 0.0;
        allNightDays = 0.0;


        lastMonthdays = 0.0;
        currMonthDays = 0.0;
    }

    var modifiedAllTotalSums = [];
console.log(allTotalSums);
    for (var i = 1; i < cols.length; i++) {
        var count = 0.0;
        var sum2 = 0.0;

        var category = dataset[0][cols[i]];
        category = category.substring(category.indexOf(' - ') + 3);

        for (var j = 1; j < allTotalSums.length; j++) {
            if (dataset[0][j].includes(category)) {
                var num = parseFloat(allTotalSums[j-1]);
                console.log(dataset[0][j] + " " + category + "  " + num + " " + j + " " + allTotalSums[j-1]);
                if (num || num == 0) {
                    sum2 += num;
                    count += 1.0;
                    console.log('nice');
                }
            }
        }

      //  console.log(sum2 + " " + count + " " + category);
        modifiedAllTotalSums.push(sum2 / count);
    }
    



    for (var i = 1; i < weatherDataset[0].length; i++) {
        var totalWeather = 0.0;
        var midNightWeather = 0.0;
        var morningWeather = 0.0;
        var afternoonWeather = 0.0;
        var nightWeather = 0.0;


        days = 0.0;
        midNightDays = 0.0;
        morningDays = 0.0;
        afternoonDays = 0.0;
        nightDays = 0.0;

        for (var j = 1; j < weatherDataset.length; j++) {
            var value = parseFloat(weatherDataset[j][i]);

            if (Number.isInteger(value)) {
                totalWeather += value;
                days += 1;
                
                var regex = /([0-1][0-9]|2[0-3]):00:00/g;

                var time = String(dataset[j][0].match(regex));
                time = time.substring(0, time.indexOf(':'));

                if (time >= midnight[0] && time < midnight[1]) {
                    midNightWeather += value;
                    midNightDays += 1;
                } else if (time >= morning[0] && time < morning[1]) {
                    morningWeather += value;
                    morningDays += 1;
                } else if (time >= afternoon[0] && time < afternoon[1]) {
                    afternoonWeather += value;
                    afternoonDays += 1;
                } else if (time >= night[0]) {
                    nightWeather += value;
                    nightDays += 1;
                }  
            }
        }
        
        totalWeathers.push(totalWeather / days);
        midNightWeathers.push(midNightWeather / midNightDays);
        morningWeathers.push(morningWeather / morningDays);
        afternoonWeathers.push(afternoonWeather / afternoonDays);
        nightWeathers.push(nightWeather / nightDays);
    }


    var diff = [];
    for (var i = 0; i < cols.length; i++) {
        var amount = totalSums[i];
        var totalAmount = modifiedAllTotalSums[i];

        diff.push(totalAmount - amount);
    }

    var monthDiff = [];


    for (var i = 1; i < cols.length; i++) {
        var currAm = currMonthAvg[i - 1];
        var prevAm = lastMonthAvg[i - 1];

        monthDiff.push(prevAm - currAm);
    }


    var max = Number.MIN_SAFE_INTEGER;
    var min = Number.MAX_SAFE_INTEGER;

    var maxIndex = 0;
    var minIndex = 0;


    for (var i = 0; i < diff.length; i++) {
        if (diff[i] > max) {
            max = diff[i];
            maxIndex = i;
        } else if (diff[i] < min) {
            min = diff[i];
            minIndex = i;
        }
    }

    var monthMax = Number.MIN_SAFE_INTEGER;
    var monthMin = Number.MAX_SAFE_INTEGER;

    var monthMaxIndex = 0;
    var monthMinIndex = 0;

    for (var i = 0; i < monthDiff.length; i++) {
        if (monthDiff[i] > monthMax) {
            monthMax = monthDiff[i];
            monthMaxIndex = i;
        } else if (diff[i] < monthMin) {
            monthMin = monthDiff[i];
            monthMinIndex = i;
        }
    }



    var goodCamp = (max / modifiedAllTotalSums[maxIndex]);
    if (max >= 0) {
        document.getElementById('perc1').innerHTML = '-' + Math.round(goodCamp * 100) / 100 + '%';
    } else {
        document.getElementById('perc1').innerHTML = Math.round(goodCamp * 100) / 100 + '%';
    }

    var badCamp = ((min / modifiedAllTotalSums[minIndex]) * 100);
    if (min < 0) {
        document.getElementById('perc2').innerHTML = '+' + Math.round(-badCamp * 100) / 100 + '%';
    } else {
        document.getElementById('perc2').innerHTML = Math.round(badCamp * 100) / 100 + '%';
    }   

    var goodMonth = (monthMax / lastMonthAvg[monthMaxIndex] * 100);
    if (monthMax >= 0) {
        document.getElementById('perc3').innerHTML = "-" + Math.round(goodMonth * 100) / 100 + '%';
    } else {
        document.getElementById('perc3').innerHTML = Math.round(goodCamp * 100) / 100 + '%';
    }

    var badMonth= ((monthMin / lastMonthAvg[monthMinIndex]) * 100);
    if (monthMin < 0) {
        document.getElementById('perc4').innerHTML =  "+" + Math.round(-badMonth * 100) / 100 + '%';
    } else {
        document.getElementById('perc4').innerHTML = Math.round(badMonth * 100) / 100 + '%';
    }   

    var eType = String(dataset[0][cols[maxIndex]]);
    eType = eType.substring(eType.indexOf(' - ') + 3, eType.indexOf('Consumption'));
    document.getElementById('e1').innerHTML = eType;


    eType = dataset[0][cols[minIndex]];
    eType = eType.substring(eType.indexOf(' - ') + 3, eType.indexOf('Consumption'));
    document.getElementById('e2').innerHTML = eType;

    eType = dataset[0][cols[monthMinIndex]];
    eType = eType.substring(eType.indexOf(' - ') + 3, eType.indexOf('Consumption'));
    document.getElementById('e3').innerHTML = eType;

    eType = dataset[0][cols[monthMaxIndex]];
    eType = eType.substring(eType.indexOf(' - ') + 3, eType.indexOf('Consumption'));
    document.getElementById('e4').innerHTML = eType;

}