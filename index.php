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
    //printer($_SERVER['SERVER_NAME']);
    $mongo = "";   
    if($_SERVER['SERVER_NAME'] == "polar-lake-2571.herokuapp.com"){
        $mongo = new Mongo('mongodb://marley:v1d4l0k4@paulo.mongohq.com:10004/consultantsDB');
       
    }else if($_SERVER['SERVER_NAME'] == "localhost"){
        $mongo = new Mongo( 'mongodb://localhost:27017');
    }else{
        echo 'out of the headquarter o.O';
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
        $output = $app->request()->params();
         //printer($arr);
       // $output = json_validate(json_decode(stripslashes($arr)));

       // $uname = json_encode($arr);
       // $output = json_validate(serialize($arr));
        //echo serialize($arr);
       

       /* foreach ($output as $key => $value) {
            if($value!="undefined"){
                if(is_array($value)){
                    echo $key.'</br>';
                    printer($value);
                }else{
                   echo $key.'   '.$value.'</br>';
                }
            }

        }*/

        //$consultantData = json_decode($output);

        $mongo = "";
        if($_SERVER['SERVER_NAME'] == "polar-lake-2571.herokuapp.com"){
            $mongo = new Mongo('mongodb://marley:v1d4l0k4@paulo.mongohq.com:10004/consultantsDB');
        }else if($_SERVER['SERVER_NAME'] == "localhost"){
            $mongo = new Mongo( 'mongodb://localhost:27017');
        }
        
        $db = $mongo->consultantsDB;
        //printer($db);
        $consultants = $db->consultants;
        if($consultants->insert($output)){
            echo 'Parabéns! seu cadastrado foi realizado com sucesso!';
        }else{
            echo 'Infelizmente não foi possível realizar seu cadastro, o problema já está sendo resolvido!';
        }
       
        /*foreach ($output as $item) {
           $consultants->insert($item);
        }*/
        //$app->stop();   
        //db.consult.insert({name: "nome usuario", age: 25});
        // $mongo->selectDB('consultantsDB')->selectCollection('consultants')->insert( array( 'nome' => utf8_decode($node->user->name) , 'tweet' => $node->text ) );
});


$app->get('/json', function(){
  //  $json = '[{"user_id":13,"username":"stack"},{"user_id":14,"username":"flow"}]';

    $json = '{"nome":"marley","sobrenomenome-meio":"","sobrenomenome-ultimo":"ferreira","nome-notorio":"","logradouro":"Rua Raimundo Chaves, 2182 - Natal, RN - Brasil","estado":"","cep":"","pais":"","mails":[{"emailAddress":null,"emailType":"email-eventual"}],"educations":[{"schoolName":"Instituto Federal de Ciência e Tecnologia do Rio Grande do Norte","local":"","startDate":"2009","endDate":"2012","activities":"Desenvolvimento de aplicações desktop, web, mobile,  sistemas distribuídos, sistemas corporativos.","degree":"tecnólogo","type":"academico"},{"schoolName":"Instituto Federal de Ciência e Tecnologia do Rio Grande do Norte","local":"","startDate":"2009","endDate":"2012","activities":"Desenvolvimento de aplicações desktop, web, mobile,  sistemas distribuídos, sistemas corporativos.","degree":"tecnólogo","type":"academic"}],"positions":[{"companyName":"Smart Publishing","startDate":"5/2013","endDate":"9/2013","positionTitle":"Desenvolvedor Web","industry":"Publishing","summary":"Desenvolvedor Web trabalhando com Ruby on Rails, PhP, JavaScript, JQuery, Ajax, HTML5, CSS, Postgres, MySql.","type":"trab-atual"},{"companyName":"marleyiam","startDate":"1/2013","endDate":"9/2013","positionTitle":"faz tudo","industry":"Information Technology and Services","summary":"marleyiam","type":"trab-atual"},{"companyName":"M3media","startDate":"3/2013","endDate":"5/2013","positionTitle":"Desenvolvedor Web","industry":"Information Technology and Services","summary":"Desenvolvimento Web com CakePhP, MySql, JavaScript, Jquery, Ajax","type":"trab-anterior"},{"companyName":"Logica Sistemas","startDate":"1/2013","endDate":"3/2013","positionTitle":"Desenvolvedor Web","industry":"Information Technology and Services","summary":"Desenvolvedor Web PhP Codeginiter","type":"trab-anterior"},{"companyName":"Ponto Criativo","startDate":"9/2012","endDate":"2/2013","positionTitle":"Desenvolvedor Web","industry":"Marketing and Advertising","summary":"Desenvolvimento Web com PhP, MySql, JavaScript, JQuery Ajax","type":"trab-anterior"},{"companyName":"COTIC","startDate":"7/2011","endDate":"7/2012","positionTitle":"Desenvolvedor Web","industry":"Information Technology and Services","summary":"Desenvolvmento Web PhP, MySql, JavaScript, JQuery, Ajax, Moodle","type":"trab-anterior"},{"companyName":"Setor de Multimídia - IFRNnatn","startDate":"11/2009","endDate":"10/2010","positionTitle":"Editor de audio e vídeo","industry":"Information Technology and Services","summary":"Produção tele-jornalística, vinhetas, produções acadêmicas, documentários, material didático.","type":"trab-anterior"},{"companyName":"Smart Publishing","startDate":"5/2013","endDate":"9/2013","positionTitle":"Desenvolvedor Web","industry":"Publishing","summary":"Desenvolvedor Web trabalhando com Ruby on Rails, PhP, JavaScript, JQuery, Ajax, HTML5, CSS, Postgres, MySql.","type":"actual-job"},{"companyName":"marleyiam","startDate":"1/2013","endDate":"9/2013","positionTitle":"faz tudo","industry":"Information Technology and Services","summary":"marleyiam","type":"actual-job"},{"companyName":"M3media","startDate":"3/2013","endDate":"5/2013","positionTitle":"Desenvolvedor Web","industry":"Information Technology and Services","summary":"Desenvolvimento Web com CakePhP, MySql, JavaScript, Jquery, Ajax","type":"prev-job"},{"companyName":"Logica Sistemas","startDate":"1/2013","endDate":"3/2013","positionTitle":"Desenvolvedor Web","industry":"Information Technology and Services","summary":"Desenvolvedor Web PhP Codeginiter","type":"prev-job"},{"companyName":"Ponto Criativo","startDate":"9/2012","endDate":"2/2013","positionTitle":"Desenvolvedor Web","industry":"Marketing and Advertising","summary":"Desenvolvimento Web com PhP, MySql, JavaScript, JQuery Ajax","type":"prev-job"},{"companyName":"COTIC","startDate":"7/2011","endDate":"7/2012","positionTitle":"Desenvolvedor Web","industry":"Information Technology and Services","summary":"Desenvolvmento Web PhP, MySql, JavaScript, JQuery, Ajax, Moodle","type":"prev-job"},{"companyName":"Setor de Multimídia - IFRNnatn","startDate":"11/2009","endDate":"10/2010","positionTitle":"Editor de audio e vídeo","industry":"Information Technology and Services","summary":"Produção tele-jornalística, vinhetas, produções acadêmicas, documentários, material didático.","type":"prev-job"}],"phones":[{"phoneNumer":null,"phoneType":"fonetrabalho"},{"phoneNumer":"20100340","phoneType":"fonetrabalho"}],"logradouro-resid":"","estado-resid":"","cep-resid":"","pais-resid":"","fone-resid":"","local-nasc":"","data-nasc":"1/1/1964","nacionalidade-nasc":"","nacionalidade-atual":"","identidade":"","cpf":"","passaporte":"","status-visto":"","obs":"","sexo":"","estatura":"","peso":"","estado-civil":"","n-dependentes":"","empregado":"sim","empresa":"","possuifirma":"","razao-social":"","cgc":"","participacao":"","quaisecomo":"","temporario":"","viajar":"","outra-localidade":"","nao-quer-trabalhar":"","fatos-relevantes":"","comparativo":"Indique o grupo com o qual você comparou o seu perfil; ex.: gerentes da empresa X, colegas de trabalho da empresa Y, etc.","relevant-facts":"","comparing":"specify the group to whom you are comparing yourself","capac-int":"","senso-analitico":"","capac-pro":"","capac-ger":"","qual-oratoria":"","qual-redacao":"","motiv":"","lideranca":"","capac-org":"","senso-humor":"","matur-emo":"","capac-prazos":"","capac-equipe":"","nocao-responsa":"","integridade":"","tipodetrabalho":"","horasdisponiveis":"","ingles-leitura":"","ingles-oral":"","ingles-redacao":"","espanhol-leitura":"","espanhol-oral":"","espanhol-redacao":"","frances-leitura":"","frances-oral":"","frances-redacao":"","portugues-leitura":"","portugues-oral":"","portugues-redacao":"","outro-leitura":"","outro-oral":"","outro-redacao":"","english-reading":"","english-speaking":"","english-writing":"","spanish-reading":"","spanish-speaking":"","spanish-writing":"","french-reading":"","french-speaking":"","french-writing":"","portuguese-reading":"","portuguese-speaking":"","portuguese-writing":"","other-reading":"","other-speaking":"","other-writing":"","int-ability":"","analytic-frame":"","pro-orientation":"","ability-manager":"","qual-oral":"","qual-written":"","motivation":"","leadership":"","org-ability":"","emo-maturity":"","deadline":"","work-others":"","serv-clients":"","integrity":"","kind-of-work":"","hours-to-work":"","name":"marley","middle-name":"","last-name":"ferreira","known-name":"","address":"Rua Raimundo Chaves, 2182 - Natal, RN - Brasil","state":"","zipcode":"","country":"","fax-en":"","email-consulting":"marleysheredder@hotmail.com","adress-home":"","state-home":"","zipcode-home":"","place-birth":"","date-birth":"1/1/1964","nationality-birth":"","present-nationality":"","id":"","ssn":"","passport":"","visas-status":"","remarks":"","sex":"","height-yeah":"","weight":"","marital-status":"","n-dependents":"","employed":"yes","company":"","own-company":"","company-name":"","cgc-en":"","participation":"","whichandhow":"","temporary":"","travel":"","other-place":"","unwilling":"","fax":"","email-consultoria":"marleysheredder@hotmail.com","country-home":"","phone-home":"","obras":"","publications":"","outro-idioma":"Indicar","other-language":"Indicate","assoc-profissionais":"","assoc-professional":""}';
    //return !preg_match('/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/', preg_replace('/"(\\.|[^"\\])*"/g', '', $json));
    $output = json_validate($json);
   // printer($output);
    foreach ($output as $key => $value) {
        if(is_array($value)){
            echo $key.'</br>';
            printer($value);
        }else{
            echo $key.'   '.$value.'</br>';
        }
    }

    echo 'TESTANDO CHAVES</br></br>';
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
