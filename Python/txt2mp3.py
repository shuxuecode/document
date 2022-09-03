
# pip install pyttsx3

import pyttsx3

text="测试一下文本转语音"

speaker = pyttsx3.init()
speaker.say(text)
speaker.runAndWait()
speaker.stop()

speaker.save_to_file(text, "D:/temp/txt2mp3.mp3")
speaker.runAndWait()