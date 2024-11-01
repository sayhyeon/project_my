from rest_framework import serializers
from .models import Menu
from .models import Projectinfo
from .models import Projectimg

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

        )
        model = Projectinfo

class ProjectimgSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'name',
            'img_title',
            'img1',
            'img2',
            'img3',
            'img4',
            'img5',
        )
        model = Projectimg
