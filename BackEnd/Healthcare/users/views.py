# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status
from .serializers import UserSerializer
from .models import User
import jwt
import datetime
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from django.shortcuts import get_object_or_404




class RegisterView(APIView):
    def post(self, request):
        print("Données reçues pour l'inscription:", request.data)
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print("Utilisateur enregistré:", serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Erreur de validation:", serializer.errors)  # Log errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Email does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        if not user.check_password(password):
            return Response({'error': 'Incorrect password!'}, status=status.HTTP_401_UNAUTHORIZED)

        payload = {
            'id': user.id,
            'name': user.name,  # Adding name
             'email': user.email,  # Adding email
             'age': user.age, 
             'role':user.role,
            'phone_number': user.phone_number, # Adding age
           'gender': user.gender,  # Adding gender (make sure this field exists in your User model)
           'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),  # Expiration time
          'iat': datetime.datetime.utcnow()  # Issued at time
        }

        token = jwt.encode(payload, settings.JWT_SECRET, algorithm='HS256')

        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True, secure=False)  # Set secure=True if using HTTPS
        response.data = {
            'message': 'Login successful',
            'jwt': token  # Optionally include the token in the response
        }
        return response




class UserView(APIView):

    def get(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, settings.JWT_SECRET, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token has expired!')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Invalid token!')

        user = get_object_or_404(User, id=payload['id'])
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request):
    # Retrieve the Authorization header
        auth_header = request.headers.get('Authorization')
        print("token", auth_header)
        
        if not auth_header or not auth_header.startswith('Bearer '):
            raise AuthenticationFailed('Unauthenticated!')

        # Extract the token from the Authorization header
        # Retrieve the Authorization header
        auth_header = request.headers.get('Authorization')
        print("token", auth_header)
        
        if not auth_header or not auth_header.startswith('Bearer '):
            raise AuthenticationFailed('Unauthenticated!')

        # Extract the token from the Authorization header
        token = auth_header.split(' ')[1]

        try:
            # Decode the token
            payload = jwt.decode(token, settings.JWT_SECRET, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token has expired!')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Invalid token!')

        # Get the user based on the token payload
        user = get_object_or_404(User, id=payload['id'])

        # Deserialize and validate the incoming data
        serializer = UserSerializer(user, data=request.data, partial=True)  # Allow partial updates
        if serializer.is_valid():
            serializer.save()  # Save the updated user information
            return Response(serializer.data, status=status.HTTP_200_OK)

        # If data is invalid, return validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        print("Request Headers", request.headers)
        
        # Get the Authorization header
        auth_header = request.headers.get('Authorization')
        
        if not auth_header or not auth_header.startswith('Bearer '):
            raise AuthenticationFailed('Unauthenticated!')

        # Extract the token from the Authorization header
        token = auth_header.split(' ')[1]
        print("Extracted Token", token)

        try:
            # Decode the token
            payload = jwt.decode(token, settings.JWT_SECRET, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token has expired!')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Invalid token!')

        # Get the user and delete
        user = get_object_or_404(User, id=payload['id'])
        user.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'Successfully logged out'
        }
        return response