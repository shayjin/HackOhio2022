var data = [];
var columns = [];
const midnight = [0, 6];
const morning = [6, 12];
const afternoon = [12, 18];
const night = [18, 0];

$('document').ready(function(){
    $('#one').on('change', function() {
        $('button[id=submit]').attr('value', $(this).find(":selected").attr('value'));
    })
})

if (document.getElementById('upload') != null) {
    const uploadConfirm = document.getElementById('upload').addEventListener('click', () => {
        Papa.parse(document.getElementById('file').files[0],
        {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                var dorms = [];
                data = results.data;
    
                for (var columnName in results.data[0]) {
                    columns.push(columnName);
    
                    var dashIndex = columnName.indexOf(' - ');
                    var dormName = columnName.substring(0, dashIndex);
                    
    
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
    
                console.log(columns);
            }
        })
    });
}


function analysis(button) {
    var p = document.createElement('p');
    p.innerHTML = 'Analyzing ' + button.value;
    document.getElementById('d').appendChild(p);
}
