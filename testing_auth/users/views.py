# users/views.py
from django.views.decorators.csrf import csrf_exempt
from google.auth.transport.requests import Request
from google.oauth2 import id_token
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed
from .models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView


class GoogleLoginAPIView(APIView):
    permission_classes = [AllowAny]  # Leave it as it is

    """
    Please do modify the codes but not the logic.
    """

    def post(self, request):
        """
        Returns tokens for new or existing google users.
        NB: use it as templates for other social auth apps as well.

        :param request:(HttpRequest)
            - body:
                - access_token: (str)
        :return Response:(JsonResponse)
        """

        # Fetch the token from body data
        google_token = request.data.get('access_token')
        if not google_token:
            raise AuthenticationFailed('Token is missing')

        try:
            # Verify the token with Google
            idinfo = id_token.verify_oauth2_token(
                google_token, Request(), '1071218854822-l5gce0oia4rp7tv1mmo6gode8a2ae43e.apps.googleusercontent.com',
                clock_skew_in_seconds=10)

            # print(idinfo) if you need for info what google returns us back

            # Check if the user already exists
            user, created = CustomUser.objects.get_or_create(
                username=idinfo['email'],
                defaults={
                    'email': idinfo['email'],
                    'profile_picture': idinfo.get('picture', ''),
                    'email_verified': True,
                    'first_name': idinfo['name']
                }
            )

            # Checking if user exists
            # if user:
            #     print("exists")

            # If the user is new, we set up the user (fields such as username, email, etc. could be modified)
            if created:
                user.set_unusable_password()  # Since the user is logging in via Google, no password is set
                user.save()

            # Generate a JWT token
            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token

            # Do your magic here, I've done it for only testing.
            return Response({
                'access_token': str(access_token),
            })

        except ValueError as error:
            raise AuthenticationFailed(f'Error verifying Google token: {str(error)}')


class UserInfoAPI(APIView):

    """
    Test endpoint to see the token we return works after google sign in.
    Hit post man to see it in action
    """

    # Authentication class
    permission_classes = [IsAuthenticated]

    def get(self, request):

        """
        Return basic user data for verifying purpose only.
        :param request:(HttpRequest)
        :return Response:(JsonResponse)
        """

        return Response(
            {"user_email": request.user.email, "user_name": request.user.first_name, 'user_id': request.user.id
             }, status=status.HTTP_200_OK
        )