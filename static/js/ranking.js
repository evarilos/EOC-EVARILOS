var TKN = TKN || {};
TKN.IPSN = TKN.IPSN || {};

var dataTable;
var dataTable1;
var dataTable2;

TKN.IPSN.ranking = {
    config: {
        updateInterval: 3000000,
        databases: [
            {label: 'Scenario 1', url: 'http://ebp.evarilos.eu:5009/evarilos/metrics/v1.0/database/experiment_1/experiment'},
            {label: 'Scenario 2', url: 'http://ebp.evarilos.eu:5009/evarilos/metrics/v1.0/database/experiment_2/experiment'},
            {label: 'Scenario 3', url: 'http://ebp.evarilos.eu:5009/evarilos/metrics/v1.0/database/experiment_3/experiment'},
            {label: 'Scenario 4', url: 'http://ebp.evarilos.eu:5009/evarilos/metrics/v1.0/database/experiment_4/experiment'}

        ],
        defaultDB: 'Scenario 1',
        detailsURL: 'http://ebp.evarilos.eu:5011/details.html'
    }
};

TKN.IPSN.ranking.getDatabaseURL = function() {
    var url = '#';
    $.each(TKN.IPSN.ranking.config.databases, function(key, val) {
        if (val.label == (TKN.IPSN.ranking.database || TKN.IPSN.ranking.config.defaultDB))
            url = val.url;
    })
    return url;
};

TKN.IPSN.ranking.getDetailsURL = function(id) {
    return TKN.IPSN.ranking.config.detailsURL + '?db=' + (TKN.IPSN.ranking.database || TKN.IPSN.ranking.config.defaultDB) + '&id=' + id;
};

// Update table
TKN.IPSN.ranking.updateTable = function() {
    var newTable = $('<table/>');
    newTable.addClass('ranking');
    newTable.append('<thead><tr> \
            <th class="anim:position position">#</th> \
            <th class="anim:id id" style="width:20%">Localization Solution</th> \
            <th class="anim:constant competitor">Competitior</th>\
            <th class="anim:update error">Point Acc. [m] </th>\
            <th>Room Level Acc. [%]</th>\
            <th>Latency[s]</th>\
            <th>Interference Robustness [%]</th>\
            <th>Point Acc. Score</th>\
            <th>Room Level Acc. Score</th>\
            <th>Latency Score</th>\
            <th>Interference Robustness Score</th>\
            <th>Final Score</th><!--Sorting key-->\
            <th class="anim:constant details">Details</th>\
            </tr>\
            </thead>');

    var databaseURL = TKN.IPSN.ranking.getDatabaseURL();
    //console.log(databaseURL);
    var experiments=[];
    /*Fetching all 4 experiement scenes*/
    getData('experiment_1',databaseURL);
    getData('experiment_2',TKN.IPSN.ranking.config.databases[1].url);
    getData('experiment_3',TKN.IPSN.ranking.config.databases[2].url);
    getData('experiment_4',TKN.IPSN.ranking.config.databases[3].url);
};

TKN.IPSN.ranking.resetTable = function() {
    $('.ranking').empty();
    $('.ranking').append('<thead><tr><th class="anim:position position">#</th><th class="anim:id id" style="width:20%">Localization Solution</th><th class="anim:constant competitor">Competitior</th><th class="anim:update error">Point Acc. [m] </th><th>Room Level Acc. [%]</th><th>Latency[s]</th><th>Average Interference Robustness [%]</th><th class="anim:constant details">Details</th></tr></thead>');
};

TKN.IPSN.ranking.changeDB = function(event) {
    $('.databaseLink').removeClass('active');
    $(this).addClass('active');
    TKN.IPSN.ranking.database = this.innerHTML;
    $('#logo').removeClass('inactive');
    TKN.IPSN.ranking.resetTable();
};

TKN.IPSN.ranking.updateLoop = function() {
    if ($('#logo').hasClass('inactive'))
        return;
    else
        TKN.IPSN.ranking.updateTable();
};

jQuery(function() {
    
    dataTable=$('#ranking .ranking').dataTable({

        bSortable: true,
        paging: false,
        searching: false,
        ordering:  true,
        info: false,
        order: [[11,'desc']],
        "bAutoWidth": false, // Disable the auto width calculation 
            
    });


    dataTable1=$('#ranking1 .ranking').dataTable({

        bSortable: true,
        paging: false,
        searching: false,
        ordering:  true,
        info: false,
        order: [[11,'desc']],
        "bAutoWidth": false, // Disable the auto width calculation 
        
    });

    dataTable2=$('#ranking2 .ranking').dataTable({

        bSortable: true,
        paging: false,
        searching: false,
        ordering:  true,
        info: false,
        order: [[11,'desc']],
        "bAutoWidth": false, // Disable the auto width calculation 
        
    });

    $('#ranking .ranking .sorting, #ranking1 .ranking .sorting, #ranking2 .ranking .sorting').off('click');


    $('#ranking .ranking , #ranking1 .ranking , #ranking2 .ranking ')
        .on( 'order.dt',  function () { 
        	var maxRows=($('tr', $(this).find('tbody')).length);
        	var i=0;
        		$(this).find("tr").each(function() {

				  	$(this).children("td:first").text(i);
				 	i++;
				});
         } )
        .dataTable();
     
    // Click Handler
    $('#logo').on('click', function () {
        $(this).toggleClass('inactive');
    });
       

    $(document).ajaxStop(function () {
         completeHandler();
      });

    $("#database a").click(function(event){
        event.preventDefault();
        $('.ranking').fadeOut(1000);
        var id=$(this).attr('title');
        //console.log(id);
        $('#'+id+" .ranking").fadeIn(1000);
        $("#database a").css('background-color','grey');
        $(this).css('background-color','darkred');
    });

    // Run
    TKN.IPSN.ranking.updateLoop();
    TKN.IPSN.ranking.timer = window.setInterval(TKN.IPSN.ranking.config.updateInterval, TKN.IPSN.ranking.updateLoop);
});






function getData(experiment_id, database_link){
    
	
	    $.getJSON( "http://localhost:5011/fetch?url="+database_link, function( data ) {
	        var jxhr = [];
	        localStorage.setItem(experiment_id, '[]');
	        var tds = [];
	        $.each( data, function( key, val ) {
	            // request multiple JSON files (one per experiment)
	            	$.ajaxSetup({async:false});
			jxhr.push($.getJSON( "http://localhost:5011/fetch?url="+val, function( data ) {
	               
	                        //console.log(data);
	                    try{

	                        if(data._id){
	                             var st=JSON.parse(localStorage.getItem(experiment_id));
	                             st.push(data);
	                             localStorage.setItem(experiment_id, JSON.stringify(st));
	                        }
	                        
	                    }catch(err){
	                        console.log(err);
	                    }
	            }));
	        });
	        
	    });
}


function limitZero(par){
	if (par < 0) {
		return 0.0;
	}
	else {
		return par;
	}
}

function completeHandler(){
    var experiment_1=JSON.parse(localStorage.getItem("experiment_1")); //reference scene
    var experiment_2=JSON.parse(localStorage.getItem("experiment_2")); //scenario1
    var experiment_3=JSON.parse(localStorage.getItem("experiment_3")); //scenario 2
    var experiment_4=JSON.parse(localStorage.getItem("experiment_4")); //scenerio 3

    var IntereferenceRobustnessMatrix = [];
    
    var PointAccuracyScore =[];
    var RoomLeveAccuracyScore =[];
    var LatencyScore =[];
    var RobustnessScore =[];
    var FinalScore = [];
    var FinalScore1 = [];
    var FinalScore2 = [];


    var point_acc_min_1 = 10
	var point_acc_max_1 = 1
	var point_acc_weight_1 = 0.4
	var room_acc_min_1 = 50
	var room_acc_max_1 = 90
	var room_acc_weight_1 = 0.4 
	var latency_min_1 = 20
	var latency_max_1 = 1
	var latency_weight_1 = 0.1
	var interf_rob_min_1 = 50
	var interf_rob_max_1 = 10
	var interf_rob_weight_1 = 0.1 

	var point_acc_weight_2 = 0.2
	var room_acc_weight_2 = 0.2
	var latency_weight_2 = 0.5
	var interf_rob_weight_2 = 0.1

	var point_acc_weight_3 = 0.2
	var room_acc_weight_3 = 0.2
	var latency_weight_3 = 0.1 
	var interf_rob_weight_3 = 0.5

 
    for (i=0;i<experiment_1.length;i++){
       
    	point_acc = experiment_1[i].primary_metrics.accuracy_error_2D_75_percentile
		room_acc = 100*experiment_1[i].primary_metrics.room_accuracy_error_average
		latency = experiment_1[i].primary_metrics.latency_75_percentile

        var inf_rob_point_scene1    =100*(experiment_2[i].primary_metrics.accuracy_error_2D_75_percentile - point_acc) / point_acc;
        var inf_rob_point_scene2    =100*(experiment_3[i].primary_metrics.accuracy_error_2D_75_percentile - point_acc) / point_acc;
        var inf_rob_point_scene3    =100*(experiment_4[i].primary_metrics.accuracy_error_2D_75_percentile - point_acc) / point_acc;
        
        var inf_rob_room_scene1     =100*(room_acc - 100*experiment_2[i].primary_metrics.room_accuracy_error_average)/room_acc;
        var inf_rob_room_scene2     =100*(room_acc - 100*experiment_3[i].primary_metrics.room_accuracy_error_average)/room_acc;
        var inf_rob_room_scene3     =100*(room_acc - 100*experiment_4[i].primary_metrics.room_accuracy_error_average)/room_acc;

        var inf_rob_latency_scene1  =100*(latency - experiment_2[i].primary_metrics.latency_75_percentile)/latency;
        var inf_rob_latency_scene2  =100*(latency - experiment_3[i].primary_metrics.latency_75_percentile)/latency;
        var inf_rob_latency_scene3  =100*(latency - experiment_4[i].primary_metrics.latency_75_percentile)/latency;
      	
        inf_rob_point_scene1	=limitZero(inf_rob_point_scene1);
        inf_rob_point_scene2    =limitZero(inf_rob_point_scene2);
        inf_rob_point_scene3    =limitZero(inf_rob_point_scene3);
        
        inf_rob_room_scene1     =limitZero(inf_rob_room_scene1);
        inf_rob_room_scene2     =limitZero(inf_rob_room_scene2);
        inf_rob_room_scene3     =limitZero(inf_rob_room_scene3);

        inf_rob_latency_scene1  =limitZero(inf_rob_latency_scene1);
        inf_rob_latency_scene2  =limitZero(inf_rob_latency_scene2);
        inf_rob_latency_scene3  =limitZero(inf_rob_latency_scene3);

        
        


        IntereferenceRobustnessMatrix[i]= ((inf_rob_point_scene1+inf_rob_point_scene2+inf_rob_point_scene3)+
                                        (inf_rob_room_scene1+inf_rob_room_scene2+inf_rob_room_scene3)+
                                        (inf_rob_latency_scene1+inf_rob_latency_scene2+inf_rob_latency_scene3))/9;

        
		PointAccuracyScore[i]	 = Math.max(0,Math.min(10,10*(point_acc-point_acc_min_1)/(point_acc_max_1-point_acc_min_1)));
		RoomLeveAccuracyScore[i] = Math.max(0,Math.min(10,10*(room_acc-room_acc_min_1)/(room_acc_max_1-room_acc_min_1)));
		LatencyScore[i]			 = Math.max(0,Math.min(10,10*(latency-latency_min_1)/(latency_max_1-latency_min_1)));
		RobustnessScore[i]		 = Math.max(0,Math.min(10,10*(IntereferenceRobustnessMatrix[i]-interf_rob_min_1)/(interf_rob_max_1-interf_rob_min_1)));
       
		FinalScore[i]=  (PointAccuracyScore[i] * point_acc_weight_1 + RoomLeveAccuracyScore[i] * room_acc_weight_1 + LatencyScore[i] * latency_weight_1 + RobustnessScore[i] * interf_rob_weight_1);
		FinalScore1[i]= (PointAccuracyScore[i] * point_acc_weight_2)+ (RoomLeveAccuracyScore[i] * room_acc_weight_2)+ (LatencyScore[i] * latency_weight_2)+ (RobustnessScore[i] * interf_rob_weight_2);
		FinalScore2[i]= (PointAccuracyScore[i] * point_acc_weight_3)+ (RoomLeveAccuracyScore[i] * room_acc_weight_3)+ (LatencyScore[i] * latency_weight_3)+ (RobustnessScore[i] * interf_rob_weight_3);

    }

    var arrayTable=[];
    dataTable.fnClearTable();
    $.each(experiment_1, function(index, item) {
    		
            arrayTable.push([
                index+1,
                item.sut.sut_name,
                item.sut.competitor_name,
                item.primary_metrics.accuracy_error_2D_75_percentile.toFixed(2),
                (item.primary_metrics.room_accuracy_error_average*100).toFixed(2) ,
                item.primary_metrics.latency_75_percentile.toFixed(2),
                IntereferenceRobustnessMatrix[index].toFixed(2),
                PointAccuracyScore[index].toFixed(2),
                RoomLeveAccuracyScore[index].toFixed(2),
                LatencyScore[index].toFixed(2),
                RobustnessScore[index].toFixed(2),
                FinalScore[index].toFixed(2),
                '<a href="details?id='+(index+1)+'&db=1">Details</a>',
            ]);          
    });

    dataTable.fnAddData(arrayTable);
    
    var arrayTable1=[];
    dataTable1.fnClearTable();
    $.each(experiment_1, function(index, item) {
            arrayTable1.push([
                index+1,
                item.sut.sut_name,
                item.sut.competitor_name,
                item.primary_metrics.accuracy_error_2D_75_percentile.toFixed(2),
                (item.primary_metrics.room_accuracy_error_average*100).toFixed(2),
                item.primary_metrics.latency_75_percentile.toFixed(2),
                IntereferenceRobustnessMatrix[index].toFixed(2),
                PointAccuracyScore[index].toFixed(2),
                RoomLeveAccuracyScore[index].toFixed(2),
                LatencyScore[index].toFixed(2),
                RobustnessScore[index].toFixed(2),
                FinalScore1[index].toFixed(2),
                '<a href="details?id='+(index+1)+'&db=1">Details</a>',
            ]);          
    });
    dataTable1.fnAddData(arrayTable1);

    var arrayTable2=[];
    dataTable2.fnClearTable();
    $.each(experiment_1, function(index, item) {
            arrayTable2.push([
                index+1,
                item.sut.sut_name,
                item.sut.competitor_name,
                item.primary_metrics.accuracy_error_2D_75_percentile.toFixed(2),
                (item.primary_metrics.room_accuracy_error_average*100).toFixed(2),
                item.primary_metrics.latency_75_percentile.toFixed(2),
                IntereferenceRobustnessMatrix[index].toFixed(2),
                PointAccuracyScore[index].toFixed(2),
                RoomLeveAccuracyScore[index].toFixed(2),
                LatencyScore[index].toFixed(2),
                RobustnessScore[index].toFixed(2),
                FinalScore2[index].toFixed(2),
                '<a href="details?id='+(index+1)+'&db=1">Details</a>',
            ]);        
    });
    dataTable2.fnAddData(arrayTable2);


	var dict_scores={'scene1':dataTable.fnGetData(),'scene2':dataTable1.fnGetData(),'scene3':dataTable2.fnGetData()}
	localStorage.setItem('scores','');
	localStorage.setItem('scores',JSON.stringify(dict_scores));

    $('#lastupdated span').html(new Date());
    window.setTimeout(TKN.IPSN.ranking.updateLoop, TKN.IPSN.ranking.config.updateInterval);
}




