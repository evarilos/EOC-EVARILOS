$(function() {
    
    TKN.IPSN.map.database = GetURLParameter('db') || '';
    
    $('.title h1').html(' Details: Experiment '+TKN.IPSN.map.database);
    
    var map = new TKN.IPSN.map.Map();
    
    $('#map').on('click', function () {
        TKN.cardStack.minify();
    });
    
    TKN.cardStack = new TKN.CardStack({renderTo: '#cards'});
    TKN.IPSN.map.expId = GetURLParameter('id') || 1;
    TKN.IPSN.map.dbId = GetURLParameter('db') || 1;16.18
    var recordList= JSON.parse(localStorage.getItem('experiment_'+TKN.IPSN.map.dbId));
    var scoreList= JSON.parse(localStorage.getItem('scores'));
    /*Aray starts with 0 , so decrease one */
    TKN.IPSN.map.expId=TKN.IPSN.map.expId-1;


    var expInfo = new TKN.ExperimentInfoCard(recordList[TKN.IPSN.map.expId]);
    TKN.cardStack.addCard(expInfo);
    var livedata = new TKN.LiveDataCard(TKN.IPSN.map.expId, TKN.IPSN.map.dbId);
    TKN.cardStack.addCard(livedata);

    var scoreInfo = new TKN.ScoreInfoCard(scoreList,TKN.IPSN.map.expId);
    TKN.cardStack.addCard(scoreInfo);

});

TKN.IPSN.map.markerCallback = function(event) {
    TKN.IPSN.map.marker = this;
    
    var pointC=new TKN.PointInfoCard(TKN.IPSN.map.expId, this,TKN.IPSN.map.dbId)
    $("#point").remove();
    var ht='<div class="cards-card" id="point" style="display: block;"><div class="cards-summary"><h1>Measurement Point Info</h1></div><div class="cards-content open" style="height: 116px;">'+pointC.update()+'</div></div>';
    
    $("#cards ").append(ht);
    $("#point .cards-summary").click(function(){$("#point .cards-content").slideToggle("slow");});
};

TKN.IPSN.map.getDatabaseURL = function() {
    var url = '#';
    $.each(TKN.IPSN.map.config.databases, function(key, val) {
        if (val.label == TKN.IPSN.map.database)
            url = val.url;
    })
    return url;
};
