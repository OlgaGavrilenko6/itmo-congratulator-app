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

### Backend