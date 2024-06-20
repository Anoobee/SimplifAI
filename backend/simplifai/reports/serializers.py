from rest_framework import serializers
from .models import Chats, Report, ReportText

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