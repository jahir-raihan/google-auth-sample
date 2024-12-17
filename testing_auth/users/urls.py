# users/urls.py
from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from .views import GoogleLoginAPIView, UserInfoAPI

urlpatterns = [
    path('auth/google/', GoogleLoginAPIView.as_view(), name='google-login'),
    path('user-info', UserInfoAPI.as_view(), name='user_info')
]
