<script>

    
var years = [];
var within = [];
var newcounty = [];
var newstate = [];

    function loadData(){
        $.ajax({
            url: 'line-data.xml',
            type: 'GET',
            data: 'xml',
            success: parseData
        });
    };
    
    function parseData(xml){
        console.log(xml);
        
        $(xml).find("year").each(function(index){
            years.push($(this).attr("name"));
            within.push(parseFloat($(this).find("within").text()));
            newcounty.push(parseFloat($(this).find("newcounty").text()));
            newstate.push(parseFloat($(this).find("newstate").text()));
        });
        
        console.log(years);
        buildLine();
    };
    
    
    function buildLine(){ 
    $('#line').highcharts({
        title: {
            text: '',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: U.S. Census Bureau, American Community Survey 1-Year Estimates, 2005-2014',
            x: -20
        },
        xAxis: {
            categories: years
        },
        yAxis: {
            title: {
                text: 'Percent'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '%'
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'bottom',
            borderWidth: 0
        },
        series: [{
            name: 'Moved within county',
            data: within
        }, {
            name: 'Moved to new county in same state',
            data: newcounty
        }, {
            name: 'Moved to new state',
            data: newstate
        }]
    });
};



$(document).ready(function(){
    console.log("doc ready!");
    
    $( "li" )
  .filter( ":odd" )
    .hide()
  .end()
  .filter( ":even" )
    .click(function() {
      $( this )
        .toggleClass( "active" )
        .next()
          .stop( true, true )
          .slideToggle();
    });
    
    $("#map1").show();
    $("#map2").hide();
    $("#map3").hide();
    
    loadData();
    $('#counties').DataTable();
  
    
  $('#button1').click(function(){
   $('#map1').show();
   $('#map2').hide();
   $('#map3').hide();
   $('#text'+$(this).attr('target')).fadeIn(2000);
  });
  
    $('#button2').click(function(){
   $('#map1').hide();
   $('#map2').show();
    $('#map3').hide();
   $('#text'+$(this).attr('target')).fadeIn(2000);
  });
    
   $('#button3').click(function(){
   $('#map1').hide();
   $('#map2').hide();
    $('#map3').show();
   $('#text'+$(this).attr('target')).fadeIn(2000);
  });
  


   

    // get the viz.json url from the CartoDB Editor
// - click on visualize
// - create new visualization
// - make visualization public
// - click on publish
// - go to API tab
    
});

</script>