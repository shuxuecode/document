#-*- coding:utf-8 -*-
import urllib2
import json
from numpy import *
def geograb(conameoradd):
    url = 'http://api.map.baidu.com/geocoder/v2/?address=%s&output=json&ak=ESj2OE2R61G6XuUTE7yI89QG'  %conameoradd
    c=urllib2.urlopen(url)
    dictt=json.loads(c.read())
    if dictt['status']==0:
        lat=dictt['result']['location']['lat']
        lng=dictt['result']['location']['lng']
        return lat,lng
    else:
        return -1,-1
    

#http://developer.baidu.com/map/index.php?title=webapi/guide/webservice-geocoding

from time import sleep
def massplacefind():
    f = open(r"companies.txt")
    for line in f.readlines():
        line = line.strip()
        lineArr = line.split('\t')
        lat,lng = geograb(lineArr[0])
        #print "%s\t%f\t%f" % (lineArr[0], lat,lng)
        fw = open(r"coordinatescity.txt",'a')
        fw.write('%s \t %f \t %f \t %s \t %s \t %s\n' % (lineArr[0], lat, lng, findcity(lat,lng)[0],findcity(lat,lng)[1],findcity(lat,lng)[2]))
        sleep(1)
    f.close()  
    
def dist(lata,lnga,latb,lngb):#Spherical Law of Cosines
        a = sin(lata*pi/180) * sin(latb*pi/180)
        b = cos(lata*pi/180) * cos(latb*pi/180) * \
                          cos(pi * (lngb-lnga) /180)
        return arccos(a + b)*6371.0 #pi is imported with numpy    
    
def findcity(lat,lng):
    f=open(r"citycoor.txt")
    for line in f.readlines():
        line=line.strip()
        line = line.split(' ')
        if lat-0.1<=float(line[4])<lat+0.1 and lng-0.1<=float(line[3])<lng+0.1:
            break
    return line[0],line[1],line[2]
   

    