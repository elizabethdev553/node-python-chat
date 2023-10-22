from characterai import PyCAI
import os
import time

client = PyCAI("fd4a3e9cf8f9ab950e5cbed849342dbaf62e6ff2")

char = 'hZAO9ie2HH1V_JMKi00hlJeGLkOjYIWnhc5zIhGTSRU'

chat = client.chat.get_chat(char)

participants = chat['participants']

if not participants[0]['is_human']:
    tgt = participants[0]['user']['username']
else:
    tgt = participants[1]['user']['username']

query_old = ""
while True:
    time.sleep(2)
    try:
        with open("latest_input.txt", "r") as file:
            ques = file.read()
        file.close()
        with open("latest_input.txt", "w") as f:
            f.write("")
            f.close()

        if ques != query_old:
            print(ques)
            print("detected change in question file")
            print("requesting data")
            data = client.chat.send_message(char, ques, history_external_id=chat['external_id'], tgt=tgt)
            print("data acquired")
            name = data['src_char']['participant']['name']
            text = data['replies'][0]['text']
            print(text)

            with open("reply.txt", "w",encoding="utf-8") as file:
                file.write(text)

            query_old = ques

    except Exception as e:
        if e == "[Errno 2] No such file or directory: 'latest_input.txt'":
            pass
        else:
            print(f"An error occurred: {e}")
