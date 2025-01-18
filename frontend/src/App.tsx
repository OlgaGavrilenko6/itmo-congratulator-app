import { useState, useEffect, ReactNode } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui';

import { Generate, Home, ListFriend, InfoProject } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large" />);
  const [friendLink, setFriendLink] = useState<string>(''); // Состояние для хранения ссылки на друга

  useEffect( async () => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
    }

    await fetchData();
  }, []);
  const [token, setToken] = useState<string | null>(null); // Состояние для хранения токена

  // Запрос токена при монтировании компонента
  useEffect(() => {
    bridge.send('VKWebAppGetAuthToken', {
      app_id: 52391607,  // Замените на ID вашего приложения
      scope: 'friends,status,groups,docs,pages ',  // Запрашиваемые разрешения
    })
        .then((data) => {
          if (data.access_token) {
            // Токен получен
            console.log('Получен токен доступа:', data.access_token);
            // alert(data.access_token)
            setToken(data.access_token); // Сохраняем токен в состояние
          } else {
            console.error('Токен доступа не получен.');
          }
        })
        .catch((error) => {
          console.error('Ошибка при получении токена:', error);
        });
  }, []); // Пустой массив зависимостей, чтобы запрос выполнялся один раз при монтировании

  // Функция для обработки выбора друга
  const handleSelectFriend = (link: string) => {
    setFriendLink(link);  // Обновляем ссылку на друга
  };

  return (
      <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
    <SplitLayout popout={popout}>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" fetchedUser={fetchedUser} onSelectFriend={handleSelectFriend} />
          <Generate id="generate" />
          <ListFriend id="listFriend"/>
          <InfoProject id = "infoproject"/>
        </View>
      </SplitCol>
    </SplitLayout>
</AppRoot>
      </AdaptivityProvider>
      </ConfigProvider>
  );
};


