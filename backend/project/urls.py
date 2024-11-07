from django.urls import path

from . import views

urlpatterns = [
    path('', views.ListMenu.as_view()),
    path('<int:pk>/', views.DetailMenu.as_view()),
    path('projectinfo', views.ListProjectinfo.as_view()),
    path('projectinfo:<int:pk>/', views.DetailProjectinfo.as_view()),
    path('projectinfo:<str:category>/', views.CategoryProjectinfo.as_view()),
    path('slideimg', views.ListSlideimg.as_view()),
    # path('projectimg/<int:pk>/', views.DetailSlideimg.as_view()),
    path('slideimg:<int:projectinfo>/', views.CategorySlideimg.as_view()),
    path('searchtitle', views.ListSearchtitle.as_view()),
    path('searchtitle:<str:category>/', views.CategorySearchtitle.as_view()),
]