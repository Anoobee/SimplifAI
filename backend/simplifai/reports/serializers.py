from rest_framework import serializers
<<<<<<< HEAD
from rest_framework import routers, serializers, viewsets
from .models import Chats, Report
=======
from .models import Chats, Report, ReportText
>>>>>>> 0bed02fb799eefd69cb0e4b42c96b1b11ba2293d

class ChatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chats
        fields = "__all__"

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = "__all__"

class ReportTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportText
        fields = "__all__"