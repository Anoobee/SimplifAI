from django.views.decorators.csrf import csrf_exempt


from django.shortcuts import render
from django.http import JsonResponse
import json

from .serializers import ReportSerializer, ChatsSerializer
from .models import Report, Chats, ReportText
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .qa import QA
import argparse

qa = QA()

def parse_arguments():
    parser = argparse.ArgumentParser(description="Ask questions to your documents.")
    parser.add_argument("--no-rag", action='store_true', help="Get your answer without RAG")
    return parser.parse_args()


class ReportView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request):
        reports = Report.objects.all()
        serializer = ReportSerializer(reports, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        report_serializer = ReportSerializer(data=request.data)
        if report_serializer.is_valid():
            report = report_serializer.save()

            image_path = report.plot.path

            # image_path = image_path.replace('/reports/media/', '')

            # Extract text from image
            text = extract_text_from_image(image_path)

            print(text)
            
            ReportText.objects.create(report=report, text=text)
            
            text  = text + "\n Summarize the above text "

            response = qa._ask_non_rag(text)

            llm_response = {
                "text": response,
                "sender": "SimplifAI",
                "isUser": False
            }

            response_serializer = ChatsSerializer(data = llm_response)
            if response_serializer.is_valid():
                response_serializer.save()
                return JsonResponse(response_serializer.data, status=201)
            else:
                return JsonResponse(response_serializer.errors, status=400)


 

def get_report_lists(request):
    if request.method == 'GET':
        reports = Report.objects.all()
        report_data = [{'id': report.id,'date': report.date} for report in reports]
        return JsonResponse(report_data, safe=False)

    else:
        return JsonResponse({'message': 'Invalid Request'}, status=400)


def chat_message(request):
    if request.method == 'POST':
        # print(request.body)
        # return JsonResponse({'message':'got'})
        json_data = json.loads(request.body)
        
        body =  {
        "text": request.GET.get('text'),
        "sender": request.GET.get('sender'),
        "isUser": request.GET.get('isUser')
        }
        serializer = ChatsSerializer(data = json_data)
        
        if serializer.is_valid():
            serializer.save()
        else:
            return JsonResponse(serializer.errors, status=400)
   
        # args = parse_arguments()
        

        query = body['text']
        response = qa._ask_non_rag(query)



        llm_response = {
        "text": response,
        "sender": "SimplifAI",
        "isUser": False
        }

        response_serializer = ChatsSerializer(data = llm_response)
        if response_serializer.is_valid():
            response_serializer.save()
            return JsonResponse(response_serializer.data, status=201)
        else:
            return JsonResponse(response_serializer.errors, status=400)

        

    if request.method == 'GET':
        chats = Chats.objects.all()
        
        serializer = ChatsSerializer(chats, many=True )

        return JsonResponse(serializer.data, safe=False)


# Import the function
from .ocr import get_ocr_result
import os
from django.conf import settings
def extract_text_from_image(image_path):
    image_path = os.path.join(settings.MEDIA_ROOT, image_path)
    print(image_path)
    result = get_ocr_result(image_path)
    return result