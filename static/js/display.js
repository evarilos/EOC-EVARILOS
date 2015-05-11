var TKN = TKN || {};
TKN.IPSN = TKN.IPSN || {};

TKN.IPSN.ranking = {
    config: {
        updateInterval: 30000,
        databases: [
            {label: 'Scenario 1', url: 'http://ebp.evarilos.eu:5009/evarilos/metrics/v1.0/database/experiment_1/experiment'},
            {label: 'Scenario 2', url: 'http://ebp.evarilos.eu:5009/evarilos/metrics/v1.0/database/experiment_2/experiment'},
            {label: 'Scenario 3', url: 'http://ebp.evarilos.eu:5009/evarilos/metrics/v1.0/database/experiment_3/experiment'},
            {label: 'Scenario 4', url: 'http://ebp.evarilos.eu:5009/evarilos/metrics/v1.0/database/experiment_4/experiment'}

        ],
        defaultDB: 'Scenario 1',
        detailsURL: 'http://localhost:5006/details.html'
    }
};

jQuery(function() {
 
    $.each(TKN.IPSN.ranking.config.databases, function(key, val) {
        var a = $('<a />').addClass('databaseLink').html(val.label);
        if (val.label == TKN.IPSN.ranking.config.defaultDB)
            a.addClass('active');
        a.appendTo($('#database'));
        a.on('click', TKN.IPSN.ranking.changeDB);
    });
    
    // Click Handler

});
