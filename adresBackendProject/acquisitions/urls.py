from django.urls import path

from .views import AcquisitionListView, AcquisitionDetailView, AcquisitionCreateView, AcquisitionHistoryView


urlpatterns = [
    path('', AcquisitionListView.as_view()),
    path('<int:pk>/', AcquisitionDetailView.as_view()),
    path('create/', AcquisitionCreateView.as_view()),
    path('history/<int:pk>', AcquisitionHistoryView.as_view()),
]