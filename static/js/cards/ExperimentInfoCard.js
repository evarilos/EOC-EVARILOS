TKN.ExperimentInfoCard = function (data) {
    var _this = this;
    this.data = data;
    this.summary = 'Experiment Info';
    this.content = '<p>loading...</p>';
    this.updateSummary();
    this.updateContent();
    
    var content = '<p><em>Name:</em> ' + data.sut.sut_name+ '<p>';
    content += '<p><em>Competitor:</em> ' + data.sut.competitor_name + '</p>';
    content += '<p><em>Link:</em><a target="_blank" href="' + data.sut.link + '.pdf">'+(data.sut.link).replace("http://"," ")+'</a></p>';
    content += '<p><em>Experiment Description:</em> ' + data.scenario.experiment_description + '</p>';
    content += '<p><em>Testbed label:</em> ' + data.scenario.testbed_label + '</p>';
    content += '<p><em>Testbed Description:</em> ' + data.scenario.testbed_description + '</p>';
    content += '<p><em>Interference Description:</em> ' + data.scenario.interference_description + '</p>';       
    content += '<p><em>Sender Description:</em> ' + data.scenario.sender_description + '</p>';    
    content += '<p><em>Receiver Description:</em> ' + data.scenario.receiver_description + '</p>';

    _this.updateContent(content);
};

TKN.ExperimentInfoCard.inherits(TKN.Card);
