<?php

require 'Slim/Slim.php';
require 'functions/functions.php';
date_default_timezone_set("America/Fortaleza");

\Slim\Slim::registerAutoloader();


$app = new \Slim\Slim();


$app->get('/', function () use ($app) {
    $app->render('cdc.html');
});

function jsonpWrap($jsonp) {
  $app = Slim::getInstance();

  if (($jsonCallback = $app->request()->get('jsoncallback')) !== null) {
    $jsonp = sprintf("%s(%s);", $jsonCallback, $jsonp);
    $app->response()->header('Content-type', 'application/javascript');
  }
  return $jsonp;
}


$app->get('/test', function () use ($app) {
    //phpinfo();
    //printer($_SERVER["SERVER_SOFTWARE"]);
    $mongo = "";
    if($_SERVER['SERVER_NAME'] == "consultantshub.herokuapp.com"){
        $mongo = new Mongo('mongodb://marley:v1d4l0k4@paulo.mongohq.com:10004/consultantsDB');
    }else if($_SERVER['SERVER_NAME'] == "localhost"){
        $mongo = new Mongo( 'mongodb://localhost:27017');
    }else{

    }
    
    $db = $mongo->consultantsDB;
    $consultants = $db->consultants;
    $cons = $consultants->find();
    //printer($db);
    foreach ($cons as $obj) {
        echo $obj['_id'] ."<br/>";
        echo "<strong>Nome:</strong> " . $obj['name'] . "<br/>";
        echo "<strong>Idade:</strong> " . $obj['age'] . "<br/>";
        echo "<br/>";
    }
    $mongo->close();
});

$app->post('/consultant', function () use ($app) {
        //echo 'This is a POST route';
        //$app->response()->header('Content-Type', 'application/json;charset=utf-8');

                    // $callback = $app->request()->get('callback');
                    //$data = array('foo' => 'bar');
                    //echo $_GET['callback'] . '('.json_encode($data).')';
                    //echo sprintf("%s(%s)", $callback, json_encode($data));
                    //$resp = "";
                    //echo $app->response()->body(jsonpWrap(json_encode($data)));
        $arr = $app->request()->params();
        printer($arr);
                    //$app->stop();   
          //db.consult.insert({name: "nome usuario", age: 25});
          // $mongo->selectDB('consultantsDB')->selectCollection('consultants')->insert( array( 'nome' => utf8_decode($node->user->name) , 'tweet' => $node->text ) );
    }
);


$app->put('/put',
    function () {
        echo 'This is a PUT route';
    }
);


$app->delete('/delete',
    function () {
        echo 'This is a DELETE route';
    }
);

$app->run();
