<?php
if ($_POST) { // если передан массив POST
	$name = htmlspecialchars($_POST["name"]); // пишем данные в переменные и экранируем спецсимволы
	$email = htmlspecialchars($_POST["email"]);
	$age = htmlspecialchars($_POST["age"]);
// 	$message = htmlspecialchars($_POST["message"]);
	$json = array(); // подготовим массив ответа
	if (!$name or !$email or !$age) { // если хоть одно поле оказалось пустым
		$json['error'] = 'Вы заполнили не все поля! Обмануть решили? =)'; // пишем ошибку в массив
		echo json_encode($json); // выводим массив ответа
		die(); // умираем
	}
	if(!preg_match("|^[-0-9a-z_\.]+@[-0-9a-z_^\.]+\.[a-z]{2,6}$|i", $email)) { // проверим email на валидность
		$json['error'] = 'Не верный формат email! >_<'; // пишем ошибку в массив
		echo json_encode($json); // выводим массив ответа
		die(); // умираем
	}

	function mime_header_encode($str, $data_charset, $send_charset) { // функция преобразования заголовков в верную кодировку
		if($data_charset != $send_charset)
		$str=iconv($data_charset,$send_charset.'//IGNORE',$str);
		return ('=?'.$send_charset.'?B?'.base64_encode($str).'?=');
	}
	/* супер класс для отправки письма в нужной кодировке */
	class TEmail {
	public $from_email;
	public $from_name;
	public $to_email;
	public $to_name;
	public $age;
	public $data_charset='UTF-8';
	public $send_charset='windows-1251';
	public $body='';
	public $type='text/plain';

	function send() {
		$dc=$this->data_charset;
		$sc=$this->send_charset;
		$enc_to=mime_header_encode($this->to_name,$dc,$sc).' <'.$this->to_email.'>';
		$enc_age=mime_header_encode($this->age,$dc,$sc);
		$enc_from=mime_header_encode($this->from_name,$dc,$sc).' <'.$this->from_email.'>';
		$enc_body=$dc==$sc?$this->body:iconv($dc,$sc.'//IGNORE',$this->body);
		$headers='';
		$headers.="Mime-Version: 1.0\r\n";
		$headers.="Content-type: ".$this->type."; charset=".$sc."\r\n";
		$headers.="From: ".$enc_from."\r\n";
		return mail($enc_to,$enc_age,$enc_body,$headers);
	}
	}

	$emailgo= new TEmail; // инициализируем супер класс отправки
	$emailgo->from_email= 'mk-vsnk.ru'; // от кого
	$emailgo->from_name= 'Заявка на регистрацию на мастер-класс';
	$emailgo->to_email= 'gimmethenick@gmail.com'; // кому
	$emailgo->to_name= $name;
	$emailgo->subject= 'Заявка на регистрацию на мастер-класс. Сайт: mk-vsnk.ru'; // тема
	$emailgo->body= $age; // сообщение
	$emailgo->send(); // отправляем

	$json['error'] = 0; // ошибок не было

	echo json_encode($json); // выводим массив ответа
} else { // если массив POST не был передан
	echo 'GET LOST!'; // высылаем
}
?>