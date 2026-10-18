from django.db import models
import random
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import date,timedelta
# Create your models here.

# User Creation Modle
def ClientID ():
    return random.randint(10000,99999)

class Client_User(models.Model):
    # ik cliet ik profile 
    user= models.OneToOneField(User , on_delete=models.CASCADE , null=True , blank=True ,related_name='client_user')
    # ik admin 
    admin = models.ForeignKey(User,limit_choices_to={"is_staff":True , "is_superuser":False} ,on_delete=models.PROTECT ,related_name="admin_user")
   
    id = models.IntegerField(primary_key=True,editable=False,default=ClientID)
    address = models.CharField(max_length=1000,null=True,blank=True)
    User_pic = models.ImageField(upload_to="NewUser/", null=True,blank=False)
    gender = models.CharField(max_length=20 ,null=True, blank=True)
    city = models.CharField(max_length=200,null=True, blank=True)
    country = models.CharField(max_length=200,null=True, blank=True)
    bank = models.IntegerField(null=True, blank=True)
    user_number = models.PositiveIntegerField(unique=True,null=True,blank=True)
    accoutn = models.IntegerField(null=True, blank=True)
    Created_at = models.DateTimeField(auto_now_add=True)
    
    def save(self,*args,**kwargs):
        if not self.id:
            self.id = ClientID()
            while Client_User.objects.filter(id=self.id).exists():
                self.id = ClientID()
        super().save(*args,**kwargs)
    class Meta:
         verbose_name_plural ='Client_User'
    def __str__(self):
        if self.user:
            return self.user.username
        elif self.admin:
            return self.admin.username
        return "No User"
    
    def get_user_type(self):
        if self.user.is_superuser:
            return f"SuperUser"
        elif self.user.is_staff:
            return f"Admin"
        else:
            return f"Client User"
        
# from django.db.models.signals import post_save
# from django.dispatch import receiver
# @receiver (post_save , sender=Client_User)
# def Create_User_type (sender , instance ,created,**kwargs):
#     if created and not instance.user:
#         username = f"client :{instance.id}"
#         user = User.objects.create_user(
#             username=username,
#             email=f"{username}@example.com",
#             password= f"default@1234"
#         )
#         instance.user = user
#         instance.save()


Country_choices=[
    ('US', 'US'),
    ('UK', 'UK'),
    ('DE', 'DE'),
    ('IT', 'IT'),
    ('CA', 'CA'),
    ('ES', 'ES'),
    ('AUS', 'AUS'),
    ('JAPAN', 'JAPAN'),
    ('KSA', 'KSA'),
    ('UAE', 'UAE'),
    ('General', 'General'),
    ('FR', 'FR'),
    ('Mexico', 'Mexico'),
    ('Russia', 'Russia'),
    ('Sweden', 'Sweden'),
    ('Netherland', 'Netherland'),
    ('US-High Commission', 'US-High Commission'),
    ('Walmart-US', 'Walmart-US'),
    ('Turkey', 'Turkey'),
    ('Kindle Books', 'Kindle Books'),
    ('ETSY', 'ETSY'),
    ('Singapore', 'Singapore'),
    ('India', 'India'),
    ('Kindle US', 'Kindle US'),
    ('eBay US', 'eBay US'),
    ('Wlamart-CA', 'Wlamart-CA'),
    ('Ali Express', 'Ali Express'),
    ('Temu-US', 'Temu-US'),
    ('Otto-DE', 'Otto-DE'),
    ('Googl Reviews UK', 'Googl Reviews UK'),
    ('Taobao', 'Taobao'),
    ('TikTok UK', 'TikTok UK'),
    ('Wayfair UK', 'Wayfair UK'),
    ('Wayfair US', 'Wayfair US'),
    ('Brazil', 'Brazil'),
    ('TikTOk DE', 'TikTOk DE'),
]

Category_choices = [
    ("Baby Products", "Baby Products"),
    ("Electronics", "Electronics"),
    ("Expensive", "Expensive"),
    ("General", "General"),
    ("Health & Beauty", "Health & Beauty"),
    ("Gaming Product", "Gaming Product"),
    ("Fashion", "Fashion"),
    ("Mobile Accessories", "Mobile Accessories"),
    ("Pet Related", "Pet Related"),
    ("Home & Kitchen", "Home & Kitchen"),
]

Product_type = [
    ('Text Review', 'Text Review'),
    ('Top Reviewer', 'Top Reviewer'),
    ('no review', 'no review'),
    ('Feedback', 'Feedback'),
    ('Rating', 'Rating'),
    ('RAS', 'RAS'),
    ('RAO', 'RAO'),
    ('Seller Testing', 'Seller Testing'),
    ('Pic Review', 'Pic Review'),
    ('Vid Review', 'Vid Review'),
    ('None', 'None'),
    ('Deleted Review', 'Deleted Review'),
]

# ya random product number generate karny ka leya hai 
def Random_productID():
    return random.randint(10000,99999)

# ya product ko sumbit karny ka leya hai
class Product (models.Model):
    id = models.IntegerField(default=Random_productID,editable=False , primary_key=True)
    user=models.ForeignKey(User , on_delete=models.CASCADE , null=True , blank=True)
    keyword = models.CharField(max_length=1000)
    brand_name=models.CharField(max_length=100)
    amz_seller = models.CharField(max_length=100)
    country = models.CharField(choices=Country_choices,max_length=50)
    chiness_seller = models.CharField(max_length=50)
    category = models.CharField(choices=Category_choices,max_length=50)
    product_t = models.CharField(choices=Product_type, max_length=50)
    amz_pic = models.ImageField(upload_to='amz/')
    picture = models.ImageField(upload_to='other')
    min_value = models.IntegerField()
    adver_commission = models.IntegerField()
    selle_limit = models.IntegerField()
    overall_salle_limit = models.IntegerField()
    
    to_re = models.IntegerField(null=True , blank=True)
    original_to_re = models.IntegerField(null=True , blank=True)

    product_price= models.IntegerField()
    is_active = models.BooleanField(default=True)
    last_reset = models.DateTimeField(auto_now_add=True ,null=True , blank=True)
    date_time = models.DateField(auto_now_add=True ,null=True , blank=True)
    def save(self,*args,**kwargs):
        if not self.id :
            self.id = Random_productID()
            while Product.objects.filter(id=self.id).exists():
                self.id = Random_productID()
        super().save(*args,**kwargs)
    class Meta:
        verbose_name_plural ="Product"   
    def __str__(self):
        return f'ID{self.id}'

# ya random reservation number create karny ka leya hai 
def Reservation_ID():
    return random.randint(100000,999999)

# ya reservation kea leya hai 
class Reser_Product (models.Model):
    id=models.IntegerField(default=Reservation_ID ,editable=False , primary_key=True)
    user=models.ForeignKey(User,on_delete=models.SET_NULL,null=True,blank=True)
    client_profile = models.ForeignKey(Client_User, on_delete=models.CASCADE, null=True, blank=True)
   
    re_product = models.ForeignKey(Product,on_delete=models.CASCADE ,null=True , blank=True)
    expire_at = models.DateTimeField(blank=True , null=True)
    def save(self,*args,**kwargs):
        if not self.id:
            self.id = Reservation_ID()
            while Reser_Product.objects.filter(id=self.id).exists():
                self.id = Reservation_ID()
        if self._state.adding and not self.expire_at:
            self.expire_at = timezone.now() + timedelta(hours=2)
        
        super().save(*args,**kwargs)
    class Meta:
        verbose_name_plural="Reser_Product"


# ya random order number generate karny ka leya hai 
def Random_simple_id ():
    return random.randint(100000000,999999999)

# ya order ko submit  karny ka leya hai
class SubmitForm (models.Model):
    # random number generate karny ka leya
    id =  models.IntegerField(default= Random_simple_id , primary_key=True ,editable=False)
    # user configration ka leya hai
    user=models.ForeignKey(User , on_delete=models.CASCADE , null=True , blank=True)
    client_profile = models.ForeignKey(Client_User, on_delete=models.CASCADE, null=True, blank=True)
    admin = models.ForeignKey( User,  on_delete=models.SET_NULL,  null=True,  blank=True, related_name='admin_orders'
    )
    # product foreignkey
    product = models.ForeignKey(Product , on_delete = models.CASCADE ,blank=True , null=True)
    or_nu = models.IntegerField()
    cus_em_ad = models.EmailField()
    or_pic = models.ImageField(upload_to="Order_pic/")
    re_fund_pic = models.ImageField(upload_to="Refund_pic/" , null=True,blank=True)
    re_pic = models.ImageField(upload_to="Refund_pic/" , null=True,blank=True)
    amz_re_li = models.URLField(null=True,blank=True)
    remark = models.TextField(null=True,blank=True)
    order_status = models.CharField(max_length=50 , null=True, blank=True)    
    # add time part
    date_time = models.DateTimeField(auto_now_add=True ,null=True , blank=True)
    last_update = models.DateTimeField(auto_now=True ,null=True,blank=True)
    Reviewed_data = models.DateTimeField(null=True,blank=True)
    Refunded_date = models.DateTimeField(null=True,blank=True)
    
    def save(self,*args,**kwargs):
  
    # ya part randon id create or check karny ka leya hai
        is_new = False
        if not self.id :
            is_new = True
            self.id = Random_simple_id()
            while SubmitForm.objects.filter(id=self.id).exists():
                self.id = Random_simple_id()
    # auto time add fuction
        if not is_new:
            try:
               Old_record = SubmitForm.objects.get(pk=self.id)
               if Old_record != self.order_status:
                   current_time = timezone.now()
                   if self.order_status == "Reviewed":
                       self.Reviewed_data = current_time
                   elif self.order_status =="Refunded":
                       self.Refunded_date = current_time
                   
            except SubmitForm.DoesNotExist:
                is_new = True
                self.Reviewed_data = None
                self.Refunded_date = None
                self.last_update = None
                if self.order_status == "Ordered":
                    self.date_time = timezone.now()

        super().save(*args,**kwargs)
    class Meta:
        verbose_name_plural ="Order"   
    def __str__(self):
        return f'ID:{self.id}'

# remark save karny kaleya 
class UserRemark(models.Model):
    user = models.ForeignKey(User,on_delete=models.SET_NULL, null=True, blank=True)
    order = models.ForeignKey(SubmitForm, on_delete=models.CASCADE, related_name="remarks_history")
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True , null=True , blank=True)

# support model  
Problem = [
    ('refund_delay', 'Refund Delay'),
    ('commission_issue', 'Commission Issue'),
    ('less_refund', 'Less Refund'),
    ('wrong_refund_screenshot', 'Wrong Refund Screenshot'),
    ('dispute', 'Dispute'),
    # ya admin ka leya ha 
    ('product_returned_after_refund', 'Product Returned After Refund'),
    ('Product Availabilty', 'Product Availabilty'),
    ('negative_review', 'Negative Review'),
    ('other_issue', 'Other Issue')
]

def suppor_id():
    return random.randint(1000, 9999)

class Support (models.Model):
    user=models.ForeignKey(User , on_delete=models.CASCADE , null=True , blank=True)
    client_profile = models.ForeignKey(Client_User, on_delete=models.CASCADE, null=True, blank=True)
    admin = models.ForeignKey( User,  on_delete=models.SET_NULL,  null=True,  blank=True, related_name='support_admin')

    order = models.ForeignKey(SubmitForm,on_delete=models.CASCADE , blank=True , null=True)
    product = models.ForeignKey(Product,on_delete=models.CASCADE , blank=True , null=True)
    id = models.IntegerField(default=suppor_id , editable=False , primary_key=True)
    problem_status = models.CharField(choices=Problem , max_length=100,null=True , blank=True)
    subject = models.CharField(max_length=100 ,null=True , blank=True)
    is_read = models.BooleanField(default=False)
    admin_read = models.BooleanField(default=False)
    client_read = models.BooleanField(default=False)
    superuser_read = models.BooleanField(default=False) 
    Created_at = models.DateTimeField(auto_now_add=True)
    
    def save(self,*arg,**kwargs):
        if not self.id:
            self.id = suppor_id()
            while Support.objects.filter(id=self.id).exists():
                self.id = suppor_id()
        super().save(*arg,**kwargs) 

    @property 
    def total_day(self):
        if self.order and self.order.date_time:
            today_date = date.today()
            order_date = self.order.date_time.date() if isinstance(self.order.date_time , date) else self.order.date_time
            differnce = today_date - order_date
            return differnce.days
        return 0

    class Meta:
        verbose_name_plural="Support"
    def __str__(self):
          return f'ID:{self.id}'
    

class Message (models.Model):
    
    sender = models.ForeignKey(User , on_delete=models.CASCADE , null=True , blank=True)
    client_profile = models.ForeignKey(Client_User, on_delete=models.CASCADE, null=True, blank=True)
    
    support  = models.ForeignKey(Support , on_delete=models.CASCADE ,related_name='messages')
    prob_details = models.TextField(null=True , blank=True)
    support_image = models.ImageField(upload_to='Support image/' ,null=True , blank=True)
    pm_id =models.PositiveIntegerField(null=True , blank=True)
    created_at = models.DateTimeField(auto_now_add=True) 
    class Meta:
        verbose_name_plural = "Message"

from django.db.models.signals import post_save
from django.dispatch import receiver
class Notification (models.Model):
    receiver = models.ForeignKey(User , on_delete=models.CASCADE , null=True , blank=True)
    order = models.ForeignKey(SubmitForm,on_delete=models.CASCADE , blank=True , null=True)
    message = models.TextField(max_length=250)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return  f'Order ID:{self.order} -- Message{self.message}'
    
@receiver (post_save , sender=SubmitForm)
def Control (sender,instance,created,**kwargs,):
    if created:
        login_user = None
        if instance.client_profile and instance.client_profile.admin:
            login_user = instance.client_profile.admin
        else:
            login_user = User.objects.filter(is_superuser=True).first()
        if login_user:
            Notification.objects.create(
                receiver = login_user,
                order = instance,
                message = f'Order Created by user {instance.user.username}'
            )
    else:
        # status check karny kal eya
        status = instance.order_status if instance.order_status else "update"
        # admin ko nikalny ka leya 
        login_user =None
        if instance.client_profile and instance.client_profile.admin:
            login_user = instance.client_profile.admin
        else:
            login_user = User.objects.filter(is_superuser = True).first()
        # client  nikalny kaleya 
        current_user = None
        if instance.client_profile.user and instance.user:
            current_user = instance.client_profile.user
        else :
            current_user = instance.user
        
        # yaha par admin or client ka notification
        if status in ['Cancelled','Ordered','Reviewed']:   
            if login_user:
                Notification.objects.create(
                    receiver = login_user,
                    order = instance,
                    message = f'Order Updated by user {instance.user.username}'
                )
        else:
            if current_user :    
               status = instance.order_status if instance.order_status else 'Updated'
               Notification.objects.create(
                   receiver = current_user,
                   order = instance,
                   message = f'Order Update! Aapke Order ID {instance.id} ka status ab "{status}" ho gaya hai.'
               )
    