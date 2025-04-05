from django.urls import path
from . import views

urlpatterns = [
    path("user/profile/", views.UserProfileView.as_view(), name="user-profile"),
    path("user/stats/", views.UserStatsView.as_view(), name="user-stats"),
    path("requests/create/", views.CreateRequestView.as_view(), name="create-request"),
    path("listings/create/", views.CreateListingView.as_view(), name="create-listing"),
]