<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Canvext</title>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/tipso.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Alegreya+Sans" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">

    <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="js/tipso.js"></script>
    <script src="http://d3js.org/d3.v3.min.js"></script>
    <script src="js/tools.js"></script>
    <script src="js/canvext.js"></script>
    <script src="js/markode.js"></script>
    <script>
        $(document).ready(function(){
            var markode = $(".canvext").markode({});
        });
    </script>
</head>
<body>
    <div class="wrapper">
        <div class="title">
            That<span class="emph">One</span>Line
        </div>
        <button class="btn " id="btn-share" data-toggle="modal" data-target="#myModal"><i class="fa fa-share-alt" aria-hidden="true"></i> Share</button>
        <button class="btn" id="btn-clear"><i class="fa fa-trash" aria-hidden="true"></i> Clear</button>
        <div class="canvext"> </div>

        <!-- Modal -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Share</h4>
              </div>
              <div class="modal-body">
                <input class="form-control" id="clipboard" type="text">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        <div class="footer">Copyright (C) 2017 Moh. Raji</div>
    </div>
</body>
</html>
