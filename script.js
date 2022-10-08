var dataset = [];
var columns = [];
var weatherDataset = [];
var weatherColumns = [];
const midnight = [0, 6];
const morning = [6, 12];
const afternoon = [12, 18];
const night = [18, 0];

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

    var cols = [0]

    for (var i = 1; i < dataset[0].length; i++) {
        if (dataset[0][i].includes(dormName)) {
            cols.push(i);
        }
    }

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

    for (var i = 1; i < cols.length; i++) {
        var totalSum = 0;
        var midNightSum = 0;
        var morningSum = 0;
        var afternoonSum = 0;
        var nightSum = 0;

        for (var j = 1; j < dataset.length; j++) {
            var value = parseInt(dataset[j][cols[i]]);


            if (Number.isInteger(value)) {
                totalSum += value;
                days += 1;
                
                var regex = /([0-1][0-9]|2[0-3]):00:00/g;

                var time = String(dataset[j][0].match(regex));
                time = time.substring(0, time.indexOf(':'));

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
        }


       // console.log(totalSum);
        totalSums.push(totalSum / days);
        midNightSums.push(midNightSum / midNightDays);
        morningSums.push(morningSum / morningDays);
        afternoonSums.push(afternoonSum / afternoonDays);
        nightSums.push(nightSum / nightDays);

      //  console.log(totalSum);
     //   console.log(midNightSum);
       // console.log(morningSum);
       // console.log(afternoonSum);
       // console.log(nightSum);

        days = 0.0;
        midNightDays = 0.0;
        morningDays = 0.0
        afternoonDays = 0.0;
        nightDays = 0.0;
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
            var value = parseInt(weatherDataset[j][i]);

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
    
    console.log(totalWeathers);
    console.log(midNightWeathers);
    console.log(morningWeathers);
    console.log(afternoonWeathers);
    console.log(nightWeathers);

    const energies = document.getElementById('energy');

    for (var i = 1; i < cols.length; i++) {
        var amount = totalSums[i-1];

        if (amount) {
            var energyType = dataset[0][cols[i]];

            var unit = energyType.substring(energyType.lastIndexOf('(') + 1, energyType.lastIndexOf(')'));
            energyType = energyType.substring(energyType.lastIndexOf(' - ') + 3, energyType.lastIndexOf('(') - 1);

            var energy = document.createElement('p');
            energy.innerHTML = energyType + ": " + amount + " " + unit;
            document.getElementById('energy').appendChild(energy);
        }
    }
}