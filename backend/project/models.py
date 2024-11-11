from django.db import models

# Create your models here.
class Menu(models.Model):
    id = models.AutoField(primary_key=True)
    category = models.CharField(max_length = 30)
	
    class Meta:
	    db_table = 'menu' # db 내부에 테이블 이름 설정

    def __str__(self):
        return self.category  # 카테고리 이름 반환

class Projectinfo(models.Model):
    id = models.AutoField(primary_key=True)
    category = models.ForeignKey(Menu, on_delete=models.CASCADE)
    name = models.CharField(max_length = 30)
    viewcount = models.IntegerField()
    day = models.CharField(max_length = 30)
    file_url = models.CharField(max_length = 100)
    img_title = models.CharField(max_length = 100)
	
    class Meta:
	    db_table = 'projectinfo' # db 내부에 테이블 이름 설정
    
    def __str__(self):
        return self.name  # 프로젝트 이름 반환

class Slideimg(models.Model):
    id = models.AutoField(primary_key=True)
    projectinfo = models.ForeignKey(Projectinfo, on_delete=models.CASCADE)
    slide_img = models.CharField(max_length = 100) ##,null=True

    class Meta:
	    db_table = 'slideimg' # db 내부에 테이블 이름 설정

class Searchtitle(models.Model):
    id = models.AutoField(primary_key=True)
    category = models.ForeignKey(Menu, on_delete=models.CASCADE)
    search = models.CharField(max_length = 100) ##,null=True

    class Meta:
	    db_table = 'searchtitle' # db 내부에 테이블 이름 설정

class Inputnum(models.Model):
    id = models.AutoField(primary_key=True)
    projectinfo = models.ForeignKey(Projectinfo, on_delete=models.CASCADE)
    num = models.IntegerField(null=True) ##,null=True
    result = models.CharField(max_length = 100, null=True)

    class Meta:
	    db_table = 'inputnum' # db 내부에 테이블 이름 설정


    