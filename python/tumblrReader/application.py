#encoding:utf-8
import requests
import os
import socket
import socks
import json
import cookielib
import urllib,urllib2


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

'''
pid download list:
chinese-girls-pics
maswithayu
dajibazhuren
exposeugal
starking2015

#自拍
stickyexpertpeanut  160
huafox
zorassul
ellystrikeback
bonjwa1
asiansexycherry

upeverydate

usavich6969

moregoin
soranet
soranet19
91bit
subinpapa

misetendo

coolday123

bonjwa1
pht1911

dolltaengja

ratebaron
pht1911
nipsex

haoshezh1tu

图片:
    forchi
    nvxing
    shigyd
    cnmodels
    seaduox     400
    lloyppark
    yourbalmain  620
    fakecummy
    tuteman007
    exposeugal
    orientalfucktoys
    eeekou2
    hotasianslove
    greatwong
    jcstud
    cutensex
    loliuu  萝莉
    tatunosin  日本

    stockingssexy
    gookfucktoys
    ku777
    daddys-china-dolly
    chinesewhore

    superfinepussy
    schoolgirl2015
    love69sex69love

福利:
    fulibar
    fuliweb1
    woailu
    llp-fuli
    vaecneil
    original-stuffs
    qiubai 糗百
    fuliweb1 套图
    fuliweb2 AV
    fulid8

收集:
    zyydj

摄影师:
    wolfpupil
    yuxiliu
    morifisher
    lain-nil

模特:
    sjmtg

资源:
    guochanba
    mnzp
    captainslick
    lacerqqq


gif:
    gifchuchuba

个人:
    韩国:
        baby9249

    国内:
        nancymeng
        silviawong233 父女  20
        rummyhere
        impregnationale
        qiangwei-m
        dearmtj
        amanda5275-xiaozhu
        cream1988

    bitch:
        sexykatsy

种子:
    zzkd123

小说:
    pp880
    zhang186


'''

'''video

tom447
erica201578
woyaofa-186
jesee-64
uniqlox
kporns
yifumask
doubia

weipai5
fulidh
piapiapussy

gcllzj 乱伦专辑

    AV:
        mwgif

'''


# blogName = 'hello-happylim-blog'  #1120
# blogName = 'dys-s-scarlet'

# blogName = 'doltaengja'

# blogName = 'heisarah94'
# blogName = 'seanvil'
# blogName = 'chinese-girls-pics'
# blogName = 'nudes9'
# blogName = 'tangxing'
# blogName = 'originvision1980'
# blogName = 'madebai'
# start = 4460
# step = 20

# blogName='666convict'
# start=0
# step=20

# blogName='stickyexpertpeanut'
# start=160
# step=20

# blogName='cnporn'
# blogName = 'ktvhostess'

# blogName = 'temuermm'
# blogName = 'rummyhere' 440
# blogName = 'forchi' 80
# blogName = 'originvision1980'


#   自拍
#   publicdog99 20
#   ll0202  0
#   saoxiaomao 20
#   huabaobaobaby 18
#   miaotutu
#   y414385382  20
#   pennysexy
#   quyue520 60
#   0772nana
#   myselfiehk
#   lovlovumei  台湾
#   mugoujunjun
#   xiner 43
#   fourleafclover-miaomiao
#   lovemiaomiao0808
#   feiermm 20
#   omnibusrrr
#   aizhuo  (pic,video)
#   xiaowanzi-tang
#   sluttylittlehore
#   asainhole
#   thetoys 400
#   luckystarjay (pic,video)
#   heisarah94
#   queendanmo(pic,video) 淡漠
#   singer-m(pic,video)
#   onenightinbj 140
#   sexysarah2016
#   ivy-nana

#   摄影
#   ikkxx 100
#   wsyghf
#   hellotony12138
#   annatrinh69     460
#   nichotina

#   xiaoxiaoping
#   rummyhere
#   bijia403
#   seanyangxiang
#   k-porno
#   pussysushi
#   cnxholes
#   yeshentailove
#   htl69
#   joycessecrets
#   nafion1324
#   qinqin2015
#   forchi
#   hotwifeinwaiting
#   asianass2
#   exxo92
#   bigcandycandy
#   thorp2
#   sarwono88


blogName='hello-happylim-blog'


start=2760
step=20

# blogName = 'xxooshipin'

bigImgKey = 'photo-url-1280'

path = './data/'+blogName



# blogName = 'cnporn'
# start=190
# step=10

def spiderImg(blogName , start , step):

    path = '/Users/tonyjiang/Downloads/tumblrSpiderData/'+blogName +'/image/'

    global bigImgKey

    total=start+step


    while start<total:
        url = 'http://'+blogName+'.tumblr.com/api/read/json?type=photo&num=%d&start=%d' %(step,start)
        print ''
        print 'total is ' , total , ' current is ' , start

        print 'opening :' + url

        resp = session.get(url)

        print 'data is received'
        print resp.content

        respJsonStr = resp.content[resp.content.find('{'):resp.content.rfind('}')+1]

        respJsonObj = json.loads(respJsonStr)

        total=respJsonObj['posts-total']

        print respJsonObj

        for postItem in respJsonObj['posts']:
            print ''
            print 'current post id is : %d' % int(postItem['id'])
            index=0

            if len(postItem['photos']) == 0:

                picUrl = postItem[bigImgKey]
                suffix=picUrl[picUrl.rfind('.'):]
                fileName=str(postItem['id'])+'_%d' % index
                fileName=fileName+suffix
                index=index+1
                print '\tsaving '+fileName

                if  check_file_exist(path , fileName):
                    print '\tfile_exist '+fileName
                    continue

                save_file(path , fileName  , data=get_file(picUrl))

            else:

                for picItem in postItem['photos']:

                    picUrl = picItem[bigImgKey]
                    suffix=picUrl[picUrl.rfind('.'):]
                    fileName=str(postItem['id'])+'_%d' % index
                    fileName=fileName+suffix
                    index=index+1
                    print '\tsaving '+fileName

                    if  check_file_exist(path , fileName):
                        print '\tfile_exist '+fileName
                        continue

                    save_file(path , fileName  , data=get_file(picUrl))
                    pass



        start=start+step
        print 'next start should be ' , start


from HTMLParser import HTMLParser

class VideoSourceParser(HTMLParser):

    def __init__(self):
        HTMLParser.__init__(self)
        self.videos = []

    def handle_starttag(self , tag , attrs):
        if tag == 'source':
            if len(attrs) == 0:pass
            else :
                videoInfo = {}
                for(variable , value) in attrs:

                    if variable == 'src':
                        videoInfo['src'] = value
                    elif variable == 'type':
                        videoInfo['type'] = value

                print videoInfo
                self.videos.append(videoInfo)


def spiderVideo(blogName , start , step):

    path = '/Users/tonyjiang/Downloads/tumblrSpiderData/'+blogName +'/video/'

    total=start+step

    while start<total:
        url = 'http://'+blogName+'.tumblr.com/api/read/json?type=video&num=%d&start=%d' %(step,start)
        print ''
        print 'total is ' , total , ' current is ' , start

        print 'opening :' + url

        resp = session.get(url)


        respJsonStr = resp.content[resp.content.find('{'):resp.content.rfind('}')+1]

        print 'data is received' , respJsonStr

        respJsonObj = json.loads(respJsonStr)

        total=respJsonObj['posts-total']

        print respJsonObj

        for postItem in respJsonObj['posts']:
            print ''
            print 'current post id is :' + postItem['id']
            index=0

            htmlParser=VideoSourceParser()
            htmlParser.feed(postItem['video-player'])
            htmlParser.close()


            fileType=htmlParser.videos[0]['type']
            suffix=fileType[fileType.find('/')+1:]


            fileName=postItem['id']+'.'+suffix
            print '\tsaving '+fileName

            if  check_file_exist(path , fileName):
                print '\tfile_exist '+fileName
                continue


            save_file(path , fileName  , data=get_file(htmlParser.videos[0]['src']))
            # save_file_retrieve(htmlParser.videos[0]['src'],path ,fileName)
            pass

        start=start+step
        print 'next start should be ' , start


spiderImg(blogName , start , step)
# spiderVideo(blogName , start , step)