from rest_framework import serializers
from .models import Menu
from .models import Projectinfo
from .models import Slideimg
from .models import Searchtitle
from .models import Inputnum

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'category',

        )
        model = Menu

class ProjectinfoSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'category',
            'name',
            'viewcount',
            'day',
            'file_url',
            'img_title',

        )
        model = Projectinfo

class SlideimgSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'projectinfo',
            'slide_img',
        )
        model = Slideimg

class SearchtitleSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'category',
            'search',
        )
        model = Searchtitle

class InputnumSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'projectinfo',
            'num',
            'result',
        )
        model = Inputnum
