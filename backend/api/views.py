from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import generics, views
from .serializers import UserSerializer, UserActivitySerializer, RequestsSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import UserActivity, Requests
from django.utils import timezone
from django.db.models import Count
from datetime import timedelta

class UserProfileView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

class UserStatsView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        period = request.query_params.get("period", "week")
        user = request.user
        end_date = timezone.now().date()
        if period == "week":
            start_date = end_date - timedelta(days=7)
        elif period == "month":
            start_date = end_date - timedelta(days=30)
        else:  # day
            start_date = end_date - timedelta(days=1)

        stats = (UserActivity.objects
                 .filter(user=user, date__range=[start_date, end_date])
                 .values('date')
                 .annotate(count=Count('id'))
                 .order_by('date'))
        serializer = UserActivitySerializer(stats, many=True)
        return Response(serializer.data)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class CreateRequestView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        serializer = RequestsSerializer(data=data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # Associate request with authenticated user
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)