import requests

def giga_get_token():
  url = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth"
  payload = 'scope=GIGACHAT_API_PERS'
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
    'RqUID': '6f0b1291-c7f3-43c6-bb2e-9f3efb2dc98e',
    'Authorization': 'Basic токен-доступа'
  }

  response = requests.request("POST", url, headers=headers, data=payload, verify=False)

  return response.text