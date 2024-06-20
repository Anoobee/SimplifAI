from django.urls import path
from . import views

urlpatterns = [
    path('upload_report/', views.ReportView.as_view(), name='upload_report'),
    path('get_report_lists/', views.get_report_lists, name='get_report_lists'),
    path('chat_message/', views.chat_message, name='chat_message'),
<<<<<<< HEAD
=======
    path('extract/', views.extract_text_from_image, name='extract'),

>>>>>>> 0bed02fb799eefd69cb0e4b42c96b1b11ba2293d
]