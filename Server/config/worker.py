from bullmq import Worker
import asyncio
import os
import signal
from datetime import datetime
from pymongo import MongoClient
from bson import ObjectId
from dotenv import load_dotenv;
load_dotenv()

redisUrl=os.getenv("redisUrl")

client = MongoClient("mongodb+srv://myank07official:Mayank%409550@mayank.jzywnhr.mongodb.net")
db = client["Mern_Stack_Project"]
mycol = db["taskmodels"]

print("running")

def dbUpdate(ans,taskId):
    query = {"_id": ObjectId(taskId)}
    mycol.update_one(query, {"$set": {"result": ans},"$push":{"logs":{"message":"Task Completed","timeStamp":datetime.now(),"status":"completed"}}})

async def process(job,job_token):
    text=job.data["input"]
    operation=job.data["operation"]

    query={"_id":ObjectId(job.data["taskId"])}
    mycol.update_one(query, {"$push":{"logs":{"message":"Processing Task","timeStamp":datetime.now(),"status":"running"}}})

    if(operation=="uppercase"):
        ans=text.upper()
        dbUpdate(ans,job.data["taskId"])
        
    elif(operation=="lowercase"):
        ans=text.lower()
        dbUpdate(ans,job.data["taskId"])

    elif(operation=="reverse"):
        text=job.data["input"]
        ans = text[::-1]
        dbUpdate(ans,job.data["taskId"])

    elif(operation=="wordCount"):
        ans=len(text.split())
        dbUpdate(ans,job.data["taskId"])
    
    elif(operation=="removeSpaces"):
        ans=text.replace(" ","")
        dbUpdate(ans,job.data["taskId"])
    
    elif(operation=="charCount"):
        ans=len(text)
        dbUpdate(ans,job.data["taskId"])

    print("job received !!")
    print(job.data)

async def main():
    print("worker running !!")
    worker = Worker("task",process,{"connection":redisUrl})
    await asyncio.Future()

if __name__ == "__main__":
    print("async run")
    asyncio.run(main()) 