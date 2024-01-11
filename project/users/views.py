# from django.shortcuts import render
# from django.http import JsonResponse
# from django.contrib.auth import authenticate, login
# from django.views.decorators.csrf import csrf_exempt
# from django.views.decorators.http import require_POST
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from .serializers import UserLoginSerializer
from django.contrib.auth import authenticate, login
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the home page!")

class UserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']

            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    #def get(self , requset):
            #return Response({"msg" : "hello"})


# @csrf_exempt
# @require_POST
# def login_user(request):
#     try:
#         # Get username and password from the request data
#         username = request.POST['username']
#         password = request.POST['password']

#         # Authenticate the user
#         user = authenticate(request, username=username, password=password)

#         if user is not None:
#             # User is valid, log them in
#             login(request, user)
#             return JsonResponse({'success': True, 'message': 'Login successful'})
#         else:
#             # User authentication failed
#             return JsonResponse({'success': False, 'message': 'Invalid username or password'})
    
#     except KeyError:
#         # Handle missing username or password in the request
#         return JsonResponse({'success': False, 'message': 'Username and password are required'})

