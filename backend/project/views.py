from rest_framework import generics

from .models import Menu
from .serializers import MenuSerializer
from .models import Projectinfo
from .serializers import ProjectinfoSerializer
from .models import Slideimg
from .serializers import SlideimgSerializer
from .models import Searchtitle
from .serializers import SearchtitleSerializer

class ListMenu(generics.ListCreateAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

class DetailMenu(generics.RetrieveUpdateDestroyAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

class ListProjectinfo(generics.ListCreateAPIView):
    queryset = Projectinfo.objects.all()
    serializer_class = ProjectinfoSerializer

class DetailProjectinfo(generics.RetrieveUpdateDestroyAPIView):
    queryset = Projectinfo.objects.all()
    serializer_class = ProjectinfoSerializer

class CategoryProjectinfo(generics.ListCreateAPIView):
    serializer_class = ProjectinfoSerializer

    def get_queryset(self):
        # URL에서 카테고리 값을 가져와서 필터링
        category = self.kwargs['category']
        return Projectinfo.objects.filter(category__category=category)  # category는 외래키 필드 이름

class ListSlideimg(generics.ListCreateAPIView):
    queryset = Slideimg.objects.all()
    serializer_class = SlideimgSerializer

class DetailSlideimg(generics.RetrieveUpdateDestroyAPIView):
    queryset = Slideimg.objects.all()
    serializer_class = SlideimgSerializer

class CategorySlideimg(generics.ListCreateAPIView):
    serializer_class = SlideimgSerializer

    def get_queryset(self):
        # URL에서 카테고리 값을 가져와서 필터링
        projectinfo = self.kwargs['projectinfo']
        return Slideimg.objects.filter(projectinfo__id=projectinfo)

class ListSearchtitle(generics.ListCreateAPIView):
    queryset = Searchtitle.objects.all()
    serializer_class = SearchtitleSerializer

class DetailSearchtitle(generics.RetrieveUpdateDestroyAPIView):
    queryset = Searchtitle.objects.all()
    serializer_class = SearchtitleSerializer

class CategorySearchtitle(generics.ListCreateAPIView):
    serializer_class = SearchtitleSerializer

    def get_queryset(self):
        # URL에서 카테고리 값을 가져와서 필터링
        category = self.kwargs['category']
        return Searchtitle.objects.filter(category__category=category)