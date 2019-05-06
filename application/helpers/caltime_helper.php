<?php
	//include("../config/config.php");

function caltime($get_timestamp){

    $timestamp = strtotime($get_timestamp);
    $diff = time() - (int)$timestamp;

    if ($diff == 0) 
     return 'just now';

 if ($diff > 604800)
    return date("d M Y",$timestamp);

$intervals = array
(
            //1                   => array('año',    31556926),
           // $diff < 31556926    => array('mes',   2628000),
           // $diff < 2629744     => array('semana',    604800),
    $diff < 604800      => array('day',     86400),
    $diff < 86400       => array('hour',    3600),
    $diff < 3600        => array('minute',  60),
    $diff < 60          => array('second',  1)
);

$value = floor($diff/$intervals[1][1]);
return 'an '.$value.' '.$intervals[1][0].($value > 1 ? 's' : '');




}

?>