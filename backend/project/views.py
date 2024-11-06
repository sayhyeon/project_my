from rest_framework import generics

from .models import Menu
from .serializers import MenuSerializer
from .models import Projectinfo
from .serializers import ProjectinfoSerializer
from .models import Projectimg
from .serializers import ProjectimgSerializer

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

class ListProjectimg(generics.ListCreateAPIView):
    queryset = Projectimg.objects.all()
    serializer_class = ProjectimgSerializer

class DetailProjectimg(generics.RetrieveUpdateDestroyAPIView):
    queryset = Projectimg.objects.all()
    serializer_class = ProjectimgSerializer

class CategoryProjectimg(generics.ListCreateAPIView):
    serializer_class = ProjectimgSerializer

    def get_queryset(self):
        # URL에서 카테고리 값을 가져와서 필터링
        projectinfo = self.kwargs['projectinfo']
        return Projectimg.objects.filter(projectinfo__id=projectinfo)