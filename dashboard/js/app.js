var APP = APP || {};

APP.instance = null;

APP.Main = function() {
    var mSelf = this;

    this.grouping = 20;
    this.subject = 0;
    this.viewers = [];

    this.generateSideMenu = function() {
        $('#main-menu').empty();

        this.generateSessionsMenu();
        this.makeLinksClickable();
    };

    this.makeLinksClickable = function() {
        var aSelf = this;

        $('a.action-link').click(function() {
            var aAction = $(this).data('action');

            if(aAction == 'active') {
                aSelf.showActiveSession();
            } else if (aAction == 'overview') {
                aSelf.showOverview();
            }
        });
    };

    this.generateSessionsMenu = function() {
        var aOut,
            aSelf = this;

        aOut =
            '<li>' +
                '<a><i class="fa fa-bar-chart-o"></i> Subjects <span class="fa fa-chevron-down"></span></a>' +
                '<ul class="nav child_menu" style="display:none;">' +
                    '<li><a href="javascript:void(0)" class="action-link" data-action="active">Active</a></li>' +
                '</ul>' +
                '<ul class="nav child_menu">' +
                    '<li><a href="javascript:void(0)" class="action-link" data-action="overview">Overview</a></li>' +
                '</ul>' +
            '</li>';

        $('#sidebar-menu').append('<ul class="nav side-menu">' + aOut + '</ul>');
    };

    this.showActiveSession = function() {
        var aMonitor;

        aMonitor = new APP.Monitor('main-area', this);
        aMonitor.run();
    };

    this.getDateFromTimestamp = function(theTimestamp, theSeconds) {
        var aDate = new Date(theTimestamp * (theSeconds ? 1000 : 1));
        return aDate.toISOString();
    }

    this.showOverview = function() {
        var aSelf = this;

        // Clear any previously existent experiment viewers
        $('#data-title').empty();
        $('#data-area').empty().html('Loading data... <i class="fa fa-spin fa-circle-o-notch"></i>');

        this.loadData({method: 'subjects'}, function(theInfo) {
            var aOut = '',
                aRows = '',
                aGroups = {valid: [], invalid: []},
                aInfo;

            $('#data-overview').show();

            for(var i = 0; i < theInfo.data.length; i++) {
                aInfo = theInfo.data[i];

                var isValid = aInfo.compleated_at != 0;
                var aDateCreated = new Date(aInfo.created_at * 1000);
                var aDateCompleated = new Date(aInfo.compleated_at * 1000);
                var aSubjectId = aInfo.id + aInfo.uuid;

                if(!aGroups[aInfo.locale]) {
                    aGroups[aInfo.locale] = [];
                }

                aGroups[aInfo.locale].push(aInfo);
                aGroups[isValid ? 'valid' : 'invalid'].push(aInfo);

                aRows +=
                    '<tr>' +
                        '<th scope="row">' + aInfo.id + '</th>' +
                        '<td>' + aInfo.uuid + '</th>' +
                        '<th scope="row">' +
                            '<a href="javascript:void(0)" data-subject="' + aSubjectId + '" class="subject-link">'+ aSubjectId +'</a>' +
                        '</th>' +
                        '<td><img src="img/' + aInfo.locale + '.png" title="Locale: ' + aInfo.locale + '" /></td>' +
                        '<td>' + aDateCreated.toISOString() + '</td>' +
                        '<td>' + (isValid ? aDateCompleated.toISOString() : '<span class="badge alert-danger">Still incomplete</span>') + '</td>' +
                    '</tr>';
            }

            aOut +=
                '<table class="table table-striped">' +
                    '<thead>' +
                        '<tr>' +
                            '<th>Id</th>' +
                            '<th>UUID</th>' +
                            '<th>SubjectID</th>' +
                            '<th>locale</th>' +
                            '<th>Created at</th>' +
                            '<th>Compleated at</th>' +
                        '</tr>' +
                    '</thead>' +
                    '<tbody>' +
                        aRows
                    '</tbody>' +
                '</table>';

            $('#data-area').html(aOut);
            $('#count-subjects-total').html(theInfo.data.length);

            for(var type in aGroups) {
                $('#count-subjects-' + type).html(aGroups[type].length);
                $('#percent-count-subjects-' + type).html(((aGroups[type].length / theInfo.data.length) * 100).toFixed(2) + '%');
            }

            $('#data-area a.subject-link').click(function() {
                aSelf.showSubjectData($(this).data('subject'));
            });
        });
    };

    this.generateExperimentsMenu = function() {
        var aSelf = this;

        this.loadData({method: 'subjects'}, function(theInfo) {
            var aOut = '',
                j,
                aInfo,
                i;

            aOut += '<ul class="nav side-menu"><li><a><i class="fa fa-bar-chart-o"></i> Subjects <span class="fa fa-chevron-down"></span></a>' +
                    '<ul class="nav child_menu" style="display: none;">';

            for(i = 0; i < theInfo.data.length; i++) {
                aInfo = theInfo.data[i];
                aOut += '<li><a href="javascript:void(0)" data-subject="' + aInfo.uuid + '" class="subject-link">'+ aInfo.uuid +'</a></li>';
            }

            aOut += '</ul></li></ul>';

            $('#sidebar-menu').append(aOut);

            $('#sidebar-menu a.subject-link').click(function() {
                aSelf.showSubjectData($(this).data('subject'));
            });

            customUpdateSidebarMenu();
        });
    };

    this.showSubjectData = function(theSubject) {
        var aSelf = this;
        this.subject = theSubject;

        // Clear any previously existent experiment viewers
        aSelf.viewers.length = 0;
        
        $('#data-overview').hide();
        $('#data-title').empty();
        $('#data-area').empty().html('Loading data... <i class="fa fa-spin fa-circle-o-notch"></i>');

        this.loadData({method: 'experiment', user: theSubject, grouping: this.grouping}, function(theData) {
            var aViewer = '',
                i,
                aGame,
                aId,
                aGames;

            if(theData.success) {
                $('#data-title').html('Subject: ' + theSubject);
                $('#data-area').empty();

                aGames = theData.data.games;

                for(i = 0; i < aGames.length; i++) {
                    aSelf.showSubjectLogsByGame('data-area', theData.data, aGames[i]);
                }

                aSelf.showSubjectDemographicInfo('data-area', theData.data);

            } else {
                $('#data-area').html('Something wrong');
            }
        });
    };

    this.showSubjectDemographicInfo = function(theContainerId, theData) {
        var aOut = '',
            aInfo = [],
            aHasDemographic = true,
            i;

        if(theData.questionnaires.length == 0) {
            return;
        }

        aHasDemographic = theData.questionnaires.length > theData.games.length;

        if(aHasDemographic) {
            aInfo = theData.questionnaires[theData.games.length + 1].data;
        }

        aOut += '<h2>Demographics</h2>';
        aOut += '<table border="1" class="demographics">';
        aOut += '<tr><th style="width: 70%;">Question</th><th style="width: 30%">Answer</th></tr>';
        for(i = 0; i < aInfo.length; i++) {
            aOut += '<tr><td>' + aInfo[i].q + '</td><td>' + aInfo[i].al + ' (' + aInfo[i].a + ')</td></tr>';
        }
        if(aInfo.length == 0) {
            aOut += '<tr><td colspan="2">This subject has no demographic data.</td></tr>';
        }
        aOut += '</table>';

        $('#' + theContainerId).append('<div id="demographics">' + aOut + '</div>');
    };

    this.showSubjectLogsByGame = function(theContainerId, theData, theGame) {
        var aOut = '',
            aExtra = [],
            aInfo,
            aSelf = this,
            i;

        aOut += '<h2>' + theGame.name +'</h2>';
        aOut += '<table border="1" class="demographics">';
        aOut += '<tr><th style="width: 20%;">Game</th><th style="width: 20%;">Database time</th><th style="width: 60%">Log data</th></tr>';
        for(i = 0; i < theData.logs.length; i++) {
            aInfo = theData.logs[i];

            if(aInfo.fk_game < 0) {
                aExtra.push(aInfo);
            }

            if(aInfo.fk_game != theGame.id) {
                continue;
            }
            
            var aGameActions = [];

            aInfo.data.map(function(entry) {
                aGameActions.push(aSelf.getDateFromTimestamp(entry.t) + ': ' + entry.d);
            });

            aOut += '<tr><td>' + theGame.name + ' (id  ' + aInfo.fk_game + ')</td><td>' + this.getDateFromTimestamp(aInfo.timestamp, true) + '</td><td>' + aGameActions.join('<br />') + '</td></tr>';
        }
        aOut += '</table>';

        $('#' + theContainerId).append('<div id="logs-' + theGame.id + '">' + aOut + '</div>');
    };

    this.getExperimentViewerByIndex = function(theIndex) {
        return this.viewers[theIndex];
    };

    this.loadData = function(theData, theCallback, theCallbackContext) {
        $.ajax({
            method: 'POST',
            url: './index.php?api=1&',
            dataType: 'json',
            data: theData,
        })
        .done(function(theInfo) {
            theCallback.call(theCallbackContext || this, theInfo);
        })
        .fail(function() {
            $('#facial-tracking').html('Unable to load data!');
        })
        .always(function() {

        });
    };

    this.init = function() {
        var aSelf = this;

        this.generateSideMenu();

        $('#grouping').val(this.grouping);

        $('#grouping').on('change', function() {
            aSelf.grouping = $(this).val();
        });
    }
};

$(function () {
    APP.instance = new APP.Main();
    APP.instance.init();

    if(FTG.Utils.getURLParamByName('active')) {
        APP.instance.showActiveSession();
    }
});
