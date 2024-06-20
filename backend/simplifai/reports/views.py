from django.views.decorators.csrf import csrf_exempt


from django.shortcuts import render
from django.http import JsonResponse
import json

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

def extract_text_from_image(response):
    # Use the imported function
   # original_path =  "/reports/media/439203378_2246428852367381_8682738345992858211_n.png"
    #image_path = original_path.replace("/reports", ".")
    if response.method == 'GET':
        print("Inside extract_text_from_image")
        get_ocr_result('media/hi.png')
        return JsonResponse({"extracted text": "text"})

#     original_path = "/reports/media/439203378_2246428852367381_8682738345992858211_n.png"
#     relative_path = original_path.replace("/reports", "")  # Remove '/reports' part
#     file_system_path = os.path.join(settings.MEDIA_ROOT, relative_path.lstrip('/'))  # Convert to file system path

#     text = get_ocr_result(file_system_path)
#     return JsonResponse({"extracted text": text})

# # Use the imported function
# import os
# from django.conf import settings
# from django.http import JsonResponse
# from .ocr.ocr import get_ocr_result


# def extract_text_from_image(request):
#     # Original path from your example
#     original_path = "/reports/media/439203378_2246428852367381_8682738345992858211_n.png"
    
#     # Remove the '/reports' part to get the relative path
#     relative_path = original_path.replace("/reports/", "")
    
#     # Print the relative path for debugging
#     print(f"Relative path: {relative_path}")
    
#     # Construct the full file system path using MEDIA_ROOT
#     file_system_path = os.path.join(settings.MEDIA_ROOT, relative_path.lstrip('/'))
    
#     # Print the file system path for debugging
#     print(f"File system path: {file_system_path}")
    
#     # Check if the constructed path is correct
#     if not os.path.exists(file_system_path):
#         return JsonResponse({"error": "File not found"}, status=404)
    
#     # Use the imported function to perform OCR
#     text = get_ocr_result(file_system_path)
    
#     return JsonResponse({"extracted text": text})