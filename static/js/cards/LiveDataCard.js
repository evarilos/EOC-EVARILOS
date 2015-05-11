TKN.LiveDataCard = function (id,db) {
    var _this = this;
    this.id = id;
    this.db=db;
    this.summary = 'Evaluation Summary';
    this.content = '<p>loading...</p>';
    this.updateSummary();
    this.updateContent();
    this.update();
};

TKN.LiveDataCard.inherits(TKN.Card);

TKN.LiveDataCard.method('update', function() {
    var _this = this;
    
    var data=(JSON.parse(localStorage.getItem('experiment_'+this.db))[this.id]);
    var robust=JSON.parse(localStorage.getItem('scores'));
    
        var content = '';
        if (data.locations)
            content += '<p><em>Locations visited:</em> ' + data.locations.length + '<p>';
        else
            content += '<p><em>Locations visited:</em> 0<p>';
        content += '<p><em>Average Localization Error:</em> ' + data.primary_metrics.accuracy_error_2D_average.toFixed(3) + ' m</p>';
        content += '<p><em>Localization Error Median:</em> ' + data.primary_metrics.accuracy_error_2D_median.toFixed(3) + ' m</p>';
        content += '<p><em>RMS Localization Error:</em> ' + data.primary_metrics.accuracy_error_2D_rms.toFixed(3) + ' m</p>';
        content += '<p><em>75 Percentile Localization Error:</em> ' + data.primary_metrics.accuracy_error_2D_75_percentile.toFixed(3) + ' m</p>';
        content += '<p><em>90 Percentile Localization Error:</em> ' + data.primary_metrics.accuracy_error_2D_90_percentile.toFixed(3) + ' m</p>';
        content += '<p><em>Localization Error Variance:</em> ' + data.primary_metrics.accuracy_error_2D_variance.toFixed(3) + ' m</p>';        
        content += '<p><em>Minimum Localization Error:</em> ' + data.primary_metrics.accuracy_error_2D_min.toFixed(3) + ' m</p>';        
        content += '<p><em>Maximum Localization Error:</em> ' + data.primary_metrics.accuracy_error_2D_max.toFixed(3) + ' m</p>'; 
        content += '<p><em>Room Level Error:</em> ' + (data.primary_metrics.room_accuracy_error_average.toFixed(3)*100) + ' %</p>';
        content += '<p><em>Average Latency:</em> ' + data.primary_metrics.latency_average.toFixed(3) + ' sec</p>';
        content += '<p><em>Latency Median:</em> ' + data.primary_metrics.latency_median.toFixed(3) + ' sec</p>';
        content += '<p><em>Latency RMS:</em> ' + data.primary_metrics.latency_rms.toFixed(3) + ' sec</p>';
        content += '<p><em>Latency 75 Percentile Error:</em> ' + data.primary_metrics.latency_75_percentile.toFixed(3) + ' sec</p>';
        content += '<p><em>Latency 90 Percentile Error:</em> ' + data.primary_metrics.latency_90_percentile.toFixed(3) + ' sec</p>';
        content += '<p><em>Average Latency Variance:</em> ' + data.primary_metrics.latency_variance.toFixed(3) + ' sec</p>';
        content += '<p><em>Latency Min:</em> ' + data.primary_metrics.latency_min.toFixed(3) + ' sec</p>';
        content += '<p><em>Latency Max:</em> ' + data.primary_metrics.latency_max.toFixed(3) + ' sec</p>';
        content += '<p><em>Interference Robustness:</em> ' + robust.scene1[this.id][6] + ' %</p>';

        _this.updateContent(content);
});
