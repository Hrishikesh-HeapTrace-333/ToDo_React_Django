from xml.dom import ValidationErr
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import User, Task
from .serializers import UserSerializer, TaskSerializer

@api_view(['GET', 'POST'])
def user(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
@api_view(['GET', 'PUT', 'DELETE'])
def user_byId(request, id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)
    
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    elif request.method == 'DELETE':
        user.delete()
        return JsonResponse({'message': 'User deleted successfully'}, status=204)

@api_view(['GET', 'POST'])
def task(request):
    if request.method == 'GET':
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
        try:
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return JsonResponse(serializer.data, status=201)
        except ValidationErr as e:
            return JsonResponse({'error': str(e)}, status=400)
        
@api_view(['GET', 'PUT', 'DELETE'])
def task_byId(request, id):
    try:
        task = Task.objects.get(id=id)
    except Task.DoesNotExist:
        return JsonResponse({'error': 'Task not found'}, status=404)
    
    if request.method == 'GET':
        serializer = TaskSerializer(task)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    elif request.method == 'DELETE':
        task.delete()
        return JsonResponse({'message': 'Task deleted successfully'}, status=204)
    
    
@api_view(['GET'])
def task_byUserId(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        tasks = Task.objects.filter(assigned_to_id=user_id)
        serializer = TaskSerializer(tasks, many=True)
        return JsonResponse(serializer.data, safe=False)
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)
    
@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    if username is None or password is None:
        return JsonResponse({'error': 'Username and password required'}, status=400)
    
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return JsonResponse({'error': 'User does not exist'}, status=404)
    try:
        user = User.objects.get(username=username, password = password)
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data, status=200)
    except :
        return JsonResponse({'error': 'Invalid credentials'}, status=401)
    
@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    
    if username is None or email is None or password is None:
        return JsonResponse({'error': 'All fields required'}, status=400)
    
    try:
        User.objects.get(username=username)
        return JsonResponse({'error': 'Username already exists'}, status=409)
    except User.DoesNotExist:
        user = User.objects.create(username=username, email=email, password=password)
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data, status=201)