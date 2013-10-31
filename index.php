<?php

require 'Slim/Slim.php';
require 'functions/functions.php';
date_default_timezone_set("America/Fortaleza");

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

session_start();

$mongo = "";  
if($_SERVER['SERVER_NAME'] == "hubconsultants.herokuapp.com"){
    $mongo = new Mongo('mongodb://marley:v1d4l0k4@paulo.mongohq.com:10004/consultantsDB');
}else if($_SERVER['SERVER_NAME'] == "localhost"){
    $mongo = new Mongo('mongodb://localhost:27017');
}else{
    echo 'out of the headquarters o.O';
}

$db = $mongo->consultantsDB;

$app->get('/', function () use ($app) {
    $app->render('cdc.html');
});

/*function jsonpWrap($jsonp) {
  $app = Slim::getInstance();

  if (($jsonCallback = $app->request()->get('jsoncallback')) !== null) {
    $jsonp = sprintf("%s(%s);", $jsonCallback, $jsonp);
    $app->response()->header('Content-type', 'application/javascript');
  }
  return $jsonp;
}*/

$authenticate = function ($app) {
    return function () use ($app) {
        if (!isset($_SESSION['user_id'])) {
            $app->flash('error', 'É necessário estar logado para acessar o dashboard!');
            $app->redirect(get_root_url().'admin');
        }
    };
};


/*$app->get('/(:obj)', $authenticate($app), function ($obj) use ($app,$db) {
      $consultants = $db->consultants;
      $cons['cons'] = $consultants->findOne(array('_id' => new MongoId($obj)));
      if($cons){
          $app->render('cdc.html',$cons);
      }else{
        //$app->render('404.html');
      } 
})->conditions(['obj' => '[0-9a-z]{24}']);*/


$app->get('/consultants', function () use ($app,$db) {
    $consultants = $db->consultants;
    $cons = $consultants->find();

    $total = $cons->count(true);
    echo ($total) ." registros encontrados.<p>";
    //$mongo->close();
    foreach ($cons as $key => $obj) {
        if(is_array($obj)){
            echo $key.'</br>';
            printer($obj);
        }else{
            echo $key.'   '.$obj.'</br>';
        }
    }
    $mongo->close();
});

/*$app->get('/consultants/(:id)', $authenticate($app), function($id) use ($app){ 
      if($app->request->isAjax()){
        //echo $app->request->isAjax();
        //$app->redirect('consultant.html');
        $app->redirect('/view_consultant/'+1);
        //$app->render('consultant.html');
        //$req = $app->request;
        //printer($req->getReferrer());
       // $app->response->setStatus(400);
        //$app->response->redirect('/view_consultant/'+1);
        //$app->request->redirect('/view_consultant/'+1); 
      } 
});*/

$app->get('/view_consultant/(:id)', $authenticate($app), function($id) use ($app,$db){
    $consultants = $db->consultants;
    $consultor['consultor'] = $consultants->findOne(array('_id' => new MongoId($id)));
    $app->render('consultant.html',$consultor);
});


$app->get('/admin', function () use ($app) {
    $app->render('admin.html');
});


$app->get('/dashboard', $authenticate($app), function () use ($app,$db) {
    $consultores['consultores'] = "";
    $consultores['total'] = "";

    $consultants = $db->consultants;
    $consultores['consultores'] = $consultants->find();
    $consultores['total'] = $consultores['consultores']->count(true);

    $app->render('dashboard.html',$consultores);
});


$app->post('/login', function () use ($app,$db) {
    $users = $db->users;
    $data = $app->request()->params();
    $pass = md5($data['password']);

    $criteria = array(
        'login' => $data['login'], 'password' => $pass
    );

    $resultado = $users->findOne($criteria);

       //if (is_object($resultado) && (count(get_object_vars($resultado)) > 0)) {
    if ($resultado){
        $_SESSION['user_id'] = $resultado['_id'];
        $_SESSION['user_login'] = $resultado['login'];
        $app->flash('success', 'Você está logado !');
        $app->redirect(get_root_url().'dashboard');
    }else{
         //$app->response()->header('Content-Type', 'application/json;charset=utf-8');
         //echo json_encode(array("msg"=>0));
        $app->flash('error', 'Não foi possível logar no sistema');
        $app->redirect(get_root_url().'admin');
    }
    $mongo->close();
});


$app->get('/logout', function () use ($app) {
    $_SESSION = array();
    $app->redirect(get_root_url().'admin');
});


$app->post('/user', function () use ($app,$db) {
    $users = $db->users;
    $data = $app->request()->params();
    $pass = md5($data['password']);

    $criteria = array(
      'login' => $data['login'], 'password' => $pass
    );

    if($users->insert($criteria)){
        echo 'usuario cadastrado!';
    }else{
        echo 'nem';
    }
    $mongo->close();
});


$app->get('/test', function () use ($app,$db) {
    //phpinfo();
    //printer($_SERVER["SERVER_SOFTWARE"]);
    //printer($_SERVER['SERVER_NAME']);

    $consultants = $db->consultants;
    $cons = $consultants->find();

    foreach ($cons as $obj) {
        echo $obj['_id'] ."<br/>";
        echo "<strong>Nome:</strong> " . $obj['name'] . "<br/>";
        
        echo "<br/>";
    }
    $mongo->close();
});


$app->post('/consultant', function () use ($app,$db) {
    $output = $app->request()->params();
    $consultants = $db->consultants;
    if($consultants->insert($output)){
        echo 'Parabéns! seu cadastrado foi realizado com sucesso!';
    }else{
        echo 'Infelizmente não foi possível realizar seu cadastro, o problema já está sendo resolvido!';
    }
    $mongo->close();
});


$app->error(function (\Exception $e) use ($app) {
    $app->render('error.html');
});


$app->notFound(function () use ($app) {
    $app->render('404.html');
});


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