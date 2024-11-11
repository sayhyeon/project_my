from rest_framework import generics

from .models import Menu
from .serializers import MenuSerializer
from .models import Projectinfo
from .serializers import ProjectinfoSerializer
from .models import Slideimg
from .serializers import SlideimgSerializer
from .models import Searchtitle
from .serializers import SearchtitleSerializer
from .models import Inputnum
from .serializers import InputnumSerializer

from rest_framework.response import Response
import subprocess


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

class ListInputnum(generics.ListCreateAPIView):
    queryset = Inputnum.objects.all()
    serializer_class = InputnumSerializer

    # 데이터를 생성하는 부분에서 비즈니스 로직 추가 가능
    def perform_create(self, serializer):
        # 여기서 사용자의 입력을 받아서 처리할 수 있음
        input_value = self.request.data.get('num')
        projectinfo_id = self.request.data.get('projectinfo')
        

        # Projectinfo 객체 가져오기
        try:
            projectinfo = Projectinfo.objects.get(id=projectinfo_id)
            # print(projectinfo.file_url)
        except Projectinfo.DoesNotExist:
            return Response({"message": "Projectinfo를 찾을 수 없습니다."}, status=status.HTTP_400_BAD_REQUEST)

        if not input_value:
            return Response({"message": "입력값이 필요합니다."}, status=400)

        try:
            # 외부 Python 파일을 실행하고 입력값을 인자로 넘김
            
            result = subprocess.run(
                ['python3', projectinfo.file_url, str(input_value)],
                capture_output=True, text=True
            )
            # /root/project/code/project_lotto/lotto_ex.py
            
            if result.returncode != 0:
                
                return Response({"message": f"스크립트 실행 오류: {result.stderr}"}, status=500)

            # 스크립트 실행 결과 (stdout) 반환
            # 예: JSON 형식으로 결과 반환하는 경우
            
            output = result.stdout

            # 1. 줄바꿈을 기준으로 분리하고, 각 값을 리스트로 저장
            output_list = output.strip().split('\n')

            # 2. 마지막 값에 '+'를 추가하고 나머지 값은 그대로 유지
            formatted_output = ', '.join(output_list[:-1]) + ', +' + output_list[-1]
            
            inputnum = Inputnum.objects.create(
                projectinfo=projectinfo,  # Projectinfo 객체 설정
                num=input_value,           # 사용자 입력값 설정
                result=formatted_output    # 스크립트 실행 결과 설정
            )

            # 성공적으로 저장된 데이터를 직렬화하여 반환
            return Response(InputnumSerializer(inputnum).data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"message": f"서버 오류: {str(e)}"}, status=500)


class CategoryInputnum(generics.ListCreateAPIView):
    serializer_class = InputnumSerializer

    def get_queryset(self):
        # URL에서 카테고리 값을 가져와서 필터링
        projectinfo = self.kwargs['projectinfo']
        return Inputnum.objects.filter(projectinfo__id=projectinfo)

