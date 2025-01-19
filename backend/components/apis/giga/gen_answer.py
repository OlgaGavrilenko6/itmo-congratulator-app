import json
import requests

def giga_gen_answer(token, prompt):
  url = "https://gigachat.devices.sberbank.ru/api/v1/chat/completions"
  payload = json.dumps({
      "model": "GigaChat Max",
      "messages": [
          {
              "role": "system",
              "content": "Ты хороший близкий друг"
          },
          {
              "role": "user",
              "content": prompt
          }
      ],
      "stream": False,
      "update_interval": 0
  })

  headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': f'Bearer {token}'
  }
  # Отправляем запрос к GigaChat API
  response = requests.post(url, headers=headers, data=payload, verify=False)

  return response
