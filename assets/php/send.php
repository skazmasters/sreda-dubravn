<?
if((isset($_POST['name'])&&$_POST['name']!="")&&(isset($_POST['age'])&&$_POST['age']!=""))&&(isset($_POST['email'])&&$_POST['email']!="")){ //Проверка отправилось ли наше поля name и не пустые ли они
        $to = 'gimmethenick@gmail.com'; //Почта получателя, через запятую можно указать сколько угодно адресов
        $subject = 'Заявка на мастер класс с mk-vsnk.ru'; //Загаловок сообщения
        $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>Имя: '.$_POST['name'].'</p>
                        <p>Возраст: '.$_POST['age'].'</p>
                        <p>Почта: '.$_POST['email'].'</p>
                    </body>
                </html>'; //Текст нашего сообщения можно использовать HTML теги
        $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
        $headers .= "From: Отправитель <from@example.com>\r\n"; //Наименование и почта отправителя
        mail($to, $subject, $message, $headers); //Отправка письма с помощью функции mail
}
?>