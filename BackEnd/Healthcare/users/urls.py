from django.urls import path
from .views import RegisterView ,LoginView,UserView,LogoutView,SigninView
from oauth2_provider.views import TokenView


urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('user', UserView.as_view()),
    path('logout', LogoutView.as_view()),
    path('signin/<str:token>', SigninView.as_view(), name='signin'),
   path('oauth2/token', TokenView.as_view(), name='token'),



 ]