#encoding:utf-8
import requests
import os
import socket
import socks
import json
import cookielib
import urllib,urllib2
from pyquery import PyQuery

def mkdir(path):
    # 去除左右两边的空格
    path=path.strip()
    # 去除尾部 \符号
    path=path.rstrip("\\")

    if not os.path.exists(path):
        os.makedirs(path)

    return path

def get_file(url):
    try:
        cj=cookielib.LWPCookieJar()
        opener=urllib2.build_opener(urllib2.HTTPCookieProcessor(cj))
        urllib2.install_opener(opener)

        req=urllib2.Request(url)
        operate=opener.open(req)
        data=operate.read()
        return data
    except BaseException, e:
        print e
        return None

def save_file(path, file_name, data):
    if data == None:
        return

    mkdir(path)
    if(not path.endswith("/")):
        path=path+"/"
    file=open(path+file_name, "wb")
    file.write(data)
    file.flush()
    file.close()

def save_file_retrieve(url , path , file_name):

    def cbk(count , block_size , total_size):
        print 'downloading %d%% total:%d , download:%d'%(100.0*count*block_size/total_size , total_size , count*block_size)

    mkdir(path)
    if(not path.endswith("/")):
        path=path+"/"

    urllib.urlretrieve(url , path+file_name ,cbk)
    pass

def check_file_exist(path , file_name):
    if(not path.endswith("/")):
        path=path+"/"
    return os.path.exists(path+file_name)

socks.set_default_proxy(socks.SOCKS5 , '127.0.0.1' , 7070)
# socket.socket = socks.socksocket

session = requests.session()

url='http://photo.sora.net/best/best_view.php?p_num=4398399&p_anum=281&p_option=img&p_page=1'

print 'opening :' + url

# resp = session.get(url)

doc = PyQuery(url=url)

cts = doc

# cts = doc('#MainCenterTable').find('a')#.contains('img')#.eq(1).children('table')#.eq(2).children('form').children('tr').

# for item in cts:
#     print PyQuery(item).attr('href')



print len(cts)

print cts

# print resp.content