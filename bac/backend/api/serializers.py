from .models import *
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from datetime import date
from django.contrib.auth.models import User

# ya cheack kary ga ky user admin hai ya client hai 
class SerializerTokenObtainView(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        data['is_superuser'] = self.user.is_superuser
        data['is_staff'] = self.user.is_staff
        data['username'] = self.user.username
        data['user_type'] = self.get_user_type(self.user)

        return data
    
    def get_user_type(self,user):
        if user.is_superuser:
            return "superuser"
        elif user.is_staff:
            return "admin"
        else:
            return "Client"

# ya model create karny ka leya hai 
class SerializerClientUser(serializers.ModelSerializer):
#    yaha par username or passwrod ma write_only ka matlab ha ky sirf data recieve kar na hai na ka wapic wapis send karna 
    username=serializers.CharField(source="user.username", required=False)
    password=serializers.CharField(write_only=True , required=False)
    email=serializers.CharField(source="user.email",required=False)
    # readonly ka matlab hai ky user sirf data deakh sakta hai na k edit
    user_name = serializers.CharField(source="user.username" , required=False )
    user_email = serializers.CharField(source="user.email",required=False )
    admin_name = serializers.CharField(source="admin.username" , read_only=True)
    admin_id = serializers.IntegerField(source="admin.id", read_only=True)
    user_type = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Client_User
        fields = '__all__'
        read_only_fields = ['id', 'user', 'admin', 'Created_at']  

    # user profile ko update kary yani edit kary ka ley ahai 
    def update(self, instance, validated_data):
        user_data = validated_data.pop("user", {})
        auth_user = instance.user
        if auth_user:
            if "username" in user_data:
                auth_user.username = user_data["username"]
            if "email" in user_data:
                auth_user.email = user_data["email"]
            auth_user.save()

        instance.address = validated_data.get("address", instance.address)
        instance.city = validated_data.get("city", instance.city)
        instance.country = validated_data.get("country", instance.country)
        instance.bank = validated_data.get("bank", instance.bank)
        instance.accoutn = validated_data.get("accoutn", instance.accoutn)
        instance.user_number = validated_data.get("user_number", instance.user_number)
        instance.User_pic = validated_data.get("User_pic", instance.User_pic)
    
        instance.save()
        return instance

    def get_user_type(self, obj):
        user_obj = obj.user if obj.user else obj.admin
        if not user_obj:
            return "Unknown"
        if user_obj.is_superuser:
            return "SuperUser"
        elif user_obj.is_staff:
            return "Admin"
        return "Client User"

# product
class SerialiserProduct(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source="user.username")
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ["user"]

# reservation 
class SerializerReservation(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source="user.username")
    re_product_details = SerialiserProduct(source="re_product", read_only=True)
    # client_user = serializers.ReadOnlyField(source="c_user",read_only=True)
    class Meta:
        model=Reser_Product
        fields = "__all__"
        read_only_fields = ['user','client_profile']


# ya part remark ka leya hai 
class serializerRemark(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="user.username")
    class Meta:
        model = UserRemark
        fields = '__all__'
        read_only_fields = ['user']


#ya order
class SerialiserSubmit(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source="user.username")
    user_ID = serializers.ReadOnlyField(source="user.id")
    info = SerialiserProduct(source="product" ,read_only =True)

    admin = serializers.PrimaryKeyRelatedField(read_only=True)
    admin_name = serializers.ReadOnlyField(source="admin.username") 

    class Meta:
        model = SubmitForm
        fields = '__all__'
        read_only_fields = ['user', 'client_profile']

    
# ya message kaleya hai 
class SerializerMessage(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source="sender.username" , read_only=True)
    class Meta:
        model = Message
        fields = "__all__"
        read_only_fields = ['sender','client_profile']

# ya support portion hai 
class SerializerSupport(serializers.ModelSerializer):
    ord_data=SerialiserSubmit(source="order" ,read_only=True)
    product_data=SerialiserProduct(source="product" ,read_only=True)
    user_name = serializers.ReadOnlyField(source="user.username" , read_only=True)
    total_day  = serializers.IntegerField(read_only=True)
    admin_name = serializers.ReadOnlyField(source="admin.username", read_only=True)
    # ya message ka sry data ko access kar raha hai 
    message = SerializerMessage(source = "messages",read_only=True , many=True)
    
    class Meta:
        model = Support
        fields = "__all__"
        read_only_fields = ['user','client_profile']


# ya notification ka part hai
from django.utils.timesince import timesince

class serializerNotification (serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="receiver.username", read_only=True )
    order_id = serializers.ReadOnlyField(source="order.id", read_only=True )
    class Meta:
        model = Notification
        fields = '__all__'
        read_only_fields = ['receiver','order']

   