from rest_framework.serializers import serializers
from .models import Chats, Report

class ChatsSeializer(serializers.ModelSerializer):
    class Meta:
        model = Chats
        fields = "__all__"

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = "__all__"