Тест работы сервера:
```commandline
curl -X POST http://xxx:5000/generate-greeting \                        
     -H "Content-Type: application/json" \
     -d '{"user": "id664097042", "emoji": "use", "style": "text", "recipient": "Муж"}'                                 
```

```commandline
curl -X POST https://xxx.ru:5000/generate-greeting \                        
     -H "Content-Type: application/json" \
     -d '{"user": "id664097042", "emoji": "use", "style": "text", "recipient": "Муж"}'                                 
```

Создайте виртуальное окружение:

```bash
python3 -m venv venv
```

Активируйте виртуальное окружение:

На Linux/macOS:

```bash
source venv/bin/activate
```

Установите необходимые пакеты:
```bash
pip install flask-cors
```


Запустите ваше приложение:

С активированным виртуальным окружением вы можете запустить ваш `server.py`:
```bash
python3 server.py
```
Когда вы закончите работу, вы можете деактивировать виртуальное окружение с помощью команды:
```bash
deactivate
```



Как сделать так, чтобы терминал не сворачивался

Запустите сессию tmux:
```commandline
tmux
```

Запустите ваш сервер:
```commandline
python3 components/server.py
```

Чтобы отсоединиться от сессии tmux без остановки процесса, нажмите:
```commandline
Ctrl-B, затем D
```

Чтобы вернуться к сессии:
```commandline
tmux attach-session
```