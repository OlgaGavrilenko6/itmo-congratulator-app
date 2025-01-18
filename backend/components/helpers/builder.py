import io


def build_giga_query(raw_user_info, groups_str, emoji, is_congratulation, congratulation_style, recipient):
    output = io.StringIO()

    for_whom = ""
    if recipient == "Друг":
        for_whom = "друга"
    elif recipient == "Мама":
        for_whom = "мамы"
    elif recipient == "Папа":
        for_whom = "папы"
    elif recipient == "Дедушка":
        for_whom = "дедушки"
    elif recipient == "Бабушка":
        for_whom = "бабушки"
    elif recipient == "Сестра":
        for_whom = "сестры"
    elif recipient == "Брат":
        for_whom = "брата"
    elif recipient == "Жена":
        for_whom = "жены"
    elif recipient == "Муж":
        for_whom = "мужа"
    elif recipient == "Знакомый":
        for_whom = "знакомого"
    elif recipient == "Коллега":
        for_whom = "коллеги по работе"
    elif recipient == "Преподаватель":
        for_whom = "преподавателя"
    elif recipient == "Лучший друг":
        for_whom = "лучшего друга"

    if is_congratulation:
        output.write(f'Напиши объемное поздравление, которое я отправлю через социальную сеть, для {for_whom}. ')

        if emoji == "use":
            output.write("В поздравлении используй смайлики это очень очень важно.")
        else:
            output.write("В поздравлении не используй смайлики очень очень важно.")
        if congratulation_style == "text":
            output.write("Напиши поздравление классическим текстом очень очень важно.")
        else:
            output.write("Напиши поздравление в стихах очень очень важно.")
    else:
        output.write(
            f'Напиши список из 15 интересных подарков, которые лучше всего подойдут для {for_whom}. Нужен только простой список, без твоих комментариев. ')


    # Проверяем, что данные о пользователе есть
    if 'response' in raw_user_info and isinstance(raw_user_info['response'], list):
        users_data = raw_user_info['response']  # Получаем данные пользователя


        if len(users_data) > 0:
            user = users_data[0]
            output.write("Используй в своем поздравлении всю информацию о нем:\n")
            # output.write("-" * 30)
            # output.write(f"ID: {user.get('id', 'Не указано')}")
            output.write(f"Имя: {user.get('first_name', 'Не указано')}\n")
            output.write(f"Фамилия: {user.get('last_name', 'Не указано')}\n")
            output.write(
                f"Пол: {'Мужской' if user.get('sex') == 2 else 'Женский' if user.get('sex') == 1 else 'Не указано'}\n")
            output.write(f"Дата рождения: {user.get('bdate', 'Не указано')}\n")
            output.write(f"Город: {user.get('city', {}).get('title', 'Не указано')}\n")
            output.write(f"Родной город: {user.get('home_town', 'Не указано')}\n")
            output.write(f"Учебное заведение: {user.get('university_name', 'Не указано')}\n")
            output.write(f"Школы: {[school.get('name', 'Не указано') for school in user.get('schools', [])]}\n")
            output.write(f"В социальных сетях подписан на группы: {groups_str}\n")

            # output.write("-" * 30)
        else:
            print("Ошибка: данные о пользователе не найдены.")
    else:
        print("Ошибка: данные о пользователе не найдены.")

    # Получаем содержимое из StringIO в виде строки
    result_str = output.getvalue()

    print(result_str)
    # Закрываем объект StringIO, так как он больше не нужен
    output.close()
    return result_str