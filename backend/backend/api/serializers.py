from rest_framework import serializers
from .models import User, Task

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

class TaskSerializer(serializers.ModelSerializer):
    assigned_to = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    
    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'status', 'assigned_to', 'due_date_time', 'start_date_time')

    def create(self, validated_data):
        return Task.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.status = validated_data.get('status', instance.status)
        instance.due_date_time = validated_data.get('due_date_time', instance.due_date_time)
        instance.start_date_time = validated_data.get('start_date_time', instance.start_date_time)
        instance.save()
        return instance
    
    def validate(self, data):
        due_date_time = data.get('due_date_time')
        start_date_time = data.get('start_date_time')
        
        if due_date_time <= start_date_time:
            raise serializers.ValidationError("Due date must be after the start date.")
        
        return data
