import React, { useState, useEffect, useCallback, FC } from "react";
import bridge from "@vkontakte/vk-bridge";
import {
    Panel,
    PanelHeader,
    Group,
    List,
    Cell,
    Avatar,
    PullToRefresh,
    NavIdProps,
    PanelHeaderBack,
    Search,
    DisplayTitle,
    ConfigProvider
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

interface Friend {
    id: number;
    first_name: string;
    last_name: string;
    photo_100: string;
    bdate: string;
}

export const ListFriend: FC<NavIdProps> = ({ id, platform }) => {
    const [friends, setFriends] = useState<Friend[]>([]); // Типизация списка друзей
    const [filteredFriends, setFilteredFriends] = useState<Friend[]>([]); // Типизация отфильтрованных друзей
    const [fetching, setFetching] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>(""); // Типизация строки поиска
    const routeNavigator = useRouteNavigator();

    // Функция для получения списка друзей из VK API
    const fetchFriends = async () => {
        setFetching(true);
        try {
            const authResponse = await bridge.send("VKWebAppGetAuthToken", {
                app_id: 12345678,
                scope: "friends",
            });

            const token = authResponse.access_token
            // alert(token)
            const friendsResponse = await bridge.send("VKWebAppCallAPIMethod", {
                method: "friends.get",
                params: {
                    user_id: authResponse.user_id,
                    v: "5.131",
                    fields: "photo_100,first_name,last_name,bdate",
                    access_token: token,
                },
            });

            if (friendsResponse.response && friendsResponse.response.items) {
                const sortedFriends: Friend[] = friendsResponse.response.items
                    .filter((friend: Friend) => friend.bdate) // Фильтруем друзей с датой рождения
                    .sort((a: Friend, b: Friend) => {
                        const [dayA, monthA] = a.bdate.split(".").map(Number);
                        const [dayB, monthB] = b.bdate.split(".").map(Number);
                        return monthA === monthB ? dayA - dayB : monthA - monthB;
                    });

                setFriends(sortedFriends);
                setFilteredFriends(sortedFriends); // Устанавливаем начальный список в отфильтрованные друзья
            } else {
                throw new Error("Ошибка при получении списка друзей");
            }
        } catch (err) {
            setError(err as Error); // Обработка ошибки
        } finally {
            setFetching(false);
        }
    };
    const [isMobile, setIsMobile] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);

    // Определение ширины экрана и адаптация
    const updateDimensions = () => {
        const width = window.innerWidth;
        if (width <= 768) {
            setIsMobile(true);
            setIsDesktop(false);
        } else {
            setIsMobile(false);
            setIsDesktop(true);
        }
    };
    useEffect(() => {
        updateDimensions(); // Проверим сразу при монтировании компонента
        window.addEventListener('resize', updateDimensions);
        // Добавим слушатель для изменения ширины
        return () => {
            window.removeEventListener('resize', updateDimensions); // Очистим слушатель при размонтировании
        };
    }, []);
    // Обработчик выбора друга
    const handleSelectFriend = async (userLinkS: string) => {
        try {
            // Сохраняем ссылку на выбранного друга в sessionStorage
            sessionStorage.setItem("selectedLink", userLinkS);

            // Извлекаем ID друга из ссылки (предполагается, что ссылка имеет формат "https://vk.com/id{user_id}")
            const userId = userLinkS.split("id")[1]; // Извлекаем ID друга

            // Получаем информацию о друге с помощью users.get
            const authResponse = await bridge.send("VKWebAppGetAuthToken", {
                app_id: 12345678,
                scope: "friends",
            });

            const tokenInfo = authResponse.access_token;
            const userResponse = await bridge.send("VKWebAppCallAPIMethod", {
                method: "users.get",
                params: {
                    user_ids: userId, // ID выбранного друга
                    v: "5.131",
                    fields: "photo_100,first_name,last_name,bdate,about,city,education,home_town,sex,schools,career",
                    access_token: tokenInfo,
                },
            });

            if (userResponse && userResponse.response && userResponse.response.length > 0) {
                const user = userResponse.response[0]; // Получаем данные о друге

                // Выводим или сохраняем полученную информацию
                console.log(user); // Здесь можно обновить UI с данными о друге

                // Если нужно, можно отобразить дополнительную информацию о друге на новой странице
                window.history.back(); // Возврат на предыдущую страницу
            } else {
                throw new Error("Не удалось получить информацию о друге");
            }
        } catch (err) {
            setError(err as Error); // Обработка ошибки
        }
    };

    // Функция для форматирования даты
    const formatBDate = (bdate: string) => {
        const [day, month] = bdate.split(".").map(Number);
        const months = [
            "января", "февраля", "марта", "апреля", "мая", "июня", "июля",
            "августа", "сентября", "октября", "ноября", "декабря",
        ];
        return `${day} ${months[month - 1]}`;
    };

    // Функция обновления данных при свайпе
    const onRefresh = useCallback(() => {
        fetchFriends();
    }, []);

    // Обработчик изменения текста в поле поиска
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase(); // Преобразуем введённый текст в нижний регистр
        setSearchQuery(query);
        if (query === "") {
            setFilteredFriends(friends); // Если поиск пустой, показываем всех друзей
        } else {
            const filtered = friends.filter(
                (friend) =>
                    `${friend.first_name} ${friend.last_name}`
                        .toLowerCase()
                        .includes(query)
            );
            setFilteredFriends(filtered); // Фильтруем друзей по имени
        }
    };

    // Загрузка друзей при монтировании компонента
    useEffect(() => {
        fetchFriends();
    }, []);

    const appearance = 'light'; // Устанавливаем светлую тему принудительно
    return (
        <ConfigProvider platform={platform} appearance={appearance}>
            {isDesktop &&
        <Panel id={id}>
            <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
                AI-Поздравлятор
            </PanelHeader>
            <Search
                value={searchQuery} // Значение поиска
                onChange={handleSearchChange} // Обработчик изменений
                style={{
                    height: "4vh",
                    cursor: "pointer",
                    color: "black",
                    backgroundColor: "white",
                    borderRadius: "5px 5px 5px 5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            />
            <PullToRefresh onRefresh={onRefresh} isFetching={fetching}>
                <Group>
                    <DisplayTitle
                        level="3"
                        weight="1"
                        style={{ margin: 0, fontSize: "2.3vh", color: "black",marginLeft:'2vw',marginTop:'1.5vh', marginBottom:'1.5vh' }}
                    >
                        Выбрать среди друзей:
                    </DisplayTitle>
                    {error ? (
                        <p>Ошибка: {error.message}</p>
                    ) : (
                        <List>
                            {filteredFriends.length > 0 ? (
                                filteredFriends.map((friend) => (
                                    <Cell
                                        key={friend.id}
                                        before={<Avatar src={friend.photo_100} />}
                                        onClick={() => handleSelectFriend(`https://vk.com/id${friend.id}`)}
                                    >
                                        {friend.first_name} {friend.last_name}
                                        {friend.bdate && <div>Дата рождения: {formatBDate(friend.bdate)}</div>}
                                    </Cell>
                                ))
                            ) : (
                                <Cell>
                                    Нет друзей, удовлетворяющих запросу.
                                </Cell>
                            )}
                        </List>
                    )}
                </Group>
            </PullToRefresh>
        </Panel>}
            {isMobile &&
                <Panel id={id}>
                    <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
                        AI-Поздравлятор
                    </PanelHeader>
                    <Search
                        value={searchQuery} // Значение поиска
                        onChange={handleSearchChange} // Обработчик изменений
                        style={{
                            height: "2vh",
                            cursor: "pointer",
                            color: "black",
                            backgroundColor: "white",
                            borderRadius: "5px 5px 5px 5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop:'1.5vh'
                        }}
                    />
                    <PullToRefresh onRefresh={onRefresh} isFetching={fetching}>
                        <Group>
                            <DisplayTitle
                                level="3"
                                weight="1"
                                style={{ margin: 0, fontSize: "2vh", color: "black",marginLeft:'2vw',marginTop:'1vh', marginBottom:'1.5vh' }}
                            >
                                Выбрать среди друзей:
                            </DisplayTitle>
                            {error ? (
                                <p>Ошибка: {error.message}</p>
                            ) : (
                                <List>
                                    {filteredFriends.length > 0 ? (
                                        filteredFriends.map((friend) => (
                                            <Cell
                                                key={friend.id}
                                                before={<Avatar src={friend.photo_100} />}
                                                onClick={() => handleSelectFriend(`https://vk.com/id${friend.id}`)}
                                            >
                                                {friend.first_name} {friend.last_name}
                                                {friend.bdate && <div>Дата рождения: {formatBDate(friend.bdate)}</div>}
                                            </Cell>
                                        ))
                                    ) : (
                                        <Cell>
                                            Нет друзей, удовлетворяющих запросу.
                                        </Cell>
                                    )}
                                </List>
                            )}
                        </Group>
                    </PullToRefresh>
                </Panel>
            }
        </ConfigProvider>
    );
};
