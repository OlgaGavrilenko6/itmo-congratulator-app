import requests

version = '5.131'

def vk_get_user_info(user_link, access_token):
    id = vk_get_user_id_from_link(user_link, access_token)
    info = vk_get_user_base_info(id, access_token)
    groups = vk_get_user_groups(id, access_token)
    return info, groups

# Преобразование ссылки в ID пользователя
def vk_get_user_id_from_link(user_link, access_token):
    screen_name = user_link.split('/')[-1]
    url = 'https://api.vk.com/method/utils.resolveScreenName'
    params = {
        'screen_name': screen_name,
        'access_token': access_token,
        'v': version
    }
    response = requests.get(url, params=params).json()

    if 'response' in response and response['response'] and response['response']['type'] == 'user':
        return response['response']['object_id']
    else:
        return None

# Получение групп
def vk_get_user_groups(user_id, access_token):
    url = 'https://api.vk.com/method/groups.get'
    params = {
        'user_id': user_id,
        'extended': 1,  # Возвращаем дополнительную информацию о группах
        'access_token': access_token,
        'v': version
    }

    response = requests.get(url, params=params)
    data = response.json()

    # Проверяем, есть ли в ответе данные о группах
    if 'response' in data and 'items' in data['response']:
        # Возвращаем список названий групп
        group_names = [group['name'] for group in data['response']['items']]
        return group_names
    else:
        # Возвращаем пустой список, если данные не найдены
        return []

def vk_get_user_base_info(user_id, access_token):
    url = 'https://api.vk.com/method/users.get'
    params = {
    'user_ids': user_id,
    'access_token': access_token,
    'fields': 'education,city,home_town,schools,sex,bdate',
    'v': version
    }
    response = requests.get(url, params=params)
    return response.json()
