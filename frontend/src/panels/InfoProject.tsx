import React, { FC } from 'react';
import {
    NavIdProps,
    Panel,
    PanelHeader,
    Group,
    DisplayTitle,
    Button,
    ConfigProvider
} from '@vkontakte/vkui';

export const InfoProject: FC<NavIdProps> = ({ id, platform }) => {
    const imageUrlProjectDesktop = 'https://s.iimg.su/s/29/HrrTqb7CUmilamsL8JGTBJRceA98cbrGEfbc4mHG.png';

    const goHome = () => {
        // Возврат на предыдущую страницу
        window.history.back();
    };
    const appearance = 'light'; // Устанавливаем светлую тему принудительно
    return (
        <ConfigProvider platform={platform} appearance={appearance}>
        <Panel id={id}>
            <PanelHeader>AI-Поздравлятор</PanelHeader>
            <div
                style={{
                    background: '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                }}>
                <Group>
                        <img
                            src={imageUrlProjectDesktop}
                            alt=""
                            style={{
                                width: '87vw',
                                height: '100%',
                                objectFit: 'cover', // Это гарантирует, что изображение будет покрывать весь экран, сохраняя пропорции
                                objectPosition: 'center', // Центрирует изображение
                                justifyContent: 'center',
                                marginLeft:'50px'
                            }}
                        />
                        <DisplayTitle level="3" weight="3"
                                      style={{
                                          fontSize: '20px',
                                          color: 'black',
                                          lineHeight: '1.4',
                                          marginLeft:'50px',
                                          marginTop: '20px'
                                      }}>
                            AI-Поздравлятор
                        </DisplayTitle>
                        <DisplayTitle
                            level="3" weight="3"
                        style={{
                            margin: '5px 0 0 0', // Отступ сверху для подзаголовка
                            fontSize: '17px',
                            color: 'gray',
                            lineHeight: '1.4',
                            marginLeft:'50px',
                            marginRight: '50px'
                        }}>
                            - это идеальное приложение для создания уникальных и
                            запоминающихся поздравлений с днем рождения с помощью нейронной сети. С
                            легкостью составляйте персонализированные сообщения, добавляйте интерактивные
                            элементы и делитесь поздравлениями с друзьями.
                        </DisplayTitle>
                <Button stretched size="l" mode="secondary" onClick={() => goHome()}
                        style={{
                            width: '800px',  // Фиксированная ширина кнопки
                            height: '50px', // Та же высота, что и у поля ввода
                            cursor: 'pointer',
                            background: '#007BFF',
                            color: 'white',
                            border: '1px solid #007BFF',
                            borderRadius: '5px 5px 5px 5px',  // Скругление только справа
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',  // Центрируем иконку в кнопке
                            marginLeft: '45px',
                            marginRight: '45px',
                            marginTop: '30px',
                        }}>
                    Попробовать
                </Button>
                </Group>
            </div>
        </Panel>
        </ConfigProvider>
    );
};
