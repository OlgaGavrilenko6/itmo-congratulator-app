from flask_cors import CORS
from flask import Flask, request, jsonify
import requests
import json
import urllib3

from apis.giga.get_token import giga_get_token
from apis.giga.gen_answer import giga_gen_answer
from apis.vk.get_token import vk_get_token

from apis.vk.get_user_info import vk_get_user_info
from helpers.builder import build_giga_query
from helpers.check_responses import check_responses
app = Flask(__name__)
CORS(app)  # Разрешить CORS для всех маршрутов

urllib3.disable_warnings()

@app.route('/generate-greeting', methods=['POST'])
def generate_greeting():
    try:
        data = request.json
        user_link = data.get('user')
        emoji = data.get('emoji') # получение эмодзи
        style = data.get('style') # получение вида поздравления
        recipient = data.get('recipient') # получение получателя

        print(user_link, emoji, style, recipient)

        giga_token = init_giga()
        vk_token = init_vk()

        print(f'giga_token = {giga_token}')
        print(f'vk_token = {vk_token}')
        user_info, groups_arr = vk_get_user_info(user_link, vk_token)
        groups_str = ", ".join(groups_arr)
        wish_prompt = build_giga_query(user_info, groups_str, emoji, True, style, recipient)
        presents_prompt = build_giga_query(user_info, groups_str, emoji, False, style, recipient)
        print(f'wish_prompt = {wish_prompt}')
        print(f'present_prompt = {presents_prompt}')


        # Отправляем запрос к GigaChat API
        wish_response = giga_gen_answer(giga_token, wish_prompt)

        # Отправляем запрос к GigaChat API
        presents_response = giga_gen_answer(giga_token, presents_prompt)

        print(f'wish_response = {wish_response}')
        print(f'presents_response = {presents_response}')
        # return jsonify({'congratulation': 1, 'presents': 2}), 200

        return check_responses(wish_response, presents_response)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def init_giga():
    text = giga_get_token()
    # Преобразуем строку в словарь
    data = json.loads(text)

    # Получаем значение поля access_token
    access_token = data["access_token"]

    GIGACHAT_API_TOKEN = access_token
    print(GIGACHAT_API_TOKEN)


GIGACHAT_API_TOKEN = ''
VK_API_TOKEN = ''


def init_giga():
    text = giga_get_token()
    # Преобразуем строку в словарь
    data = json.loads(text)

    # Получаем значение поля access_token
    access_token = data["access_token"]

    return access_token

def init_vk():
    vk_token = vk_get_token()
    return vk_token


# Для локальных тестов
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)

# # Для запуска на сервере
# if __name__ == '__main__':
#     context = ('/etc/letsencrypt/live/xxx.ru/fullchain.pem',  # Путь к fullchain.pem
#                '/etc/letsencrypt/live/xxx.ru/privkey.pem')   # Путь к privkey.pem
#     app.run(host='0.0.0.0', port=5000, ssl_context=context)