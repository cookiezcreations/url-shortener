<?php
header('Content-type: text/plain; charset=utf-8');
header('Access-Control-Allow-Origin: *');
	
date_default_timezone_set('Europe/Warsaw');
locale_set_default('pl');
set_time_limit(30);

function gen_empty_urls_file($file) 
{
	$json = json_encode(['URLS' => [], 'LASTFREE' => 'a']);
	fwrite($file, $json);
	
	return $json;
}

function increment(&$string){
    $last_char=substr($string,-1);
    $rest=substr($string, 0, -1);
    switch ($last_char) {
    case '':
        $next= 'a';
        break;
    case 'z':
        $next= 'A';
        break;
    case 'Z':
        $next= '0';
        break;
    case '9':
        increment($rest);
        $next= 'a';
        break;
    default:
        $next= ++$last_char;
    }
    $string=$rest.$next;
}

function add_new_to_array($array, $id, $url)
{
	array_push($array, ['id' => $id, 'url' => $url]);
	return $array;
}

function get_arr_with_id($arr, $id)
{
	$foundArr = NULL;
	foreach ($arr as $value) 
	{
		if($value["id"] === $id)
		{
			$foundArr = $value;
			break;
		}	
	}
	
	return $foundArr;
}

function shortenurl($file, $arr, $url, $custid)
{
	$selectedid = '';
	if(empty($custid)) {
		$selectedid = $arr['LASTFREE'];
		while(true) {
			if(get_arr_with_id($arr['URLS'], $selectedid) === NULL) {
				break;
			}
			increment($selectedid);
		}
		$arr['LASTFREE'] = $selectedid;
	}
	else {
		if(ctype_alnum($custid) === TRUE) {
			$selectedid = $custid;
		}
		else {
			echo 'error:custom id is not correct';
			return;
		}
	}
	
	if(get_arr_with_id($arr['URLS'], $selectedid) !== NULL) {
		echo 'error:id is already is use';
		return;
	}
	
	$arr['URLS'] = add_new_to_array($arr['URLS'], $selectedid, $url);
	
	ftruncate($file, 0);
	$encoded_to_write = json_encode($arr);
	fwrite($file, $encoded_to_write);
	echo "id:$selectedid";
}


ini_set('auto_detect_line_endings', true);
$file_urls = fopen("URLS_DATABASE.txt", "a+") or die("Unable to open file");
$fsize = fstat($file_urls)['size'];
if($fsize <= 0) {
	$filecontent = gen_empty_urls_file($file_urls);
	$fsize = fstat($file_urls)['size'];
}
else {
	$filecontent = fread($file_urls, $fsize);
	//$filecontent = refresh_delete_ids($file_urls, $filecontent);
}

$arr = json_decode($filecontent, true);

$mode = $_REQUEST['mode'];

if(empty($mode)) {
	echo 'error:undefined mode';
}
else if($mode === 'redirect') {
	$id = $_REQUEST['id'];
	if(empty($id)) {
		echo 'error:undefined id';
	}
	else {
		$retarr = get_arr_with_id($arr["URLS"], $id);
		if(empty($retarr)) {
			echo 'error:unknown id';
		}
		else {
			header('Location: '.$retarr["url"]);
		}
	}
}
else if($mode === 'shortenurl') {
	$url = $_REQUEST['url'];
	$custid = $_REQUEST['custid'];
	if(empty($url)) {
		echo 'error:undefined url';
	}
	else {
		if (filter_var($url, FILTER_VALIDATE_URL) === FALSE) {
			echo 'error:url not valid';
		}
		else {
			shortenurl($file_urls, $arr, $url, $custid);
		}
	}
}
else {
	echo 'error:unknown mode';
}




fclose($file_urls);
die();

?>