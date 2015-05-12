var TKN = TKN || {};
TKN.IPSN = TKN.IPSN || {};

TKN.IPSN.map = {
    config: {
        databases: [
            {label: 'Scenario 1', url: 'http://ebp.evarilos.eu:5009/evarilos/metrics/v1.0/database/experiment_1/experiment'},
            {label: 'Scenario 2', url: 'http://ebp.evarilos.eu:5009/evarilos/metrics/v1.0/database/experiment_2/experiment'},
            {label: 'Scenario 3', url: 'http://ebp.evarilos.eu:5009/evarilos/metrics/v1.0/database/experiment_3/experiment'},
            {label: 'Scenario 4', url: 'http://ebp.evarilos.eu:5009/evarilos/metrics/v1.0/database/experiment_4/experiment'}
        ],
        mapURL: 'http://localhost:5011/static/',
        containerId: 'map',
        apiURI_ECE: 'http://ebp.evarilos.eu:5010/',
        mapDimensions: {
            zeropoint: {
                Lat: -61.897577621605016,
                Lon: -177.626953125
            },
            xMax: {
                Lat:-61.897577621605016,
                Lon:178.3740234375
            },
            yMax: {
                Lat:68.52823492039876,
                Lon:-177.71484375
            },
            xDistance: 31.61,
            yDistance: 15.53
        },
        measurementPoints: {
            1:  {x: 22.60, y: 8.80,  room: "hollway_2nd" , label:'1'},
            2:  {x: 16.20, y: 8.00,  room: "hollway_2nd" , label:'2'},
            3:  {x: 9.80,  y: 8.80,  room: "hollway_2nd" , label:'3'},
            4:  {x: 3.50,  y: 8.00,  room: "hollway_2nd" , label:'4'},
            5:  {x: 1.80,  y: 10.80, room: "FT236" , label:'5'},
            6:  {x: 1.70,  y: 14.70, room: "FT236" , label:'6'},
            7:  {x: 1.80,  y: 5.30,  room: "FT222" , label:'7'},
            8:  {x: 5.00,  y: 11.80, room: "FT235" , label:'8'},
            9:  {x: 5.50,  y: 4.50,  room: "FT223" , label:'9'},
            10: {x: 5.90,  y: 0.80,  room: "FT223" , label:'10'},
            11: {x: 10.10, y: 12.60, room: "FT223" , label:'11'},
            12: {x: 11.00, y: 5.10,  room: "FT224" , label:'12'},
            13: {x: 11.00, y: 1.60,  room: "FT224" , label:'13'},
            14: {x: 14.00, y: 4.70,  room: "FT224" , label:'14'},
            15: {x: 14.30, y: 10.30, room: "FT233" , label:'15'},
            16: {x: 17.30, y: 12.50, room: "FT232" , label:'16'},
            17: {x: 17.30, y: 14.60, room: "FT232" , label:'17'},
            18: {x: 20.50, y: 10.80, room: "FT231" , label:'18'},
            19: {x: 17.50, y: 5.00,  room: "FT225" , label:'19'},
            20: {x: 16.50, y: 0.60,  room: "FT225" , label:'20'}
        }
    },
    instance: undefined,
    markers: {}
};

TKN.IPSN.map.getDatabaseURL = function() {
    var url = '#';
    $.each(TKN.IPSN.map.config.databases, function(key, val) {
        if (val.label == TKN.IPSN.map.database)
            url = val.url;
    })
    return url;
};

function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
};
