"""
cron: 32 9 * * *
new Env('华南理工大学自学考试公告');
"""
from turtle import title
import requests
from lxml import etree
import os
import sys


def load_send():
    global send
    cur_path = os.path.abspath(os.path.dirname(__file__))
    sys.path.append(cur_path)
    if os.path.exists(cur_path + "/sendNotify.py"):
        try:
            from sendNotify import send
        except:
            send = False
            print("加载通知服务失败~")
    else:
        send = False
        print("加载通知服务失败~")


load_send()


def getTopic():
    try:
        url = 'http://sce.scut.edu.cn/16915/list.htm'
        headers = {
            "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36"
        }
        response = requests.get(url=url, headers=headers)
        content = response.content.decode('utf-8')
        html = etree.HTML(content)
        topics = html.xpath(
            "//*[@id='wp_news_w3']/table/tr/td/div[@class='read']/div[@class='read_left']/div[@class='contentBox']/p[@class='title']/a"
        )
        message = ""
        for topic in topics:
            link = topic.xpath('./@href')
            title = topic.xpath('./@title')
            if (len(title) > 0):
                message += title[0] + "\n"
            if (len(link) > 0):
                message += "http://sce.scut.edu.cn/" + link[0] + "\n"
            message += "\n"
        send("自学考试公告通知", message)
        print(message)
    except:
        send("自学考试公告通知", "获取华南理工大学自学考试公告失败")


if __name__ == '__main__':
    try:
        getTopic()
    except:
        send("自学考试公告通知", "获取华南理工大学自学考试公告失败")