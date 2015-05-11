TKN.PointInfoCard = function (expid, marker,db) {
    var _this = this;
    this.expId = expid;
    this.db=db;
    this.marker = marker;
    this.pointId = marker.getTitle();
    this.summary = 'Measurement Point Info';
    this.content = '<p>loading...</p>';

    this.updateSummary();
    this.updateContent();
    
    this.update();
};

TKN.PointInfoCard.inherits(TKN.Card);

TKN.PointInfoCard.method('update', function() {
    var _this = this;

    var data=(JSON.parse(localStorage.getItem('experiment_'+this.db))[this.expId]);
    
    //$.getJSON( TKN.IPSN.map.getDatabaseURL() + '/' + this.expId, function( data ) {
        var content = '<p id="lastLabel"><em>Label:</em> ' + _this.pointId + '<p>';
        content += '<p>No information available</p>';
        if (TKN.IPSN.map.errorradius)
            TKN.IPSN.map.errorradius.setMap();
        if (TKN.IPSN.map.errormarker)
            TKN.IPSN.map.errormarker.setMap();
        $.each(data.locations, function (key, val) {
            if (val.point_id == _this.pointId) {
              
                content = '<p id="lastLabel"><em>Label:</em> ' + val.point_id + '<p>';
                content += '<p><em>Coordinates:</em> ' + val.true_coordinate_x.toFixed(3) + ' / ' + val.true_coordinate_y.toFixed(3) + '</p>';
                content += '<p><em>Estimated Coordinates:</em> ' + val.est_coordinate_x.toFixed(3) + ' / ' + val.est_coordinate_y.toFixed(3) + '</p>';
                

                content += '<p><em>Room Label:</em> ' + val.true_room_label + ' </p>';
                content += '<p><em>Estimated Room Label:</em> ' + val.est_room_label + ' </p>';
                content += '<p><em>Localization Error:</em> ' + val.localization_error_2D.toPrecision(3) + ' m</p>';
                content += '<p><em>Latency:</em> ' + val.latency.toPrecision(3) + ' sec</p>';
                
                var dist = TKN.IPSN.map.pointsToDistance(val.true_coordinate_x, val.true_coordinate_y, val.est_coordinate_x, val.est_coordinate_y);
                TKN.IPSN.map.errorradius = TKN.IPSN.map.drawErroRadius(val.true_coordinate_x, val.true_coordinate_y, dist);
                TKN.IPSN.map.errormarker = TKN.IPSN.map.drawErrorMarker(val.est_coordinate_x, val.est_coordinate_y);
            } 
        });
        
        _this.updateContent(content);
        _this.open();
        return content;
        
        
    //});
});
