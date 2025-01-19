# itmo-congratulator-app

Этот репозиторий создан для описания мини-приложение (VK Mini App) по научно-исследовательской работе. Данное приложение генерирует персонализированное поздравление с днем рождения и список подарков. Так как репозиторий открытый, все переходы к серверам, id приложения и токены доступа изменены на другие значения в рамках безопсности, что приложение не сломают.

## Основные разделы
### Frontend
Папка [frontend](https://github.com/OlgaGavrilenko6/itmo-congratulator-app/tree/main/frontend) содержит в себе проекты по клиентской части приложения. 
1) [public](https://github.com/OlgaGavrilenko6/itmo-congratulator-app/tree/main/frontend/public) содержит только изображение с логотипом Вконтакте.
2) [src](https://github.com/OlgaGavrilenko6/itmo-congratulator-app/tree/main/frontend/src) содержит всю информацию по приложению, которое отображается: 
- в [panels](https://github.com/OlgaGavrilenko6/itmo-congratulator-app/tree/main/frontend/src/panels) находятся все панели, отображающиеся в VK Mini App;
- в [utils](https://github.com/OlgaGavrilenko6/itmo-congratulator-app/tree/main/frontend/src/utils) находится код, который нужен для адаптации приложения для всех видов панелей;
- [App.tsx](https://github.com/OlgaGavrilenko6/itmo-congratulator-app/blob/main/frontend/src/App.tsx) это главный файл приложения, в котором находится полная архитектура всего приложения;
- [main.tsx](https://github.com/OlgaGavrilenko6/itmo-congratulator-app/blob/main/frontend/src/main.tsx) этот файл инициализирует приложение, которое будет открывать "Вконтакте";
- [routes.tsx](https://github.com/OlgaGavrilenko6/itmo-congratulator-app/blob/main/frontend/src/routes.ts) этот файл содержит в себе всю информацию о панелях приложения и запускает переходы между ними.

Остальные файлы отвечают за конфигурацию приложения, его подключение к социальной сети и т.д.


### Backend
Папка [backend](https://github.com/OlgaGavrilenko6/itmo-congratulator-app/tree/main/backend) содержит в себе всю серверную часть приложения. 

Папка [components](https://github.com/OlgaGavrilenko6/itmo-congratulator-app/tree/main/backend/components) содержит в себе следующие файлы: 
- [apis](https://github.com/OlgaGavrilenko6/itmo-congratulator-app/tree/main/backend/components/apis), которая отвечает за получение токенов доступа для GigaChat, VK, а также хранит файл с запросом для генерации списка подарков и поздравления. Помимо этого в нем лежит файл с запросом на получение данных о выбранном пользователе в приложении.
- в [helpers](https://github.com/OlgaGavrilenko6/itmo-congratulator-app/tree/main/backend/components/helpers) важным файлом является [builder](https://github.com/OlgaGavrilenko6/itmo-congratulator-app/blob/main/backend/components/helpers/builder.py), который хранит в себе составление промпта для генерации подарков и персонализированного поздравления.

Главным файлом для данного разделя является [server.py](https://github.com/OlgaGavrilenko6/itmo-congratulator-app/blob/main/backend/components/server.py), который отображает всю архитектуру приложения и отвечает за бесперебойную работу.

## Результат

С приложением можно ознакомиться по следующей ссылке: [AI-Поздравлятор](https://vk.com/app52391607)