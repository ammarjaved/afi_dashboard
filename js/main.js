// setTimeout(function(){

//     getTotalCounts();
// },3000);
var totalsubmitted1=0;
var totalremaining=0;
var totalsurveyed1=0;
var totalnotsubmitted=0; 

$( document ).ready(function() {
    getTotalCounts();
    getTodayCounts();
   // mainBarChart();
   getDateCounts();
   getSurveyedCounts();
   getSurveyedCountsToday();
   getSurveyedCountsSubmitted();
 //  pieChart()
});



function pieChart(a,b,c){
    Highcharts.chart('container4', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },

        credits:false,
        title: {
            text: 'Submitted Not Submitted and Remaining'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Total Submitted',
                y: a,
                sliced: true,
                selected: true,
                color:'green'
            }, {
                name: 'Not Submitted',
                y: b,
                color:'orange'
            }, {
                name: 'Not Surveyed Yet',
                y: c,
                color:'red'
            }]
        }]
    });
}


function mainBarChart(cat,series){
    Highcharts.chart('container2', {
        chart: {
            type: 'column'
        },
        credits:false,
        title: {
            text: 'Total Data'
        },
        subtitle: {
            text: 'Source:Aerosynergy'
        },
        xAxis: {
            categories:cat,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Counts Against User'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: series
    });
}


function createHighChart(cat,val,id,title,val1){
    if(title=='Total Progress'){
        Highcharts.chart(id, {
            xAxis: {
                categories: cat
    
            },
            credits:false,
            title: {
                text: title,
                align: 'center'
            },
        
            series: [{
                name:title,
                data: val,
                color:'red'        
    
            },{
                name:'submitted',
                data: val1,
                color:'green'        
    
            }]
        });

    }else{
    Highcharts.chart(id, {
        xAxis: {
            categories: cat

        },
        credits:false,
        title: {
            text: title,
            align: 'center'
        },
        
        // tooltip: {
        //     formatter: function() {
        //           var chart = Highcharts.charts[0],
        //             weekdays = chart.options.lang.weekdays,
        //             day = new Date(this.x);
    
        //       return weekdays[day] + ': ' + this.y;
        //   }
        // },
    
        series: [{
            name:title,
            data: val        

        }]
    });
}
}

function getTotalCounts(){

    $.ajax({
        url: 'services/counts.php?id=all',
        dataType: 'JSON',
        method: 'GET',
        async: false,
        success: function callback(data) {

            var cat=[];
            var val=[];
            var cat1=[];
            var val1=[];
           for(var i=0;i<data.total.length;i++){
            cat.push(data.total[i].username)
             val.push(parseInt(data.total[i].count))
           }

           for(var k=0;k<data.submitted.length;k++){
               cat1.push(data.submitted[k].username)
           }
         //  for(var i=0;i<cat.length;i++){
            for(var j=0;j<cat.length;j++){
               // if(cat[j]==data.submitted[j].username){
                   var a=0;
                   for(var m=0;m<data.submitted.length;m++){
                    if(cat[j]==data.submitted[m].username){
                    val1.push(parseInt(data.submitted[m].count));
                    }else if(cat1.includes(cat[j])==true){
                        continue;
                    }else{
                        if(a==0){
                        val1.push(0);
                        a=1;
                        }
                    }
    
                   } 
                   
               // }
                
            }   
           
          // }
           createHighChart(cat,val,'container','Total Progress',val1)

        }
    });

}

function getTodayCounts(){

    $.ajax({
        url: 'services/counts.php?id=today',
        dataType: 'JSON',
        method: 'GET',
        async: false,
        success: function callback(data) {

            var cat=[];
            var val=[];
           for(var i=0;i<data.length;i++){
            cat.push(data[i].username)
             val.push(parseInt(data[i].count))
           }
           createHighChart(cat,val,'container1','Today Progress')

        }
    });

}

function getDateCounts(){

    $.ajax({
        url: 'services/counts.php?id=date',
        dataType: 'JSON',
        method: 'GET',
        async: false,
        success: function callback(data) {
            console.log(data)
            var series=[];
            var temp=[];
            var cat=[];
            for(var k=0;k<data.length;k++){
                if(cat.includes(data[k].updated_at)==false){
                    cat.push(data[k].updated_at)
                }
            }
            for(var i=0;i<data.length;i++){
                // if(cat.includes(data[i].updated_at)==false){
                //     cat.push(data[i].updated_at)
                // }
                var username=data[i].username;
            if(temp.includes(username)==true){
                continue;
            }else{   
                temp.push(username); 
                var obj={};
                obj.name=username;
                var arr=[]
                for(var j=0;j<data.length;j++){
                    if(data[j].username==username){
                         var len=0;
                         if(arr.length>0){
                             len=arr.length;
                         }
                        //if(data[j].updated_at==cat[len]){
                        var index = cat.indexOf(data[j].updated_at);
                        if(index>len){
                        for(g=len;g<index;g++){    
                        arr.push(0)
                        }
                        arr.push(parseInt(data[j].count));
                        }else{
                            arr.push(parseInt(data[j].count));
                        }
                        // }else{
                        //     arr.push(0)
                        // }
                    }
                    
                }
                obj.data=arr;
                series.push(obj)
            }
            }
            mainBarChart(cat,series)
           
           
        }
    });

}

function getSurveyedCounts(){

    $.ajax({
        url: 'services/counts.php?id=total',
        dataType: 'JSON',
        method: 'GET',
        async: false,
        success: function callback(data) {

        $("#total_count").html(data[0].count)
        totalsurveyed1=data[0].count;

        }
    });

}

function getSurveyedCountsToday(){

    $.ajax({
        url: 'services/counts.php?id=today_survey',
        dataType: 'JSON',
        method: 'GET',
        async: false,
        success: function callback(data) {

        $("#total_count_today").html(data[0].count)

        }
    });

}

function getSurveyedCountsSubmitted(){

    $.ajax({
        url: 'services/counts.php?id=submit',
        dataType: 'JSON',
        method: 'GET',
        async: false,
        success: function callback(data) {

         totalsubmitted1=(10000-parseInt(data[0].count))/100;
         var total_not_submitted=(parseInt(totalsurveyed1)-parseInt(data[0].count))*100/10000
         totalremaining=100-(totalsubmitted1+total_not_submitted);
         pieChart(totalsubmitted1,total_not_submitted,totalremaining)


        $("#total_submitted").html(data[0].count);
        

        }
    });

}




