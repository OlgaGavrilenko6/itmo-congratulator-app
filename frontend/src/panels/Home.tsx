import {FC, useState, useEffect} from 'react';
import {FaArrowRight,
    FaSearch,
    FaQuestionCircle
} from 'react-icons/fa';
import {
    Panel,
    Header,
    Button,
    Group,
    Div,
    NavIdProps,
    DisplayTitle,
    Input,
    SplitCol,
    SplitLayout,
    FormItem,
    RadioGroup,
    Radio,
    Tabs,
    TabsItem,
    ButtonGroup,
    PanelHeader,
    CustomSelect,
    ConfigProvider

} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { DEFAULT_VIEW_PANELS } from '../routes';
import React from 'react';
import { UserInfo } from '@vkontakte/vk-bridge';


export interface HomeProps extends NavIdProps {
    fetchedUser?: UserInfo;
}

async function getCongratulation(userLink: string, emoji: string, style: string, recipient: string) {
    const userSubstringArr = userLink.split("/")
    const user = userSubstringArr[userSubstringArr.length-1]
    const userObj = {
        user,
        emoji,
        style,
        recipient
    };

    const response = await fetch('https://xxx:5000/generate-greeting', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userObj)
    });
    const result = await response.json();
    return { congratulation: result.congratulation.choices[0].message.content, presents: result.presents.choices[0].message.content }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const Home: FC<HomeProps> = ({ id, fetchedUser, selectedLink,  platform   }) => {
    // eslint-disable-next-line no-empty-pattern
    const {} = {...fetchedUser};
    const routeNavigator = useRouteNavigator();
    const imageUrl = 'https://s.iimg.su/s/29/RDaEPWH3QehBpcjhmna3QxccfvCBjyMtiacUG3sl.png';
    const imageUrl2 = 'https://s.iimg.su/s/29/tmDzDJXMTUafqYaVguJC1psi2CrN73UWZ2FHQL1K.png';
    const imageUrlProjectMobile = 'https://s.iimg.su/s/03/5RfrzlnKekVq2dJEwgQ9OQ7UxUacrfox0E0qfIii.png';

    const [tab, setTab] = React.useState('birthday');
    const [popout] = useState(null);
    const [openedPopoutName] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);
    const [isSmall, setIsSmall] = useState(true);

    // Определение ширины экрана и адаптация
    const updateDimensions = () => {
        const width = window.innerWidth;
        // const height = window.innerHeight;
        // if (width < 563 || height < 788) {
        //     setIsSmall(true);
        //     setIsMobile(false);
        //     setIsDesktop(false);
        // }
        if (width <= 768) {
            setIsMobile(true);
            setIsDesktop(false);
            setIsSmall(false);
        }
        else {
            setIsMobile(false);
            setIsDesktop(true);
            setIsSmall(false);
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

    const baseTargetRef = React.useRef(null);

    // Состояние для хранения пожелания и сгенерированного поздравления
    const [userLink, setUserLink] = useState(selectedLink || '');


    const handleGenerateClick = async () => {
        const { congratulation, presents } = await getCongratulation(userLink, emoji, style, recipient)
        // Переход к компоненте Generate с передачей userLink
        routeNavigator.push(DEFAULT_VIEW_PANELS.GENERATE, {state: {congratulation, presents, userLink}});
    };

    const appearance = 'light';
    const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
    const [emoji, setEmoji] = useState('use');
    const [style, setStyle] = useState('text');
    const [recipient, setRecipient] = useState('Друг');

    const openActionSheet = () => setIsActionSheetOpen(true);
    const closeActionSheet = () => setIsActionSheetOpen(false);

    // Переход на страницу Search
    const handleSearchClick = () => {
        routeNavigator.push(DEFAULT_VIEW_PANELS.LISTFRIEND);
    };

    // Получение ссылки из Search
    // Извлекаем сохраненную ссылку из sessionStorage
    const savedLink = sessionStorage.getItem('selectedLink');
    if (savedLink && !userLink) {
        setUserLink(savedLink);
    }

    // Переход на страницу InfoProject
    const handleInfoClick = () => {
        routeNavigator.push(DEFAULT_VIEW_PANELS.INFOPROJECT);
    };

    return (
        <ConfigProvider platform={platform} appearance={appearance}>
            <SplitLayout popout={popout}>
                {isDesktop &&
                    <SplitCol>
                        <Panel id={id}>
                            <PanelHeader style={{ fontSize: '32px' }} >AI-Поздравлятор</PanelHeader>
                            <div
                                style={{
                                    background: '#FFFFFF',
                                    minHeight: '90vh', // Задаем минимальную высоту
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                }}>
                                <Group style={{ marginTop: '0px', display: 'flex', alignItems: 'stretch' }}>
                                    <div>
                                        <div
                                            style={{
                                                flex: 1,
                                                display: 'flex',
                                                maxWidth: '100vw',
                                                flexDirection: 'row',
                                            }}>
                                            <div
                                                style={{
                                                    flex: 1,
                                                    flexDirection: 'column', // Сначала заголовок, потом текст
                                                    marginRight: '0.5vw',
                                                    display: 'flex',
                                                    alignItems: 'flex-start', // Выравниваем элементы по верхнему краю
                                                    justifyContent: 'flex-start',
                                                    fontFamily: 'Roboto',
                                                    padding: '1vw', // Маленькие отступы внутри контейнера
                                                    borderRadius: '1.5vw',
                                                    maxWidth: '57vw',
                                                    height: '14.5vh', // Высота блока
                                                    backgroundColor: 'white', // Белый фон для контейнера
                                                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Тень для эффекта
                                                    marginLeft: '4vw',
                                                    marginTop: '1.5vh',
                                                }}>
                                                <DisplayTitle
                                                    level="3"
                                                    weight="1"
                                                    style={{
                                                        margin: 0,
                                                        fontSize: '3vh',
                                                        color: 'black',
                                                        marginTop: '2vh',
                                                        marginLeft: '2vw',

                                                    }}>
                                                    Уникальные пожелания!
                                                </DisplayTitle>
                                                <DisplayTitle
                                                    level="4"
                                                    weight="3"
                                                    style={{
                                                        margin: '0.9vh 0 0 0', // Отступ сверху для подзаголовка
                                                        fontSize: '1wh',
                                                        color: 'gray',
                                                        lineHeight: '1.4',
                                                        marginLeft: '2vw',
                                                    }}>
                                                    Укажите именинника и детали поздравления, а дальше — дело за нейросетью
                                                </DisplayTitle>
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex', // Размещение картинок в строку
                                                    justifyContent: 'flex-end',
                                                    alignItems: 'center', // Выравнивание изображений по центру вертикально
                                                    marginLeft: '1vw', // Отступ между текстом и изображениями
                                                    marginTop: '1vh', // Отступ сверху, чтобы они не прилипали к тексту
                                                }}
                                            >
                                                <img
                                                    src={imageUrl}
                                                    alt="Image"
                                                    style={{
                                                        width: '13vw',
                                                        height: '13vw',
                                                        objectFit: 'cover',
                                                        borderRadius: '1vw',
                                                        marginRight: '0.5vw', // Отступ между картинками
                                                    }}
                                                />
                                                <img
                                                    src={imageUrl2}
                                                    alt="Image"
                                                    style={{
                                                        width: '13vw',
                                                        height: '13vw',
                                                        objectFit: 'cover',
                                                        borderRadius: '1vw',
                                                        marginRight: '0.5vw',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <Header mode="secondary" style={{padding: 0, margin: 0}}> </Header>
                                        <DisplayTitle
                                            level="2"
                                            weight="3"
                                            style={{
                                                fontSize: '3vh',       // Изменяем размер текста
                                                fontFamily: 'Arial, sans-serif',  // Задаем шрифт
                                                fontWeight: 'bold',     // Толщина текста
                                                color: '#333',           // Цвет текста
                                                marginLeft: '4.5vw',
                                            }}
                                        >
                                            Выберите получателя
                                        </DisplayTitle>
                                        <DisplayTitle
                                            level="4"
                                            weight="3"
                                            style={{
                                                margin: '5px 0 0 0', // Отступ сверху для подзаголовка
                                                fontSize: '2.4vh',
                                                color: 'gray',
                                                lineHeight: '1.4',
                                                marginLeft: '4.5vw',
                                            }}>
                                            Введите ссылку на профиль или выберите из списка друзей
                                        </DisplayTitle>
                                        <Div
                                            style={{
                                                display: 'flex', // Включаем flexbox
                                                flexDirection: 'row', // Горизонтальное расположение
                                                alignItems: 'center', // Выравнивание по центру по вертикали
                                                justifyContent: 'flex-start', // Размещение элементов с левого края
                                                gap: '1vh', // Расстояние между элементами
                                            }}>
                                            <ButtonGroup mode="horizontal" gap="s" stretched

                                            >
                                                <Input
                                                    type="text"
                                                    placeholder="Вставьте ссылку"
                                                    value={userLink}
                                                    onChange={(e) => setUserLink(e.currentTarget.value)}
                                                    style={{
                                                        flex: 1,
                                                        marginRight: '0.5vw',
                                                        padding: '0.7vw',            // Увеличенные отступы
                                                        border: '1px solid #ccc',
                                                        borderRadius: '7px',
                                                        marginLeft: '3.5vw',
                                                        maxWidth: '30vw',         // Максимальная ширина
                                                        height: '7.5vh',
                                                        marginTop: '1.5vh',
                                                    }}
                                                />
                                                <button
                                                    onClick={handleSearchClick}
                                                    style={{
                                                        width: '7.5vh',
                                                        height: '7.5vh',
                                                        cursor: 'pointer',
                                                        background: appearance === 'overlay' ? '#232323' : 'unset',
                                                        color: '#007BFF',
                                                        border: '1px solid #007BFF',
                                                        borderRadius: '5px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        marginTop: '1.5vh',
                                                    }}
                                                >
                                                    <FaArrowRight size={15}/>
                                                </button>
                                                <Button
                                                    style={{
                                                        width: '40vw',
                                                        height: '1.5vh',
                                                        cursor: 'pointer',
                                                        background: appearance === 'overlay' ? '#232323' : 'unset',
                                                        color: '#007BFF',
                                                        border: 'none',
                                                        marginRight: '4vw',
                                                        marginTop: '2.5vh',
                                                    }}

                                                >
                                                    <FaSearch size={18} style={{marginRight: '1.2vw'}}/>
                                                    Воспользоваться поиском
                                                </Button>
                                            </ButtonGroup>
                                        </Div>
                                        <div style={{padding: 0.5}}>
                                        </div>
                                        <Header mode="secondary" style={{padding: 0, margin: 0}}> </Header>
                                        <div style={{padding: 1}}>
                                            <DisplayTitle
                                                level="2"
                                                weight="3"
                                                style={{
                                                    fontSize: '3vh',       // Изменяем размер текста
                                                    fontFamily: 'Arial, sans-serif',  // Задаем шрифт
                                                    fontWeight: 'bold',     // Толщина текста
                                                    color: '#333',           // Цвет текста
                                                    marginLeft: '4.5vw',
                                                }}
                                            >
                                                Добавьте пожелания
                                            </DisplayTitle>
                                        </div>
                                        <div style={{padding: 1}}>
                                            <DisplayTitle
                                                level="4"
                                                weight="3"
                                                style={{
                                                    margin: '5px 0 0 0', // Отступ сверху для подзаголовка
                                                    fontSize: '2.4vh',
                                                    color: 'gray',
                                                    lineHeight: '1.4',
                                                    marginLeft: '4.5vw',
                                                }}>
                                                Выберите стиль поздравления и кому оно отправится, добавьте смайлики
                                            </DisplayTitle>
                                        </div>
                                        <Div>
                                            <Button
                                                getRootRef={baseTargetRef}
                                                onClick={openActionSheet}
                                                aria-expanded={'home' === openedPopoutName}
                                                style={{
                                                    width: '88vw',  // Фиксированная ширина кнопки
                                                    height: '7vh',
                                                    cursor: 'pointer',
                                                    background: appearance === 'overlay' ? '#232323' : 'unset',
                                                    color: '#007BFF',
                                                    border: '1px solid #007BFF',
                                                    borderRadius: '5px 5px 5px 5px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: 'bold',  // Делаем текст жирным
                                                    textAlign: 'center', // Центрируем текст по горизонтали
                                                    marginLeft: '3.3vw',
                                                    marginTop: '1.5vh',
                                                }}
                                                onMouseEnter={(e) => {
                                                    // Изменяем цвет при наведении
                                                    e.target.style.backgroundColor = '#D3D3D3';
                                                    e.target.style.color = '#007BFF'; // Белый цвет текста
                                                    e.target.style.borderColor = '#D3D3D3'; // Цвет границы при наведении
                                                }}
                                                onMouseLeave={(e) => {
                                                    // Восстанавливаем исходные стили
                                                    e.target.style.backgroundColor = appearance === 'overlay' ? '#232323' : 'unset';
                                                    e.target.style.color = '#007BFF';
                                                    e.target.style.borderColor = '#007BFF';
                                                }}
                                            >
                                                Настроить пожелания
                                            </Button>
                                            <div>
                                                {isActionSheetOpen && (
                                                    <div
                                                        style={{
                                                            padding: '2vh',
                                                            border: '1px solid #ccc',
                                                            borderRadius: '8px',
                                                            marginLeft: '3.3vw'
                                                        }}>
                                                        {/* RadioGroup 1 */}
                                                        <FormItem top="Использовать смайлики">
                                                            <RadioGroup value={emoji}
                                                                        onChange={(e) => setEmoji(e.target.value)}>
                                                                <Radio name="smiles" value="use">Использовать</Radio>
                                                                <Radio name="smiles" value="do_not_use">Не
                                                                    использовать</Radio>
                                                            </RadioGroup>
                                                        </FormItem>

                                                        {/* RadioGroup 2 */}
                                                        <FormItem top="Стиль поздравления">
                                                            <RadioGroup value={style}
                                                                        onChange={(e) => setStyle(e.target.value)}>
                                                                <Radio name="style" value="text">Обычный текст</Radio>
                                                                <Radio name="style" value="poem">В стихах</Radio>
                                                            </RadioGroup>
                                                        </FormItem>

                                                        {/* Select */}
                                                        <FormItem top="Для кого поздравление">
                                                            <CustomSelect
                                                                placeholder="Выберите вид поздравления"
                                                                value={recipient}
                                                                options={[
                                                                    {label: 'Мама', value: 'Мама'},
                                                                    {label: 'Папа', value: 'Папа'},
                                                                    {label: 'Бабушка', value: 'Бабушка'},
                                                                    {label: 'Дедушка', value: 'Дедушка'},
                                                                    {label: 'Сестра', value: 'Сестра'},
                                                                    {label: 'Брат', value: 'Брат'},
                                                                    {label: 'Жена', value: 'Жена'},
                                                                    {label: 'Муж', value: 'Муж'},
                                                                    {label: 'Знакомый', value: 'Знакомый'},
                                                                    {label: 'Друг', value: 'Друг'},
                                                                    {label: 'Коллега', value: 'Коллега'},
                                                                    {label: 'Лучший друг', value: 'Лучший друг'},
                                                                    {label: 'Преподаватель', value: 'Преподаватель'},
                                                                    {label: 'Молодой человек', value: 'Молодой человек'},
                                                                    {label: 'Девушка', value: 'Девушка'},
                                                                ]}
                                                                onChange={(e) => setRecipient(e.target.value)}
                                                            />
                                                        </FormItem>

                                                        {/* Button */}
                                                        <Button onClick={closeActionSheet} stretched size="l"
                                                                mode="secondary">
                                                            Применить
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </Div>
                                        <Header mode="secondary" style={{padding: 0, margin: 0}}> </Header>

                                        <div style={{padding: 1}}>
                                            <DisplayTitle
                                                level="2"
                                                weight="3"
                                                style={{
                                                    fontSize: '3vh',       // Изменяем размер текста
                                                    fontFamily: 'Arial, sans-serif',  // Задаем шрифт
                                                    fontWeight: 'bold',     // Толщина текста
                                                    color: '#333',           // Цвет текста
                                                    marginLeft: '4.5vw',
                                                }}
                                            >
                                                Сгенерируйте поздравление
                                            </DisplayTitle>
                                        </div>
                                        <div style={{padding: 1}}>
                                            <DisplayTitle
                                                level="4"
                                                weight="3"
                                                style={{
                                                    margin: '5px 0 0 0', // Отступ сверху для подзаголовка
                                                    fontSize: '2.4vh',
                                                    color: 'gray',
                                                    lineHeight: '1.4',
                                                    marginLeft: '4.5vw',
                                                }}>
                                                Получите уникальное поздравление, составленное нейросетью
                                            </DisplayTitle>
                                        </div>
                                        <Div>
                                            <Button stretched size="l" mode="secondary" onClick={handleGenerateClick}
                                                    style={{
                                                        width: '88vw',  // Фиксированная ширина кнопки
                                                        height: '7vh',
                                                        cursor: 'pointer',
                                                        background: '#007BFF',
                                                        color: 'white',
                                                        border: '1px #007BFF',
                                                        borderRadius: '5px 5px 5px 5px',  // Скругление только справа
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',  // Центрируем иконку в кнопке
                                                        marginLeft: '3.3vw',
                                                        marginTop: '1.5vh',
                                                    }}
                                            >
                                                Сгенерировать
                                            </Button>
                                        </Div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Button stretched size="l" mode="secondary" onClick={handleInfoClick}
                                                    style={{
                                                        height: '0.1wh',
                                                        cursor: 'pointer',
                                                        background: appearance === 'overlay' ? '#232323' : 'unset',
                                                        color: '#007BFF',
                                                        border: 'none',
                                                        borderRadius: '5px 5px 5px 5px',
                                                        alignItems: 'center',
                                                        fontWeight: 'bold',         // Жирный шрифт
                                                        textAlign: 'center',        // Центрируем текст
                                                    }}
                                            >
                                                <FaQuestionCircle size={18} style={{marginRight: '1.2vw'}}/>
                                                О проекте
                                            </Button>
                                        </div>
                                    </div>
                                </Group>
                            </div>
                        </Panel>
                    </SplitCol>
                }

                {isMobile &&
                    <SplitCol>
                        <Panel id={id}>
                            <PanelHeader>AI-Поздравлятор</PanelHeader>
                            <div
                                style={{
                                    background: isMobile ? 'linear-gradient(to bottom, #D2E5FF, #FFFFFF)' : '#FFFFFF', // Ваш фон
                                    minHeight: '80vh', // Задаем минимальную высоту
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>
                                <Group style={{marginTop:'1.8vh'}}>
                                    <Tabs>
                                        <TabsItem
                                            selected={tab === 'birthday'}
                                            onClick={() => setTab('birthday')}
                                        >
                                            Поздравления
                                        </TabsItem>
                                        <TabsItem
                                            selected={tab === 'project'}
                                            onClick={() => setTab('project')}
                                        >
                                            О проекте
                                        </TabsItem>
                                    </Tabs>
                                    {tab === 'birthday' && (
                                        <div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'flex-start',
                                                    marginLeft: '4vw',
                                                    fontFamily: 'Roboto',

                                                }}>
                                                <div
                                                    style={{
                                                        padding: '0.5vh',                      // Маленькие отступы внутри контейнера
                                                        backgroundColor: '#ffffff',          // Белый фон
                                                        borderRadius: '8px',
                                                        maxWidth: '70vw',                // Максимальная ширина
                                                        width: '101%',
                                                        height: '72px',                      // Высота блока
                                                        marginRight: '0',
                                                        marginLeft:'2vw',
                                                        marginBottom:'2vh',
                                                        marginTop:'2vh'
                                                    }}
                                                >
                                                    <DisplayTitle
                                                        level="3"
                                                        weight="1"
                                                        style={{
                                                            margin: 0,
                                                            fontSize: '2vh',
                                                            color: 'black',
                                                            marginLeft:'2vw',
                                                            marginTop:'0.6vh'
                                                        }}
                                                    >
                                                        Уникальные пожелания!
                                                    </DisplayTitle>
                                                    <DisplayTitle
                                                        level="4"
                                                        weight="3"
                                                        style={{
                                                            margin: 0,
                                                            fontSize: '12px',
                                                            color: 'gray',
                                                            lineHeight: '1.6',
                                                            marginLeft:'2vw',
                                                            marginTop:'0.3vh'
                                                        }}
                                                    >
                                                        Укажите детали поздравления, а дальше — дело за нейросетью
                                                    </DisplayTitle>
                                                </div>

                                                <div style={{marginLeft: '0', display: 'flex', alignItems: 'stretch'}}>
                                                    <img
                                                        src={imageUrl}  // Путь к изображению
                                                        alt="Image"
                                                        style={{
                                                            width: '80px',  // Ширина картинки
                                                            height: '80px',
                                                            objectFit: 'cover', // Это гарантирует, что картинка будет заполнить пространство по высоте
                                                            margin: 3, // Убираем отступы на изображении
                                                            marginRight: '2.5vw',
                                                            borderRadius: '10px', // Скругляем углы
                                                            marginBottom:'2vh',
                                                            marginTop:'2vh'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <Group
                                                style={{
                                                    backgroundColor: 'white',  // Белый фон для контейнера
                                                    maxWidth: '90vw',         // Максимальная ширина
                                                    padding: '1.5vw',           // Отступы внутри контейнера
                                                    marginLeft: '5vw',          // Центровка контейнера
                                                    borderRadius: '8px',       // Скругление углов контейнера
                                                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'  // Тень для эффекта
                                                }}
                                            >

                                                <DisplayTitle
                                                    level="2"
                                                    weight="3"
                                                    style={{
                                                        fontSize: '2vh',       // Изменяем размер текста
                                                        fontFamily: 'Arial, sans-serif',  // Задаем шрифт
                                                        fontWeight: 'bold',     // Толщина текста
                                                        color: '#333',           // Цвет текста
                                                        marginLeft: '3.5vw',
                                                        marginTop:'1.5vh'
                                                    }}
                                                >
                                                    Выберите получателя
                                                </DisplayTitle>
                                                <DisplayTitle
                                                    level="4"
                                                    weight="3"
                                                    style={{
                                                        fontSize: '1.8vh',   // Размер текста для уровня 4
                                                        color: '#666',       // Цвет текста
                                                        lineHeight: '1.4',
                                                        justifyContent: 'center',
                                                        marginLeft: '3.5vw',
                                                        marginRight:'1.8vw'
                                                    }}>
                                                    Введите ссылку на профиль или выберите из списка друзей
                                                </DisplayTitle>
                                                <Div>
                                                    <ButtonGroup mode="horizontal" gap="s" stretched>
                                                        <Input
                                                            type="text"
                                                            placeholder="Вставьте ссылку"
                                                            value={userLink}
                                                            onChange={(e) => setUserLink(e.currentTarget.value)}
                                                            style={{
                                                                flex: 1,
                                                                marginRight: '0.7vw',
                                                                padding: '0.1vh',            // Увеличенные отступы
                                                                border: '1px solid #ccc',
                                                                borderRadius: '7px',
                                                                marginLeft: '0px',
                                                                fontSize: '1.7vh',
                                                                height: '5vh'// Размер текста в поле ввода
                                                            }}
                                                        />
                                                        <button
                                                            onClick={handleSearchClick}
                                                            style={{
                                                                width: '40px',
                                                                height: '40px',
                                                                cursor: 'pointer',
                                                                background: appearance === 'overlay' ? '#232323' : 'unset',
                                                                color: '#007BFF',
                                                                border: '1px solid #007BFF',
                                                                borderRadius: '5px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                marginRight: '0.1vw',
                                                            }}
                                                        >
                                                            <FaArrowRight size={12}/>
                                                        </button>
                                                    </ButtonGroup>
                                                    <Button
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
                                                        }}

                                                    >
                                                        <FaSearch size={16} style={{marginRight: '1.2vw'}}/>
                                                        Воспользоваться поиском
                                                    </Button>
                                                </Div>
                                                <div style={{padding: 5}}>
                                                </div>
                                                <div style={{padding: 1}}>
                                                    <DisplayTitle
                                                        level="2"
                                                        weight="3"
                                                        style={{
                                                            fontSize: '2vh',       // Изменяем размер текста
                                                            fontFamily: 'Arial, sans-serif',  // Задаем шрифт
                                                            fontWeight: 'bold',     // Толщина текста
                                                            color: '#333',           // Цвет текста
                                                            marginLeft: '3.5vw',
                                                        }}>
                                                        Добавьте пожелания
                                                    </DisplayTitle>
                                                </div>
                                                <div style={{padding: 1}}>
                                                    <DisplayTitle
                                                        level="4"
                                                        weight="3"
                                                        style={{
                                                            fontSize: '1.8vh',   // Размер текста для уровня 4
                                                            color: '#666',       // Цвет текста
                                                            lineHeight: '1.4',
                                                            justifyContent: 'center',
                                                            marginLeft: '3.5vw',
                                                            marginRight:'1.8vw'
                                                        }}>
                                                        Выберите стиль поздравления и кому оно отправится, добавьте смайлики
                                                    </DisplayTitle>
                                                </div>
                                                <Div>
                                                    <Button stretched size="l" mode="secondary"
                                                            getRootRef={baseTargetRef}
                                                            onClick={openActionSheet}
                                                            aria-expanded={'home' === openedPopoutName}
                                                            style={{
                                                                width: '85vw',  // Фиксированная ширина кнопки
                                                                height: '5vh',
                                                                cursor: 'pointer',
                                                                background: appearance === 'overlay' ? '#232323' : 'unset',
                                                                color: '#007BFF',
                                                                border: '1px solid #007BFF',
                                                                borderRadius: '5px 5px 5px 5px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontWeight: 'bold !important',  // Делаем текст жирным
                                                            }}>
                                                        Настроить пожелания
                                                    </Button>
                                                    <div>
                                                        {isActionSheetOpen && (
                                                            <div
                                                                style={{
                                                                    padding: '1vh',
                                                                    border: '1px solid #ccc',
                                                                    borderRadius: '8px'
                                                                }}>
                                                                {/* RadioGroup 1 */}
                                                                <FormItem top="Использовать смайлики">
                                                                    <RadioGroup value={emoji}
                                                                                onChange={(e) => setEmoji(e.target.value)}>
                                                                        <Radio name="smiles" value="use">Использовать</Radio>
                                                                        <Radio name="smiles" value="do_not_use">Не
                                                                            использовать</Radio>
                                                                    </RadioGroup>
                                                                </FormItem>

                                                                {/* RadioGroup 2 */}
                                                                <FormItem top="Стиль поздравления">
                                                                    <RadioGroup value={style}
                                                                                onChange={(e) => setStyle(e.target.value)}>
                                                                        <Radio name="style" value="text">Обычный текст</Radio>
                                                                        <Radio name="style" value="poem">В стихах</Radio>
                                                                    </RadioGroup>
                                                                </FormItem>

                                                                {/* Select */}
                                                                <FormItem top="Для кого поздравление">
                                                                    <CustomSelect
                                                                        placeholder="Выберите язык"
                                                                        value={recipient}
                                                                        options={[
                                                                            {label: 'Мама', value: 'Мама'},
                                                                            {label: 'Папа', value: 'Папа'},
                                                                            {label: 'Бабушка', value: 'Бабушка'},
                                                                            {label: 'Дедушка', value: 'Дедушка'},
                                                                            {label: 'Сестра', value: 'Сестра'},
                                                                            {label: 'Брат', value: 'Брат'},
                                                                            {label: 'Жена', value: 'Жена'},
                                                                            {label: 'Муж', value: 'Муж'},
                                                                            {label: 'Знакомый', value: 'Знакомый'},
                                                                            {label: 'Друг', value: 'Друг'},
                                                                            {label: 'Коллега', value: 'Коллега'},
                                                                            {label: 'Лучший друг', value: 'Лучший друг'},
                                                                            {label: 'Преподаватель', value: 'Преподаватель'},
                                                                            {label: 'Молодой человек', value: 'Молодой человек'},
                                                                            {label: 'Девушка', value: 'Девушка'},
                                                                        ]}
                                                                        onChange={(e) => setRecipient(e.target.value)}
                                                                    />
                                                                </FormItem>

                                                                {/* Button */}
                                                                <Button onClick={closeActionSheet} stretched size="l"
                                                                        mode="secondary">
                                                                    Применить
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Div>
                                                <div style={{padding: 1}}>
                                                    <DisplayTitle
                                                        level="2"
                                                        weight="3"
                                                        style={{
                                                            fontSize: '2vh',       // Изменяем размер текста
                                                            fontFamily: 'Arial, sans-serif',  // Задаем шрифт
                                                            fontWeight: 'bold',     // Толщина текста
                                                            color: '#333',           // Цвет текста
                                                            marginLeft: '3.5vw',
                                                        }}>
                                                        Сгенерируйте поздравление
                                                    </DisplayTitle>
                                                </div>
                                                <div style={{padding: 1}}>
                                                    <DisplayTitle
                                                        level="4"
                                                        weight="3"
                                                        style={{
                                                            fontSize: '1.8vh',   // Размер текста для уровня 4
                                                            color: '#666',       // Цвет текста
                                                            lineHeight: '1.4',
                                                            justifyContent: 'center',
                                                            marginLeft: '3.5vw',
                                                            marginRight:'1.8vw'
                                                        }}>
                                                        Получите уникальное поздравление, составленное нейросетью
                                                    </DisplayTitle>
                                                </div>
                                                <Div>
                                                    <Button stretched size="l" mode="secondary" onClick={handleGenerateClick}
                                                            style={{
                                                                width: '85vw',  // Фиксированная ширина кнопки
                                                                height: '5vh',
                                                                cursor: 'pointer',
                                                                background: '#007BFF',
                                                                color: 'white',
                                                                border: '1px solid #007BFF',
                                                                borderRadius: '5px 5px 5px 5px',  // Скругление только справа
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',  // Центрируем иконку в кнопке
                                                            }}>
                                                        Сгенерировать
                                                    </Button>
                                                </Div>
                                            </Group>
                                        </div>
                                    )}

                                    {tab === 'project' && (
                                        <div>
                                            <Group>
                                                <div style={{padding: 0, margin: 0, height: '350px', width: '350px'}}>
                                                    <img
                                                        src={imageUrlProjectMobile}
                                                        alt=""
                                                        style={{
                                                            width: '115%',
                                                            height: '100%',
                                                            // objectFit: 'cover',
                                                            objectPosition: 'center', // Центрирует изображение
                                                            justifyContent: 'center',
                                                            marginLeft:'3.5vw',
                                                            marginRight:'3.5vw',
                                                            marginBottom:'2vh',
                                                            marginTop:'2vh'
                                                        }}
                                                    />
                                                </div>
                                            </Group>
                                            <Group>
                                                <div style={{padding: 2}}>
                                                    <DisplayTitle level="3" weight="3"
                                                                  style = {{
                                                                      fontSize: '20px',       // Изменяем размер текста
                                                                      fontFamily: 'Arial, sans-serif',  // Задаем шрифт
                                                                      fontWeight: 'bold',     // Толщина текста
                                                                      color: '#333',           // Цвет текста
                                                                      marginLeft: '3.5vw',
                                                                  }}>
                                                        AI-Поздравлятор
                                                    </DisplayTitle>
                                                    <DisplayTitle level="3" weight="3"
                                                                  style = {{
                                                                      fontSize: '15px',
                                                                      color: '#666',       // Цвет текста
                                                                      lineHeight: '1.4',
                                                                      justifyContent: 'center',
                                                                      marginLeft: '3.5vw',
                                                                      marginRight:'1.8vw',
                                                                  }}>
                                                        - это идеальное приложение для создания уникальных и
                                                        запоминающихся поздравлений с днем рождения с помощью нейронной сети. С
                                                        легкостью составляйте персонализированные сообщения, добавляйте интерактивные
                                                        элементы и делитесь поздравлениями с друзьями.
                                                    </DisplayTitle>
                                                </div>
                                            </Group>
                                        </div>
                                    )}
                                </Group>
                            </div>
                        </Panel>
                    </SplitCol>
                }
            </SplitLayout>
        </ConfigProvider>
    );
};