<?php

require 'Slim/Slim.php';
require 'functions/functions.php';
date_default_timezone_set("America/Fortaleza");

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

session_start();

//printer( $_SERVER['SERVER_ADDR']); // "172.16.192.82"
//printer(get_machine_ips());
/*
string(14) "172.17.192.246"
[1]=>
string(14) "172.17.192.247"
*/

$mongo = "";  
if($_SERVER['SERVER_NAME'] == "hubconsultants.herokuapp.com" || $_SERVER['SERVER_NAME'] == "www.cadastrodeconsultores.com.br"){
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
        if (!isset($_SESSION['user']['_id'])) {
            $app->flash('error', 'É necessário estar logado para acessar o dashboard!');
            $app->redirect(get_root_url().'admin');
        }
    };
};


$app->get('/(:obj)', $authenticate($app), function ($obj) use ($app,$db) {
      $consultants = $db->consultants;
      $cons['cons'] = $consultants->findOne(array('_id' => new MongoId($obj)));
      if($cons){
          $app->render('cdc.html',$cons);
      }else{
        //$app->render('404.html');
      } 
})->conditions(array('obj' => '[0-9a-z]{24}'));


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
    //$mongo->close();
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

    $user = $users->findOne($criteria);

       //if (is_object($resultado) && (count(get_object_vars($resultado)) > 0)) {
    if ($user){
        $_SESSION['user'] = $user;
        /*$_SESSION['user_id'] = $user['_id'];
        $_SESSION['user_login'] = $user['login'];
        $_SESSION['user_type'] = $user['type'];*/
        $app->flash('success', 'Você está logado !');
        $app->redirect(get_root_url().'dashboard');
    }else{
         //$app->response()->header('Content-Type', 'application/json;charset=utf-8');
         //echo json_encode(array("msg"=>0));
        $app->flash('error', 'Não foi possível logar no sistema');
        $app->redirect(get_root_url().'admin');
    }
    //$mongo->close();
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
});

$app->put('/user', function () use ($app,$db) {
    $users = $db->users;
    $data = $app->request()->params();
    $pass = md5($data['password']);

    $output = array(
      'login' => $data['login'], 'password' => $pass, 'type' => $data['type']
    );

    $where = array("login" => $data["login"]); 
    if($users->update($where,$output)){
        echo 'Uusuário atualizado com sucesso!';
    }else{
        echo 'Não foi possível atualizar este usuário, o problema já está sendo resolvido!';  
    }
});


$app->get('/test', function () use ($app,$db) {
    //phpinfo();
    //printer($_SERVER["SERVER_SOFTWARE"]);
    //printer($_SERVER['SERVER_NAME']);

    $users = $db->users;
    $cons = $users->find();

    foreach ($cons as $obj) {
        echo $obj['_id'] ."<br/>";
        echo "<strong>Nome:</strong> " . $obj['login'] . "<br/>";
        echo "<strong>Type:</strong> " . $obj['type'] . "<br/>";
        
        echo "<br/>";
    }
    //$mongo->close();
});


$app->post('/consultant', function () use ($app,$db) {
    $output = $app->request()->params();
    $consultants = $db->consultants;

    if(isset($output['email-consulting']) || isset($output['email-consultoria'])){
        $where = $output['email-consulting']!=""?array("email-consulting" => $output['email-consulting']):array("email-consultoria" => $output['email-consultoria']);
        $obj = $consultants->findOne($where);
        if($obj){
            $where = array("_id" => new MongoId($obj['_id'])); 
            if($consultants->update($where,$output)){
                echo 'Seu cadastro foi atualizado com sucesso!';
            }else{
                echo 'Não foi possível atualizar seu cadastro, o problema já está sendo resolvido!';  
            }
        }else{
            if($consultants->insert($output)){
                echo 'Seu cadastro foi realizado com sucesso!';
            }else{
                echo 'Não foi possível realizar seu cadastro, o problema já está sendo resolvido!';
            }
        }
    }else{
        echo 'Por favor preencha o e-mail de contato para consultoria (primeira página do formulário de cadastro)';
    }
});


$app->put('/consultant', function () use ($app,$db) {
    $output = $app->request()->params();
    $consultants = $db->consultants;
    $data = $output['data'];
    $_id = $output['_id'];
    //echo $_id;
    //$consu = $consultants->findOne(array('_id' => new MongoId($_id)));
    $where = array("_id" => new MongoId($_id));
    //printer($consu);
    if($consultants->update($where,$data)){
        echo 'Seu cadastro foi atualizado com sucesso!';
    }else{
        echo 'Não foi possível atualizar seu cadastro, o problema já está sendo resolvido!';
    }
});


$app->delete('/consultant', function () use ($app,$db) {
    $output = $app->request()->params();
    $consultants = $db->consultants;
    $_id = $output['_id'];
    $where = array("_id" => new MongoId($_id));
    if($consultants->remove($where)){
        echo 'O registro foi removido com sucesso!';
    }else{
        echo 'Não foi possível remover esse registro';
    }
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