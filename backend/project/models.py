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
	
    class Meta:
	    db_table = 'projectinfo' # db 내부에 테이블 이름 설정
    
    def __str__(self):
        return self.name  # 프로젝트 이름 반환

class Projectimg(models.Model):
    id = models.AutoField(primary_key=True)
    projectinfo = models.ForeignKey(Projectinfo, on_delete=models.CASCADE)
    img_title = models.CharField(max_length = 100)
    img1 = models.CharField(max_length = 100, null=True)
    img2 = models.CharField(max_length = 100, null=True)
    img3 = models.CharField(max_length = 100, null=True)
    img4 = models.CharField(max_length = 100, null=True)
    img5 = models.CharField(max_length = 100, null=True)
	
    class Meta:
	    db_table = 'projectimg' # db 내부에 테이블 이름 설정


    