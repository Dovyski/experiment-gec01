<?php

/**
 * Receives data from post/get requests and stores it
 * in a database
 */

require_once(dirname(__FILE__) . '/../backend/config.php');
require_once(dirname(__FILE__) . '/../backend/inc/functions.php');

$aDb = db();

$aIsAPI  = isset($_REQUEST['api']);
$aUser   = isset($_REQUEST['user']) ? $_REQUEST['user'] : 0;
$aGame   = isset($_REQUEST['game']) ? $_REQUEST['game'] : 0;
$aMethod = isset($_REQUEST['method']) ? $_REQUEST['method'] : '';
$aRet    = array();

try {
    switch ($aMethod) {
        case 'subjects':
            $aStmt = $aDb->prepare("SELECT * FROM subjects WHERE 1");
            $aStmt->execute();

            $aData = array();

            while ($aRow = $aStmt->fetch(PDO::FETCH_OBJ)) {
                $aData[] = $aRow;
            }

            $aRet = array('success' => true, 'data' => $aData);
            break;

        case 'monitor':
            $aDbUser = userdb($aUser);
            $aTime = time() - 30;

            $aStmt = $aDbUser->prepare("SELECT * FROM logs WHERE uuid = :uuid AND timestamp >= :time");
            $aStmt->bindParam(':uuid', $aUser);
            $aStmt->bindParam(':time', $aTime);
            $aStmt->execute();

            $aData = array();

            while ($aRow = $aStmt->fetch(PDO::FETCH_OBJ)) {
                $aRow->data = json_decode($aRow->data);
                $aData[] = $aRow;
            }
            $aRet = array('success' => true, 'data' => $aData);
            break;

        case 'experiment':
            $aDbUser = userdb($aUser);
            $aData   = array('logs' => [], 'questionnaires' => [], 'games' => []);

            foreach($aData as $aType => $aValues) {
                if($aType == 'games') {
                    $aStmt = $aDbUser->prepare("SELECT * FROM games WHERE 1");
                } else {
                    $aStmt = $aDbUser->prepare("SELECT * FROM $aType WHERE uuid = :uuid");
                    $aStmt->bindParam(':uuid', $aUser);
                }

                $aStmt->execute();
    
                while ($aRow = $aStmt->fetch(PDO::FETCH_OBJ)) {
                    if($aType != 'games') {
                        $aRow->data = json_decode($aRow->data);
                    }
                    $aData[$aType][] = $aRow;
                }
            }

            $aRet = array('success' => true, 'data' => $aData);
            break;

        case 'active':
            $aTime = time() - 60 * 40;

            $aStmt = $aDb->prepare("SELECT * FROM subjects WHERE compleated_at = 0");
            $aStmt->bindParam(':time', $aTime);
            $aStmt->execute();

            $aData = array();

            while ($aRow = $aStmt->fetch(PDO::FETCH_OBJ)) {
                $aData[] = $aRow;
            }
            $aRet = array('success' => true, 'data' => $aData);
            break;

        default:
            throw new Exception('Unknow method "' . $aMethod . '"');
    }
} catch (Exception $e) {
    $aRet['success'] = false;
    $aRet['message'] = $e->getMessage();
}

if ($aIsAPI) {
    header('Content-type: application/json');
    echo json_encode($aRet);
    exit();
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Experiment | Dashboard</title>

    <!-- Bootstrap core CSS -->

    <link href="css/bootstrap.min.css" rel="stylesheet">

    <link href="fonts/css/font-awesome.min.css" rel="stylesheet">
    <link href="css/animate.min.css" rel="stylesheet">

    <!-- Custom styling plus plugins -->
    <link href="css/custom.css" rel="stylesheet">
    <link href="css/icheck/flat/green.css" rel="stylesheet">

    <script src="js/jquery.min.js"></script>

    <!--[if lt IE 9]>
        <script src="../assets/js/ie8-responsive-file-warning.js"></script>
        <![endif]-->

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->

</head>


<body class="nav-md">

    <div class="container body">

        <div class="main_container">

            <div class="col-md-3 left_col">
                <div class="left_col scroll-view">

                    <div class="navbar nav_title" style="border: 0;">
                        <a href="index.html" class="site_title"><i class="fa fa-rocket"></i> <span>Experiment</span></a>
                    </div>
                    <div class="clearfix"></div>

                    <br />

                    <!-- sidebar menu -->
                    <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
                    </div>
                    <!-- /sidebar menu -->
                </div>
            </div>

            <!-- top navigation -->
            <div class="top_nav">

                <div class="nav_menu">
                    <nav class="" role="navigation">
                        <div class="nav toggle">
                            <a id="menu_toggle"><i class="fa fa-bars"></i></a>
                        </div>
                    </nav>
                </div>

            </div>
            <!-- /top navigation -->

            <!-- page content -->
            <div class="right_col" role="main">
                <div class="" id="main-area">

                    <div class="page-title">
                        <div class="title_left">
                            <h3 id="subject-id"></h3>
                        </div>

                        <div class="title_right"></div>
                    </div>
                    <div class="clearfix"></div>

                    <div class="row">
                        <div class="col-md-12">
                            <div class="x_panel">
                                <div class="x_title">
                                    <h2 id="data-title">Welcome!</h2>
                                    <div style="float: right; display: none;">
                                        Grouping (in seconds):
                                        <select id="grouping">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="15">15</option>
                                            <option value="20">20</option>
                                            <option value="30">30</option>
                                            <option value="60">60</option>
                                        </select>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="x_content">
                                    <div class="row" style="display: none; padding: 10px; margin-bottom: 20px;" id="data-overview">
                                        <div class="tile_count" style="padding: 10px;">
                                            <div class="col-md-2 col-sm-4  tile_stats_count">
                                                <span class="count_top"><i class="fa fa-user"></i> Total Users</span>
                                                <div class="count" id="count-subjects-total">4567</div>
                                            </div>
                                            <div class="col-md-2 col-sm-4  tile_stats_count">
                                                <span class="count_top"><i class="fa fa-info-circle"></i> Valid Users (complete)</span>
                                                <div class="count green" id="count-subjects-valid">2500</div>
                                                <span class="count_bottom"><i class="green" id="percent-count-subjects-valid">4%</i> of total users</span>
                                            </div>
                                            <div class="col-md-2 col-sm-4  tile_stats_count">
                                                <span class="count_top"><i class="fa fa-warning"></i> Invalid Users (incomplete)</span>
                                                <div class="count red" id="count-subjects-invalid">123.50</div>
                                                <span class="count_bottom"><i class="red" id="percent-count-subjects-invalid">3%</i> of total users</span>
                                            </div>
                                            <div class="col-md-2 col-sm-4  tile_stats_count">
                                                <span class="count_top"><img src="img/pt.png" title="pt_BR" style="height: 20px; width: auto;" /> Users</span>
                                                <div class="count" id="count-subjects-pt">2500</div>
                                                <span class="count_bottom"><i id="percent-count-subjects-pt">4% </i> of total users</span>
                                            </div>
                                            <div class="col-md-2 col-sm-4  tile_stats_count">
                                                <span class="count_top"><img src="img/en.png" title="en_US" style="height: 20px; width: auto;" /> Users</span>
                                                <div class="count" id="count-subjects-en">2500</div>
                                                <span class="count_bottom"><i id="percent-count-subjects-en">4%</i> of total users</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-12" style="padding: 10px;" id="data-area">
                                            Use the menu on the left to select data to visualize.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div id="legend-area" class="col-md-12"></div>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- footer content -->
        <footer>
            <div class="">
                <p class="pull-right">Gentelella Alela! a Bootstrap 3 template by <a>Kimlabs</a>.</p>
            </div>
            <div class="clearfix"></div>
        </footer>
        <!-- /footer content -->

    </div>
    <!-- /page content -->
    </div>

    </div>

    <!-- JS stuff -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/nicescroll/jquery.nicescroll.min.js"></script>

    <script src="js/highcharts/highcharts-custom.js"></script>

    <script src="js/custom.js"></script>
    <script src="../js/ftg.utils.js"></script>
    <script src="js/app.js?20180220"></script>
    <script src="js/app.experimentviewer.js?20180220"></script>
    <script src="js/app.monitor.js?20180220"></script>
</body>

</html>