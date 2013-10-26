<?php
/** função que exibe os objetos de uma forma mais "legível" =| */
function printer($obj){
	echo '<pre>';
	var_dump($obj);
	echo '</pre>';
}

/**função pra tratamento de execeção ¬¬ */
function exceptionHandler($exception) {

    // template de erros
	$traceline = "#%s %s(%s): %s(%s)";
	$msg = "PHP Fatal error:  Exception não capturada '%s' com a mensagem '%s' no %s:%s\nStack trace:\n%s\n  lançada %s na linha %s";

	$trace = $exception->getTrace();
	foreach ($trace as $key => $stackPoint) {
        // recupera os tipos dos params
		$trace[$key]['args'] = array_map('gettype', $trace[$key]['args']);
	}

    // constroi as linhas do stacktrace
	$result = array();
	foreach ($trace as $key => $stackPoint) {
		$result[] = sprintf(
			$traceline,
			$key,
			$stackPoint['file'],
			$stackPoint['line'],
			$stackPoint['function'],
			implode(', ', $stackPoint['args'])
			);
	}
    // stacktrace sempre termina com {main}
	$result[] = '#' . ++$key . ' {main}';

    // escreve as linhas no template
	$msg = sprintf(
		$msg,
		get_class($exception),
		$exception->getMessage(),
		$exception->getFile(),
		$exception->getLine(),
		implode("\n", $result),
		$exception->getFile(),
		$exception->getLine()
		);

    //echo $msg;
	printer($msg);
}

function get_root_url(){
	return substr($_SERVER['PHP_SELF'],0,-9);
}

function get_host() {
	if(isset($_SERVER['HTTP_X_FORWARDED_FOR'])){
		if($host = $_SERVER['HTTP_X_FORWARDED_HOST']){
		    $elements = explode(',', $host);
		    $host = trim(end($elements));
		}else{
		    if(!$host = $_SERVER['HTTP_HOST']){
		        if (!$host = $_SERVER['SERVER_NAME']){
		            $host = !empty($_SERVER['SERVER_ADDR']) ? $_SERVER['SERVER_ADDR'] : '';
		        }
		    }
		}	
	}else{
		if(!$host = $_SERVER['HTTP_HOST']){
		    if (!$host = $_SERVER['SERVER_NAME']){
		        $host = !empty($_SERVER['SERVER_ADDR']) ? $_SERVER['SERVER_ADDR'] : '';
		    }
		}
	}
   
    // Remove o numero da porta do host
    $host = preg_replace('/:\d+$/', '', $host);

    return trim($host);
}

function convertDate2String($data) {

		return date('F d, Y h:i:s A', strtotime($data));	
}

function lastIndexOf($string,$item){  
    $index = strpos(strrev($string),strrev($item));  
    if ($index){  
        $index = strlen($string)-strlen($item)-$index;  
        return $index;  
    }  
        else  
        return -1;  
}


function make_date_select($param){
	
	$months = array(1=> "Janeiro", "Fevereiro", "Março", 
	           "Abril", "Maio", "Junho", "Julho", "Agosto", 
	           "Setembro", "Outubro", "Novembro", "Dezembro"); 
	$days = array();
	$years = array();
	$q = 0;

	switch($param){
		case $param == 'day': 
			for($i = 1; $i<=31; $i++){
				$days[$i] =  $i;
			}
			return $days;
		break;
		case  $param == 'month':
			return $months;
		break;
		case $param == 'year': 
			for($i = 1920; $i<=2013; $i++){
				$q++;
				$years[$q] = $i;	
			 }
			 return $years;
		break;
		default;
			return 'ERROR';
		break;
	}
}


function current_user(){
	if(isset($_SESSION['user_id'])){
		//return User::find_by_id($_SESSION['user_id']);
	}
}

function current_user_avatar(){
	return current_user()? current_user()->user_pictures : 'default-user-picture.png';
}

function getGlobals() {
    return array(
        'session'   => $_SESSION,
    ) ;
}

function get_last_id($entity){
    $last_user = $entity::last();
    $last_user_id = $last_user? $last_user->id : 0;
    return ($last_user_id+1);
}

function validateEmail($email) {
  return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function is_sha1($str) {
    return (bool) preg_match('/^[0-9a-f]{40}$/i', $str);
}

function cors(){

    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    //1 dia
    }

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }
    //echo "CORS!";
}

function json_validate($json, $assoc_array = FALSE){

    $result = json_decode($json, $assoc_array);

    switch (json_last_error()) {
        case JSON_ERROR_NONE:
            $error = ''; // JSON valido
            break;
        case JSON_ERROR_DEPTH:
            $error = 'Maximum stack depth exceeded.';
            break;
        case JSON_ERROR_STATE_MISMATCH:
            $error = 'Underflow or the modes mismatch.';
            break;
        case JSON_ERROR_CTRL_CHAR:
            $error = 'Unexpected control character found.';
            break;
        case JSON_ERROR_SYNTAX:
            $error = 'Syntax error, malformed JSON.';
            break;
        // only PHP 5.3+
        case JSON_ERROR_UTF8:
            $error = 'Malformed UTF-8 characters, possibly incorrectly encoded.';
            break;
        default:
            $error = 'Unknown JSON error occured.';
            break;
    }

    if($error !== '') {

        exit($error);
    }

    return $result;
}

function createId( $yourTimestamp ){
    static $inc = 0;

    $ts = pack( 'N', $yourTimestamp );
    $m = substr( md5( gethostname()), 0, 3 );
    $pid = pack( 'n', posix_getpid() );
    $trail = substr( pack( 'N', $inc++ ), 1, 3);

    $bin = sprintf("%s%s%s%s", $ts, $m, $pid, $trail);

    $id = '';
    for ($i = 0; $i < 12; $i++ )
    {
        $id .= sprintf("%02X", ord($bin[$i]));
    }
    return new MongoID($id);
}

/*
t = "526adafec2f4a11f08d63af1";
//new Date(parseInt(t.toString().slice(0,8), 16)*1000);
i = parseInt(t.slice(0,8), 16)*1000;
new Date(i)
*/

function dateId($_id){
	//$t1 = intval(substr(hexdec(substr($_id, 0, 8))*1000, 0, 10));
	//$t2 = new DateTime( date("d-m-Y H:i:s",$t1));
	//return $t2->format("d-m-Y H:i:s");
	$data = new DateTime(date("d-m-Y H:i:s",intval(substr(hexdec(substr($_id, 0, 8))*1000, 0, 10))));
	return $data->format("d-m-Y H:i:s");
}


?>