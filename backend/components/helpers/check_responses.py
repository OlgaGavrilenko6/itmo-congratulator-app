import json
import requests
from flask import jsonify

def check_responses(wish_response, presents_response):
    congratulation = ""
    presents = ""

    is_wish_response_correct = wish_response.status_code == 200
    is_present_response_correct = presents_response.status_code == 200


    if is_wish_response_correct:
        congratulation = wish_response.json()
    else:
        return jsonify({'error': 'Ошибка при wish() запросе к API GigaChat'}), wish_response.status_code

    if is_present_response_correct:
        presents = presents_response.json()
    else:
        return jsonify({'error': 'Ошибка при presents() запросе к API GigaChat'}), presents_response.status_code

    if is_wish_response_correct and is_present_response_correct:
        return jsonify({'congratulation': congratulation, 'presents': presents}), 200