from flask import Flask
from flask import request,make_response
import os
app = Flask(__name__)
import requests
import json
from base64 import b64encode
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import unpad

@app.route('/encrypt')
def encrypt():
    msg=request.args.get('msg')
    msg=str(msg)
    data = bytes(msg, 'utf-8') 
    key=b'aaaaaaaaaaaaaaaa'
    print(key)
    cipher = AES.new(key, AES.MODE_CBC)
    ct_bytes = cipher.encrypt(pad(data, AES.block_size))
    iv = b64encode(cipher.iv).decode('utf-8')
    ct = b64encode(ct_bytes).decode('utf-8')
    result = json.dumps({'iv':iv, 'ciphertext':ct})
    print(result)
    resp=make_response(result)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Headers'] = "Origin, X-Requested-With, Content-Type, Accept"
    # print(msg)
    return resp

@app.route('/decrypt')
def decrypt():
    msg=request.args.get('msg')
    # msg=str(msg) 
    key=b'aaaaaaaaaaaaaaaa'
    b64 = json.loads(msg)
    iv = b64decode(b64['iv'])
    ct = b64decode(b64['ciphertext'])
    cipher = AES.new(key, AES.MODE_CBC, iv)
    pt = unpad(cipher.decrypt(ct), AES.block_size)
    print("The message was: ", pt)
    # print(result)
    resp=make_response(pt)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Headers'] = "Origin, X-Requested-With, Content-Type, Accept"
    # print(msg)
    return resp

@app.route('/sms')
def sms():
    g = geocoder.ip('me')
    url_to_hit = "https://www.fast2sms.com/dev/bulk"
    loc=[g.latlng[0],g.latlng[1]]
    querystring = {"authorization":"SpAench6zXZlebGIMH1Tnw41rl9SJwL0TEve75yp1kuVITkbZQOUz4HGFLfc","sender_id":"FSTSMS","message":"Cyber fraud has been detected at location ("+str(loc[0])+","+str(loc[1])+"). Require assistance at the earliest..","language":"english","route":"p","numbers":"9082420875"}

    headers = {
        'cache-control': "no-cache"
    }

    response = requests.request("GET", url_to_hit, headers=headers, params=querystring)
    return "sms"


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 9000))
    app.run(host='0.0.0.0', port=port,debug=True)
