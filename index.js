let splide = new Splide('#splide2').mount()


var lst = []

let year = 0;
let month = 0;
let day = 0;
let hour = 0;
let minutes = 0;

let timeStringList = '';

let timeMmnt = 0;



$('#calc').click(function () {
    clearTimeout(x)
    $('h1').slideUp('slow')
    $('#continue').hide()

    day = $("#day :selected").text()

    month = $("#month :selected").text()

    year = $("#year :selected").text()

    hour = $("#hours :selected").text()

    minutes = $("#minutes :selected").text()

    let timeStringList = year + '-' + month + '-' + day + 'T' + hour + ':' + minutes + ':00'

    let timePicked = new Date(timeStringList)

    function currentTime() {
        let date = new Date();
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        let yy = date.getFullYear();
        let hh = date.getHours();
        let min = date.getMinutes();
        let ss = date.getSeconds();

        let t = setTimeout(function () { currentTime() }, 1000)
        return time = new Date(yy, mm - 1, dd, hh, min, ss)



    };


    let timeNow = currentTime();


    timeMmnt = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':00'

    let timeDiffMmnt = moment.preciseDiff(timeMmnt, time);

    $('h2').text(timeDiffMmnt)

    let timeDiffJSON = moment.preciseDiff(timeMmnt, time, true);



    timeJSON = timeDiffJSON

    check_mark = "\u2714 "

    for (i = 1; i < 14; i++) {
        $('#' + i).text($('#' + i).text().replace(check_mark, '')).removeClass("passed")
    }

    let mil_num = 0

    if (timeJSON['hours'] > 0) {
        if (timeJSON['hours'] >= 1 && timeJSON['hours'] < 12) {
            mil_num = 1
        }
        else {
            mil_num = 2
        }
    }

    if (timeJSON['days'] > 0) {
        if (timeJSON['days'] === 1) {
            mil_num = 3
        }
        else if (timeJSON['days'] === 1) {
            mil_num = 4
        }
        else {
            mil_num = 5
        }
    }

    if (timeJSON['months'] > 0) {
        if (timeJSON['months'] === 1) {
            mil_num = 6
        }
        else if (timeJSON['months'] > 1 && timeJSON['months'] < 9) {
            mil_num = 7
        }
        else {
            mil_num = 8
        }
    }

    if (timeJSON['years'] > 0) {
        if (timeJSON['years'] >= 1 && timeJSON['years'] < 5) {
            mil_num = 9
        }
        else if (timeJSON['years'] > 4 && timeJSON['years'] < 10) {
            mil_num = 10
        }
        else if (timeJSON['years'] > 9 && timeJSON['years'] < 15) {
            mil_num = 11
        }
        else if (timeJSON['years'] > 14 && timeJSON['years'] < 20) {
            mil_num = 12
        }
        else {
            mil_num = 13
        }
    }



    countContinue()
    $('h5').slideDown('slow')
    $('.milestones').slideDown('slow')

    for (i = 1; i < mil_num + 1; i++) {
        $('#' + i).text("\u2714 " + $('#' + i).text()).addClass("passed")
    }
    $('h4').text('Congratulations! You\'ve passed ' + mil_num + '/13 milestones')

    $('#splide2').slideDown('slow')
    $('.motivate').slideDown('slow')
    $('.stats').slideDown('slow')
    $('#continue').hide()
    $('footer').show()
    clicked = false;

})

$('#continue').click(function(){
    $('.milestones').slideDown('slow')
    $('#splide2').slideDown('slow')
    $('.motivate').slideDown('slow')
    $('.stats').slideDown('slow')
    $('#continue').hide()
    $('footer').show()
})


let x = null;

function countContinue() {

    let timeNow = Date.now()
    let s = moment.preciseDiff(timeMmnt, timeNow)
    $('h2').text(s)

    x = setTimeout(countContinue, 1000)

}



let clicked = false;


$('h2').click(function () {
    if (clicked === false) {
        clearTimeout(x)
        clicked = true;
    } else {
        countContinue()
        clicked = false;
    }
})




$('#par1').hover(function () {
    $('.img-div').slideDown('slow')
})



$('.milestones-lst ul li').click(function () {
    y = $(this).attr('id')
    splide.go(parseInt(y - 1))
    document.getElementById("splide2").scrollIntoView();

})

$('#nav-mls').click(function () {
    document.getElementById("milestones").scrollIntoView();
})

$('#nav-mtv').click(function () {
    document.getElementById("motivate").scrollIntoView();
})

$('#nav-stats').click(function () {
    document.getElementById("stats_form").scrollIntoView();
})

let a = null;

let timeOutId;

$('#motivate-btn').click(function x() {
    $('.img-animation').show()
    timeOutId = setTimeout(function () {
        $('.img-animation').hide()
        a = Math.floor((Math.random() * 10) + 1)
        $('#motivate-imgs').show()
        $('#i' + a).show()
        $('#next-btn').show()
        $('#motivate-btn').hide()
    }, 2500)


})

clearTimeout(timeOutId)

// add already shown list, random again if already shown 
$('#next-btn').click(function () {
    $('#i' + a).hide()
    a = Math.floor((Math.random() * 10) + 1) //1-10
    console.log('a:' + a)
    $('#i' + a).show()
})




$('input').on('keypress keydown keyup', function () {
    x = $(this).attr('id')
    validate(x)
})

let submit_ready = null

function validate(id) {

    patternList = { dig: /^[0-9]{1,2}$/, txt: /^[A-Za-z]{1,}$/ , cc: /^[A-Za-z]{2,3}$/}
    patternid = id.substr(0, id.length - 1)
    pattern = new RegExp(patternList[patternid])

    if (!pattern.test($('#' + id).val())) {
        $('#' + id).css({ 'color': 'red' })
        submit_ready = 'no'
    }
    else {
        $('#' + id).css({ 'color': 'black' })
        submit_ready = 'yes'
    }
}


function draw_chart(data) {

    data_json = data


    var parser = function(data) {
        var stats = {};
        for (var d in data) {
            stats[data[d].date] = data[d].count;
        }
        return stats;
    };


    var cal = new CalHeatMap();

    cal.init({
        itemSelector: "#heatmap1",
        data: data_json,
        // dataType: "csv",
        domain: 'month',
        subDomain: 'day',
        start: new Date(2021, 00, 01),
        end: new Date(2021, 12, 31),
        cellSize: 13,
        cellRadius: 10,
        legend: [2, 4, 8],
        legendCellRadius: 10,
        domainGutter: 2,
        domainDynamicDimension: false,
        afterLoadData: parser
        
    });

}


function barChart(items) {

    categories = []
    values = []

    for (i=0; i< items.length; i++) {
        x = items[i]
        y = Object.values(x)
    
        categories.push(y[0])
        values.push(y[1])
    }


    var data = [
        {
          x: categories,
          y: values,
          type: 'bar',
          marker: {
            color: 'rgba(102, 157, 69, 1)'
          }
        }
      ];

    var layout = 
        {
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            width: 380,
            height: 400,
        }
      
      Plotly.newPlot('bar-chart', data, layout);
}

function barChartHor(methods) {

    categories = []
    values = []

    for (i=0; i< methods.length; i++) {
        x = methods[i]
        y = Object.values(x)
    
        categories.push(y[0])
        values.push(y[1])
    }


    var data = [
        {
          x: values,
          y: categories,
          text: categories.map(String),
          type: 'bar',
          orientation: 'h',
          marker: {
            color: 'rgba(156, 192, 105, 1)'
          }
        }
      ];

    var layout = 
        {
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            width: 600,
            height: 400,
            yaxis: {
                showticklabels: false
            }
        }
      
      Plotly.newPlot('bar-chart-hor', data, layout);
}


function pieChart(reasons) {

    categories = []
    values = []

    for (i=0; i< reasons.length; i++) {
        x = reasons[i]
        y = Object.values(x)
    
        categories.push(y[0])
        values.push(y[1])
    }


    var data = [{
        type: "pie",
        values: values,
        labels: categories,
        // hoverinfo: "label+percent",
        textposition: "inside",
        automargin: true,
        marker: {
            colors: ['rgba(236, 245, 226, 1)', 'rgba(218, 226, 137, 1)', 'rgba(156, 192, 105, 1)', 'rgba(102, 157, 69, 1)', 'rgba(99, 121, 57, 1)', 'rgba(18, 72, 27, 1)']
          },
      }]
      
      var layout = {
        height: 400,
        width: 400,
        margin: {"t": 0, "b": 0, "l": 0, "r": 0},
        // showlegend: false,
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)"
        }
      
      Plotly.newPlot('pie-chart', data, layout)
}

// static country selection for now; future -> only for countries with top 5 num of entries (aws lambda)
function boxPlot (ages) {

    labels = Object.keys(ages)
    ages_all = Object.values(ages)
    data = []

    for (i=0; i < ages_all.length; i++) {

        x = ages_all[i]
        y = Object.values(x)

        data.push(y)
        
    }



    var trace1 = {
        y: data[0],
        type: 'box',
        name: labels[0],
        marker:{
          color: 'rgba(218, 226, 137, 1)'
        }
      };
      
      var trace2 = {
        y: data[1],
        type: 'box',
        name: labels[1],
        marker:{
          color: 'rgba(99, 121, 57, 1)'
        }
      };
      
      var data = [trace1, trace2];
      
      var layout = 
        {
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            height: 400,
            width: 400
        }
      
      Plotly.newPlot('box-plot', data, layout);
}



function donutChart(likes) {

    data1 = []
    labels1 = []

    for (i=0; i < 2; i++) {
        x = likes[i]
        y = Object.values(x)

        data1.push(y[2])
        labels1.push(y[1])

    }

    console.log('data1: ' + data1)
    console.log('labels1: ' + labels1)

    data2 = []
    labels2 = []

    for (i=2; i < 4; i++) {
        x = likes[i]
        y = Object.values(x)

        data2.push(y[2])
        labels2.push(y[1])

    }

    console.log('data2: ' + data2)
    console.log('labels2: ' + labels2)


    var data = [{
        values: data1,
        labels: labels1,
        domain: {column: 0},
        name: 'Non-smoker',
        hoverinfo: 'label+percent',
        hole: .4,
        type: 'pie',
        marker : {
            colors: ['rgba(218, 226, 137, 1)', 'rgba(102, 157, 69, 1)']
        }
      },{
        values: data2,
        labels: labels2,
        domain: {column: 1},
        name: 'Smoker',
        hoverinfo: 'label+percent',
        hole: .4,
        type: 'pie',
        marker : {
            colors: ['rgba(218, 226, 137, 1)', 'rgba(102, 157, 69, 1)']
        }
      }];
      
      var layout = {
        annotations: [
          {
            font: {
              size: 12
            },
            showarrow: false,
            text: 'Nonsmoker',
            textposition: 'outside',
            x: 0.15,
            y: 0.5
          },
          {
            font: {
              size: 12
            },
            showarrow: false,
            text: 'Smoker',
            x: 0.82,
            y: 0.5
          }
        ],
        height: 400,
        width: 600,
        grid: {rows: 1, columns: 2},
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)"
      };
      
      Plotly.newPlot('donut-chart', data, layout);
}



let json_resp
let gender_items
let method_items
let quit_rsn_items
let fc_ctry_items
let fc_like_items

function submitToAPI(e) {
    e.preventDefault();

    

    var age = $("#dig1").val();
    var yos = $('#dig2').val();
    var cs = ''
    if ($('#cs :selected').text() != '...') {
        cs = $('#cs :selected').text()
    }
    var noc = $('#dig3').val()
    var tp_of_prdct = ''
    if ($('#tp-prdct :selected').text() != 'Choose') {
        tp_of_prdct = $('#tp-prdct :selected').text()
    }
    var fc = $('#dig4').val()
    x = new Date().getFullYear
    var fc_year = x - (age - fc)
    var fc_like = ''
    if ($('#fc-like :selected').text() === '...') {
        fc_like = $('#fc-like :selected').text()
    }
    var start_smoking = ''
    if ($('#start-smoking :selected').text() != 'Choose') {
        start_smoking = $('#start-smoking :selected').text()
    }
    var lc_date = $('#lc-date').val()
    var lc_signif = ''
    if ($('#lc-signif :selected').text() != '...') {
        lc_signif = $('#lc-signif :selected').text()
    }
    var lc_signif_desc = ''
    if ($('#lc-signif-desc :selected').text() != 'Choose') {
        lc_signif_desc = $('#lc-signif-desc :selected').text()
    }
    var ttq = ''
    if ($('#ttq :selected').text() != '...') {
        ttq = $('#ttq :selected').text()
    } 
    var ttq_nums = $('#dig5').val();
    var mthd_1 = ''
    if ($('#chck1').prop('checked')) {
        mthd_1 = $("#chck1").val();
    }
    var mthd_2 = ''
    if ($('#chck2').prop('checked')) {
        mthd_2 = $("#chck2").val();
    }
    var mthd_3 = ''
    if ($('#chck3').prop('checked')) {
        mthd_3 = $("#chck3").val();
    }
    var mthd_4 = ''
    if ($('#chck4').prop('checked')) {
        mthd_4 = $("#chck4").val();
    }
    var mthd_5 = ''
    if ($('#chck5').prop('checked')) {
        mthd_5 = $("#chck5").val();
    }
    var mthd_6 = ''
    if ($('#chck6').prop('checked')) {
        mthd_6 = $("#chck6").val();
    }
    var fail_rsn = ''
    if ($('#fail-rsn :selected').text() != 'Choose') {
        fail_rsn = $('#fail-rsn :selected').text()
    }
    var win_mthd = ''
    if ($('#win-mthd :selected').text() != 'Choose') {
        win_mthd = $('#win-mthd :selected').text()
    }
    var nw_hbt = ''
    if ($('#nw-hbt :selected').text() != '...') {
        nw_hbt = $('#nw-hbt :selected').text()
    }
    var nw_hbt_desc = ''
    if ($('#nw-hbt-desc :selected').text() != 'Choose') {
        nw_hbt_desc = $('#nw-hbt-desc :selected').text()
    }
    var qt_rsn = ''
    if ($('#qt-rsn :selected').text() != 'Choose') {
        qt_rsn = $('#qt-rsn :selected').text()
    }
    var hlth_iss = ''
    if ($('#hlth-iss :selected').text() != '...') {
        hlth_iss = $('#hlth-iss :selected').text()
    }
    var gn_wght = ''
    if ($('#gn-wght :selected').text() != '...') {
        gn_wght = $('#gn-wght :selected').text()
    }
    var urg_smoke = ''
    if ($('#urg-smoke :selected').text() != '...') {
        urg_smoke = $('#urg-smoke :selected').text()
    }
    var urg_smoke_num = $('#dig6').val()
    var urg_smoke_num_tf = ''
    if ($('#urg-smoke-num-tf :selected').text() != 'Choose') {
        urg_smoke_num_tf = $('#urg-smoke-num-tf :selected').text()
    }
    var urg_smoke_desc = ''
    if ($('#urg-smoke-desc :selected').text() != 'Choose') {
        urg_smoke_desc = $('#urg-smoke-desc :selected').text()
    }
    var ns_tried = ''
    if ($('#ns-tried :selected').text() != '...') {
        ns_tried = $('#ns-tried :selected').text()
    }
    var ns_tried_age = $('#dig7').val()
    var ns_no_start = ''
    if ($('#ns-no-start :selected').text() != 'Choose') {
        ns_no_start = $('#ns-no-start :selected').text()
    }
    var smoker = ''
    if ($('#smo-non :selected').text() != '...') {
        smoker = $('#smo-non :selected').text()
    }
    var gender = ''
    if ($('#gender :selected').text() != 'Choose') {
        gender = $('#gender :selected').text()
    }
    var occupation = ''
    if ($('#occupation :selected').text() != 'Choose') {
        occupation = $('#occupation :selected').text()
    }
    var education = ''
    if ($('#education :selected').text() != 'Choose') {
        education = $('#education :selected').text()
    }
    var country = $('#cc1').val()
    var city = $('#txt2').val()
    if (fc_like === null) {
        fc_like = $('#ns-frst-try-like :selected').text()
    }


    var data = {
        age: age,
        yos: yos,
        cs: cs,
        noc: noc,
        tp_of_prdct: tp_of_prdct,
        fc: fc,
        fc_year: fc_year,
        fc_like: fc_like,
        start_smoking: start_smoking,
        lc_date: lc_date,
        lc_signif: lc_signif,
        lc_signif_desc: lc_signif_desc,
        ttq: ttq,
        ttq_nums: ttq_nums,
        mthd_1: mthd_1,
        mthd_2: mthd_2,
        mthd_3: mthd_3,
        mthd_4: mthd_4,
        mthd_5: mthd_5,
        mthd_6: mthd_6,
        fail_rsn: fail_rsn,
        win_mthd: win_mthd,
        nw_hbt: nw_hbt,
        nw_hbt_desc: nw_hbt_desc,
        qt_rsn: qt_rsn,
        hlth_iss: hlth_iss,
        gn_wght: gn_wght,
        urg_smoke: urg_smoke,
        urg_smoke_num: urg_smoke_num,
        urg_smoke_num_tf: urg_smoke_num_tf,
        urg_smoke_desc: urg_smoke_desc,
        ns_tried: ns_tried,
        ns_tried_age: ns_tried_age,
        ns_no_start: ns_no_start,
        smoker: smoker,
        gender: gender,
        occupation: occupation,
        education: education,
        country: country,
        city: city,
        entry_type: 'F'
    };

    if (submit_ready === 'yes') {
        $('#loading').show()

        $.ajax({
            type: "POST",
            url: "api_url",
            dataType: "json",
            crossDomain: "true",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),


            success: function (data) {
                // clear form and show a success message
                json_resp = JSON.parse(data[0])
                gender_items = JSON.parse(data[1])
                method_items =  JSON.parse(data[2])
                quit_rsn_items = JSON.parse(data[3])
                fc_ctry_items = JSON.parse(data[4])
                fc_like_items = JSON.parse(data[5])

                $('#heatmap1 svg').remove()

                draw_chart(json_resp)
                barChart(gender_items)
                barChartHor(method_items)
                pieChart(quit_rsn_items)
                boxPlot(fc_ctry_items)
                donutChart(fc_like_items)

                $('#charts-all').slideDown('slow')
                document.getElementById("charts-all").scrollIntoView();
                $('#loading').hide()

                // alert("Successfull");
                // location.reload();

            },
            error: function () {
                // show an error message
                alert("UnSuccessfull");
            }


        });
    }
}


$('#just-stats').click(function(e) {


    e.preventDefault();

    $('#loading').show()

    $.ajax({
        type: "GET",
        url: "api_url",
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",


        success: function (data) {
            // clear form and show a success message
            json_resp = JSON.parse(data[0])
            gender_items = JSON.parse(data[1])
            method_items =  JSON.parse(data[2])
            quit_rsn_items = JSON.parse(data[3])
            fc_ctry_items = JSON.parse(data[4])
            fc_like_items = JSON.parse(data[5])

            $("#charts-all").hide()
            $('#heatmap1 svg').remove()

            draw_chart(json_resp)
            barChart(gender_items)
            barChartHor(method_items)
            pieChart(quit_rsn_items)
            boxPlot(fc_ctry_items)
            donutChart(fc_like_items)


            $('#charts-all').slideDown('slow')
            document.getElementById("charts-all").scrollIntoView();
            // $('.lds-dual-ring').hide()
            $('#loading').hide()

            // alert("Successfull");
            // document.getElementById("stats_form").reset();
            // location.reload();

        },
        error: function () {
            // show an error message
            alert("UnSuccessfull");
        }


    });
})



$('#download').click(function(e) {
    e.preventDefault();

    $.ajax({
        type: "GET",
        url: "api_url",
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        
        success: function (data) {
            url = data.slice(1, -1)
            window.location.href = url;
        }
    })

})






