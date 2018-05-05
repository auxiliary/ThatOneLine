<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ThatOneLine - One line code annotation</title>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/tipso.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Alegreya+Sans" rel="stylesheet">

    <link rel="stylesheet" type="text/css" href="http://cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick.css"/>
    <link rel="stylesheet" type="text/css" href="http://cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick-theme.css"/>

    <link href="css/style.css" rel="stylesheet">

    <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="http://cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick.min.js"></script>
    <script src="js/tipso.js"></script>
    <script src="http://d3js.org/d3.v3.min.js"></script>
    <script src="js/tools.js"></script>
    <script src="js/canvext.js"></script>
    <script src="js/markode.js"></script>
    <script src="js/main.js"></script>
</head>
<body>
<style>#forkongithub a{background:#000;color:#fff;text-decoration:none;font-family:arial,sans-serif;text-align:center;font-weight:bold;padding:5px 40px;font-size:1rem;line-height:2rem;position:relative;transition:0.5s;}#forkongithub a:hover{background:#c11;color:#fff;}#forkongithub a::before,#forkongithub a::after{content:"";width:100%;display:block;position:absolute;top:1px;left:0;height:1px;background:#fff;}#forkongithub a::after{bottom:1px;top:auto;}@media screen and (min-width:800px){#forkongithub{position:fixed;display:block;top:0;right:0;width:200px;overflow:hidden;height:200px;z-index:9999;}#forkongithub a{width:200px;position:absolute;top:42px;right:-50px;transform:rotate(45deg);-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);-moz-transform:rotate(45deg);-o-transform:rotate(45deg);box-shadow:4px 4px 10px rgba(0,0,0,0.8);}}</style><span id="forkongithub"><a href="https://github.com/auxiliary/thatoneline">Fork me on GitHub</a></span>
    <div class="wrapper">
        <div class="title">
            That<span class="emph">One</span>Line
        </div>
        <div id="menu">
            <div class="steps">
                <b>Steps:</b> <span class="step">1</span>Type <span class="step">2</span>Select <span class="step">3</span>Annotate <span class="step">4</span>Share 
            </div>
            <div class="buttons">
                <button class="btn " id="btn-share" data-toggle="modal" data-target="#myModal"><i class="fa fa-share-alt" aria-hidden="true"></i> Share</button>
                <button class="btn" id="btn-clear"><i class="fa fa-trash" aria-hidden="true"></i> Clear</button>
            </div>
        </div>
        <div class="canvext"> </div>

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

        <?php date_default_timezone_set('America/New_York'); ?>
        <div class="footer">Copyright &copy; <?php echo date("Y"); ?> Moh. Raji</div>
    </div>
</body>
</html>
