<<<<<<< HEAD
from django.shortcuts import render
from django.http import JsonResponse

from .serializers import ReportSerializer, ChatsSerializer
from .models import Report, Chats
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status


class ReportView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request):
        reports = Report.objects.all()
        serializer = ReportSerializer(reports, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        report_serializer = ReportSerializer(data=request.data)
        if report_serializer.is_valid():
            report_serializer.save()

            return Response(report_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(report_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def get_report_lists(request):
    if request.method == 'GET':
        reports = Report.objects.all()
        report_data = [{'id': report.id,'date': report.date} for report in reports]
        return JsonResponse(report_data, safe=False)

    else:
        return JsonResponse({'message': 'Invalid Request'}, status=400)


def chat_message(request):
    if request.method == 'POST':
        serializer = ChatsSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'message' : 'Chat saved successfully'}, status=201)
        else:
            return JsonResponse(serializer.errors, status=400)

    if request.method == 'GET':
        chats = Chats.objects.all()
        
        serializer = ChatsSerializer(chats, many=True)

        return Response(serializer.data, safe=False)

=======
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

            image_path = image_path.replace('/reports/media/', '')

            # Extract text from image
            text = extract_text_from_image(image_path)

            print(text)

            ReportText.objects.create(report=report, text=text)

            return Response(report_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(report_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
        "chat_id": request.GET.get('chat_id'),
        "text": request.GET.get('text'),
        "sender": request.GET.get('sender'),
        "isUser": request.GET.get('isUser')
        }
        serializer = ChatsSerializer(data = json_data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'message' : 'Chat saved successfully'}, status=201)
        else:
            return JsonResponse(serializer.errors, status=400)

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
    result = get_ocr_result(image_path)
    return result
>>>>>>> 0bed02fb799eefd69cb0e4b42c96b1b11ba2293d
