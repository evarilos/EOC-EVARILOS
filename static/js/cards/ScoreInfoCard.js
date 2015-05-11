TKN.ScoreInfoCard = function (data,id) {
    var _this = this;
    this.data = data;
    this.id = id;
    this.summary = 'Scores';
    this.content = '<p>loading...</p>';
    this.updateSummary();
    this.updateContent();
   
    var content = '';
    content+="<table class='scoretable'>";

    content+="<trscoreList><th>Score</th><th>Scenario 1</th><th>Scenario 2</th><th>Scenario 3</th></tr>";id
    content+="<tr><td >Point Acc. Score:</td><td >"+data.scene1[id][7]+"</td><td>"+data.scene2[id][7]+"</td><td>"+data.scene3[id][7]+"</td></tr>";
    content+="<tr><td>Room Acc. Score:</td><td>"+data.scene1[id][8]+"</td><td>"+data.scene2[id][8]+"</td><td>"+data.scene3[id][8]+"</td></tr>";
    content+="<tr><td>Latency Score:</td><td>"+data.scene1[id][9]+"</td><td>"+data.scene2[id][9]+"</td><td>"+data.scene3[id][9]+"</td></tr>";
    content+="<tr><td>Interference Score:</td><td>"+data.scene1[id][10]+"</td><td>"+data.scene2[id][10]+"</td><td>"+data.scene3[id][10]+"</td></tr>";
    content+="<tr><td>Final Score:</td><td>"+data.scene1[id][11]+"</td><td>"+data.scene2[id][11]+"</td><td>"+data.scene3[id][11]+"</td></tr>";
    content+="</table>";
    _this.updateContent(content);
};

TKN.ScoreInfoCard.inherits(TKN.Card);
