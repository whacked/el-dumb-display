import requests

DD_URL = 'http://localhost:9999'

def send(html, append=False):
    data = dict(html=html)
    if append:
        data['append'] = 1
    return requests.post(DD_URL, data=data)
def clear():
    return requests.post(DD_URL, data={'html': ''})
