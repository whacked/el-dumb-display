import requests

DD_URL = 'http://localhost:9999'

_is_style_sent = False

def send(html, append=False):
    data = dict(html=html)
    if append:
        data['append'] = 1
    return requests.post(DD_URL, data=data)
def clear():
    global _is_style_sent
    _is_style_sent = False
    return requests.post(DD_URL, data={'html': ''})


try:
    from ansi2html import Ansi2HTMLConverter
    conv = Ansi2HTMLConverter()

    def xterm(ansi, append=True):
        global _is_style_sent

        if _is_style_sent:
            style = ''
        else:
            _is_style_sent = True
            style = conv.produce_headers() + '''
            <style>
            .xterm-line,.xterm-line span {
                font-family: Inconsolata, Consolas, Menlo, monospace;
            }
            </style>
            '''
        html = '{}<div class="xterm-line">{}</div>'.format(
            style, conv.convert(ansi, full=False),
        )
        return send((html), append)
except:
    pass
