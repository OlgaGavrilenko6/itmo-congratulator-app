import React, { FC,
    useState,
    useEffect
} from 'react';
import {
    NavIdProps,
    Panel,
    PanelHeader,
    FormLayoutGroup,
    FormItem,
    Group,
    Textarea,
    DisplayTitle,
    Button,
    ConfigProvider,
    SplitLayout
        } from '@vkontakte/vkui';
import {
    FaPlus
} from 'react-icons/fa';
// Получение и обработка параметров
import { useMetaParams } from '@vkontakte/vk-mini-apps-router';

export const Generate: FC<NavIdProps> = ({ id, platform }) => {
    const params = useMetaParams<{congratulation: string, presents: string}>();
    const [isMobile, setIsMobile] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);
    const [popout] = useState(null);
    const [messageText, setMessageText] = useState<string>(''); // Состояние для хранения текста

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

    const goHome = () => {
        // Добавляем обработчик для popstate
        window.addEventListener('popstate', () => {
            window.location.reload(); // Принудительная перезагрузка страницы
        });

        // Возврат на предыдущую страницу
        window.history.back();
    };

        const appearance = 'light'; // Устанавливаем светлую тему принудительно
  return (
      <ConfigProvider platform={platform} appearance={appearance}>
          <SplitLayout popout={popout}>
              {isDesktop &&
    <Panel id={id}>
            <PanelHeader>AI-Поздравлятор</PanelHeader>
            <Group>
                <FormLayoutGroup>
                    <FormLayoutGroup mode="vertical">
                        <FormItem htmlFor="name">
                            <div
                                style={{
                                    background: '#FFFFFF',
                                    minHeight: '40vh', // Задаем минимальную высоту
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                }}>
                                <div style={{padding: 1}}>
                                    <DisplayTitle
                                        level="4"
                                        weight="3"
                                        style={{
                                            fontSize: '3vh',   // Размер текста для уровня 4
                                            color: 'black',      // Цвет текста
                                            lineHeight: '1.4',
                                            justifyContent: 'center',
                                            marginLeft: '4vw',
                                        }}
                                    >
                                        Поздравьте близкого!
                                    </DisplayTitle>
                                    <DisplayTitle
                                        level="4"
                                        weight="3"
                                        style={{
                                            fontSize: '2.3vh',   // Размер текста для уровня 4
                                            color: '#666',       // Цвет текста
                                            lineHeight: '1.4',
                                            justifyContent: 'center',
                                            marginLeft: '4vw',
                                        }}
                                    >
                                        Отправьте другу в личные сообщения особенное поздравление
                                    </DisplayTitle>
                                </div>
                                <Textarea
                                    style={{
                                        marginLeft: '4vw',  // Отступ слева, пропорциональный ширине экрана
                                        width: '80vw',  // Ширина текстового поля на основе ширины экрана
                                        marginTop: '2vh',  // Отступ сверху на основе высоты экрана
                                        color: 'white',
                                    }}
                                    id="congratulate"
                                    value={params.congratulation}
                                    onChange={(e) => setMessageText(e.target.value)} // Обновляем состояние при изменении текста
                                />
                                <div style={{padding: 2}}>
                                    <DisplayTitle
                                        level="4"
                                        weight="3"
                                        style={{
                                            margin: '0.9vh 0 0 0', // Отступ сверху для подзаголовка
                                            fontSize: '1wh',
                                            color: 'gray',
                                            lineHeight: '1.4',
                                            marginLeft: '4vw',

                                        }}>
                                        Возможные подарки:
                                    </DisplayTitle>
                                </div>
                                <Textarea
                                    style={{
                                        marginLeft: '4vw',  // Отступ слева, пропорциональный ширине экрана
                                        width: '80vw',  // Ширина текстового поля на основе ширины экрана
                                        marginTop: '2vh',  // Отступ сверху на основе высоты экрана
                                        color: 'white',
                                    }}
                                    id="presents"
                                    value={params.presents}
                                    onChange={(e) => setMessageText(e.target.value)} // Обновляем состояние при изменении текста
                                />

                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Button
                                        onClick={() => goHome()}
                                        style={{
                                            width: '90vw',
                                            height: '0.05vh',
                                            cursor: 'pointer',
                                            background: appearance === 'overlay' ? '#232323' : 'unset',
                                            color: '#007BFF',
                                            border: 'none',
                                            borderRadius: '5px 5px 5px 5px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginTop: '1.5vh'
                                        }}

                                    >
                                        <FaPlus size={16} style={{marginRight: '0.4vw'}}/>
                                        Создать новое поздравление
                                    </Button>
                                </div>
                            </div>
                        </FormItem>
                    </FormLayoutGroup>
                </FormLayoutGroup>
            </Group>
    </Panel>
              }
              {isMobile &&
                  <Panel id={id}>
                      <PanelHeader>AI-Поздравлятор</PanelHeader>
                      <Group>
                          <FormLayoutGroup>
                              <FormLayoutGroup mode="vertical">
                                  <FormItem htmlFor="name">
                                      <div
                                          style={{
                                              background: '#FFFFFF',
                                              minHeight: '15vh',  // Минимальная высота на основе высоты экрана
                                              display: 'flex',
                                              flexDirection: 'column',
                                              width: '100%',
                                          }}
                                      >
                                          <div style={{padding: '1vw'}}>
                                              <DisplayTitle
                                                  level="4"
                                                  weight="3"
                                                  style={{
                                                      fontSize: '5vw',  // Размер текста на основе ширины экрана
                                                      color: 'black',
                                                      lineHeight: '1.4',
                                                      justifyContent: 'center',
                                                      marginLeft: '3vw',
                                                  }}
                                              >
                                                  Поздравьте близкого!
                                              </DisplayTitle>
                                              <DisplayTitle
                                                  level="4"
                                                  weight="3"
                                                  style={{
                                                      fontSize: '3vw',  // Размер текста на основе ширины экрана
                                                      color: '#666',
                                                      lineHeight: '1.4',
                                                      justifyContent: 'center',
                                                      marginLeft: '3vw',
                                                  }}
                                              >
                                                  Отправьте другу в личные сообщения особенное поздравление
                                              </DisplayTitle>
                                          </div>
                                          <Textarea
                                              style={{
                                                  marginLeft: '3vw',
                                                  maxWidth: '90vw',  // Максимальная ширина текстового поля на основе ширины экрана
                                                  width: '90vw',  // Ширина текстового поля на основе ширины экрана
                                                  marginTop: '2vh',  // Отступ сверху на основе высоты экрана
                                              }}
                                              id="congratulate"
                                              value={params.congratulation}
                                          />
                                            <div>
                                                <DisplayTitle
                                                    level="4"
                                                    weight="3"
                                                    style={{
                                                        fontSize: '3vw',  // Размер текста на основе ширины экрана
                                                        color: '#666',
                                                        lineHeight: '1.4',
                                                        justifyContent: 'center',
                                                        marginLeft: '3vw',
                                                    }}
                                                >
                                                    Предлагаемые подарки:
                                                </DisplayTitle>
                                            </div>
                                          <Textarea
                                              style={{
                                                  marginLeft: '3vw',
                                                  maxWidth: '90vw',  // Максимальная ширина текстового поля на основе ширины экрана
                                                  width: '90vw',  // Ширина текстового поля на основе ширины экрана
                                                  marginTop: '2vh',  // Отступ сверху на основе высоты экрана
                                              }}
                                              id="congratulate"
                                              value={params.congratulation}
                                          />
                                          <div
                                              style={{
                                                  display: 'flex',
                                                  justifyContent: 'center',
                                              }}
                                          >
                                              <Button
                                                  onClick={() => goHome()}
                                                  style={{
                                                      width: '80vw',  // Ширина кнопки на основе ширины экрана
                                                      height: '2vh',  // Высота кнопки на основе высоты экрана
                                                      cursor: 'pointer',
                                                      background: appearance === 'overlay' ? '#232323' : 'unset',
                                                      color: '#007BFF',
                                                      border: 'none',
                                                      borderRadius: '5vw',  // Скругление углов на основе ширины экрана
                                                      display: 'flex',
                                                      alignItems: 'center',
                                                      justifyContent: 'center',
                                                      marginTop: '2vh',  // Отступ сверху на основе высоты экрана
                                                  }}
                                              >
                                                  <FaPlus size="4vw" style={{ marginRight: '1vw' }} />
                                                  Создать новое поздравление
                                              </Button>
                                          </div>
                                      </div>
                                  </FormItem>
                              </FormLayoutGroup>
                          </FormLayoutGroup>
                      </Group>
                  </Panel>
              }
          </SplitLayout>
      </ConfigProvider>
  );
};
