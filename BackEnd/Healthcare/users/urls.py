from django.urls import path
from .views import RegisterView ,LoginView,UserView,LogoutView,SigninView
from oauth2_provider.views import TokenView


urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('user', UserView.as_view()),
    path('logout', LogoutView.as_view()),
    path('signin/<str:token>', SigninView.as_view(), name='signin'),
    path('token/refresh/', UserView.as_view(), name='refresh-token'),  # URL pour rafraîchir le token



 ]