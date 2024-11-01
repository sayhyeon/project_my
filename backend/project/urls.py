from django.urls import path

from . import views

urlpatterns = [
    path('', views.ListMenu.as_view()),
    path('<int:pk>/', views.DetailMenu.as_view()),
    path('projectinfo', views.ListProjectinfo.as_view()),
    path('projectinfo:<int:pk>/', views.DetailProjectinfo.as_view()),
    path('projectinfo:<str:category>/', views.CategoryProjectinfo.as_view()),
    path('projectimg', views.ListProjectimg.as_view()),
    path('projectimg:<int:pk>/', views.DetailProjectimg.as_view()),
]