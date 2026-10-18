from rest_framework import generics
from .serializers import *
from .models import *
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated,AllowAny
from django.db.models import Q,Count
from rest_framework.exceptions import ValidationError,PermissionDenied
from rest_framework_simplejwt.views import TokenObtainPairView
from django.utils import timezone 
# Create your views here.

class Dashboard(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request , *args , **kwargs):
        login_user=self.request.user
        if login_user.is_superuser:
            order_queryset = SubmitForm.objects.all()

        elif login_user.is_staff:
            order_queryset = SubmitForm.objects.filter(admin=login_user)
        else:
            order_queryset = SubmitForm.objects.filter(client_profile__user=login_user)

        status = order_queryset.aggregate(
            total_order = Count('id',filter=(Q(order_status="Ordered"))),
            total_review = Count('id',filter=(Q(order_status="Reviewed"))),
            pending_review = Count('id',filter=(Q(order_status="Review Submitted Pending Refund"))),
            refunded = Count('id',filter=(Q(order_status="Refunded"))),
            ref_pen_revi = Count('id',filter=(Q(order_status="Pending"))),
            onhold = Count('id',filter=(Q(order_status="Onhold"))),
            review_delete = Count('id',filter=(Q(order_status="ReviewedDeleted"))),
            order_cen_pmm= Count('id',filter=(Q(order_status="Order Cancelled By PMM"))),
            cencelled = Count('id',filter=(Q(order_status="Cancelled"))),
            complete = Count('id',filter=(Q(order_status="Completed"))),
        )
        return Response(status)

# ya condition rendring ka leya hai 
class CustomTokenObtainView(TokenObtainPairView): 
    serializer_class = SerializerTokenObtainView

# Part 1 ya product ko enabel or disable part hai 
class createApi(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated] 
    serializer_class = SerialiserProduct

    def get_queryset(self):
        user=self.request.user
        if user.is_superuser:
            return Product.objects.all()  
        if user.is_staff:
            return Product.objects.filter(user=user)
        return Product.objects.none()
    def perform_create(self, serializer):
        user=self.request.user
        if not (user.is_staff or user.is_superuser):
            raise PermissionDenied("Only Admin can create products")
        serializer.save(user=user)
    
# ya product ki detail ka leya hai 
class ID_Details (generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = SerialiserProduct
    lookup_field = 'pk'

# Part 2 ya product par all product ko show karny ka liya
class DefaultProductpage (generics.ListAPIView):
    serializer_class = SerialiserProduct
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Product.objects.filter(is_active=True).order_by('?')
        
        if user.is_staff:
            return Product.objects.filter(user=user, is_active=True).order_by('?')
        
        return Product.objects.filter(is_active=True).order_by('?')
        
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class FilterProduct (generics.ListCreateAPIView):
    serializer_class =SerialiserProduct
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        category = self.request.query_params.get('category')   
        if category is not  None:
            queryset=Product.objects.filter(category__iexact=category)
        return queryset 

#ya reservation page ka leya hai
from django.db import transaction

class CreateReservation (generics.ListCreateAPIView):
    serializer_class = SerializerReservation
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        
        current_time  = timezone.now()
        Reser_Product.objects.filter(expire_at__lt=current_time).delete()
        if user.is_superuser:
            return Reser_Product.objects.all()
        
        if user.is_staff:
            return Reser_Product.objects.filter(client_profile__admin=user)
        else:
            return Reser_Product.objects.filter(client_profile__user=user)
    
    @transaction.atomic
    def perform_create(self, serializer):
        if self.request.user.is_staff  or self.request.user.is_staff:
            raise ValidationError({
                "error":"not reserved"
            })
        
        product = serializer.validated_data.get("re_product")

        already_reserved = Reser_Product.objects.filter(
            user=self.request.user,
            re_product=product
        ).exists()

        if product.to_re <= 0:
            raise ValidationError({
                 "error": "Product Out Of Stock"
            })

        if already_reserved:
            raise ValidationError({
                "error":"already exist"
            })
        
        try:
            user_profile = self.request.user.client_user
        except Exception:
            user_profile = None
 

        serializer.save(user=self.request.user,client_profile=user_profile )
        products = Product.objects.all()
        for p in products:
            if timezone.now() >= p.last_reset +timedelta(hours=12):
                p.to_re = p.original_to_re
                p.last_reset = timezone.now()
                p.save()

        # reservation minus
        product.to_re -= 1
        product.save()
        return Response({
               "message": "Reserved Successfully",
               "product": SerialiserProduct(product).data
               })

# ys reservation ko delete karny ka leya hai
class DestroyReservation(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SerializerReservation
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        
        if user.is_staff or user.is_superuser:
            return Reser_Product.objects.filter(client_profile__admin=user)
        
        return Reser_Product.objects.filter(user=user)
    

# ya product ka delete part hai
class destoryApi (generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = SerialiserProduct

    def get_queryset(self):
        user = self.request.user
        return Product.objects.filter(user=user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user) 


#ya order part hai
class createSubmitApi (generics.ListCreateAPIView):
    serializer_class = SerialiserSubmit
    permission_classes =[IsAuthenticated]

    def get_queryset(self):
        login_user=self.request.user

        if login_user.is_superuser:
            return SubmitForm.objects.all()
        
        if login_user.is_staff:
            return SubmitForm.objects.filter(admin=login_user)
        else:
            return SubmitForm.objects.filter(client_profile__user=login_user)
    
    def perform_create(self, serializer):
        login_user=self.request.user
        # client find
        try:
            user_profile = login_user.client_user
        except Exception:
            user_profile = None
        
        # admin find
        admin_user = None
        if user_profile and user_profile.admin:
            admin_user = user_profile.admin  # ✅ Client ka admin
        elif login_user.is_staff or login_user.is_superuser:
            admin_user = login_user

        #order save 
        order = serializer.save(user=login_user ,client_profile=user_profile , admin=admin_user)
        
        # reservation delete
        if hasattr(order, 'product') and order :
            Reser_Product.objects.filter(
                re_product = order.product,
                user=login_user
            ).delete()

# ya order ki specific id ko get karny ka leya hai 
class SubmitIDApi (generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SerialiserSubmit
    permission_classes =[IsAuthenticated]
    lookup_field = 'pk'
    
    def get_queryset(self):
        return SubmitForm.objects.all()
    
    def perform_update(self, serializer):
        serializer.save(user=self.request.user) 

# yaha sy order ka  filter shuru hota hai 
class FilterOrder(generics.ListAPIView):
    serializer_class = SerialiserSubmit
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user=self.request.user
        order_status = self.request.query_params.get('order_status')
        
        if user.is_superuser:
            queryset = SubmitForm.objects.all()
        
        elif user.is_staff:
            queryset = SubmitForm.objects.filter(admin=user)
        else:
            queryset = SubmitForm.objects.filter(client_profile__user=user)

        if order_status and order_status != '':
            queryset = queryset.filter(order_status__iexact=order_status)
        return queryset
    

# ya order ko up/des/re karny ka liya hai 
class destorySubmitApi (generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SerialiserSubmit
    permission_classes = [IsAuthenticated]    

    def get_queryset(self):
        user=self.request.user
        return SubmitForm.objects.filter(user=user)



from rest_framework.generics import GenericAPIView
# ya part password Update 
class Update_password(GenericAPIView):
    permission_classes = [IsAuthenticated]

    def patch(self,request):
        user = self.request.user
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        if not old_password or not new_password:
           return Response({
                "error":"Tamam fields lazmi hain"
           })
        if not user.check_password(old_password) :
            return Response ({
                "error":"New Password fields Khali hai"
            })
        user.set_password(new_password)
        user.save()
        return Response ({
            "success": "Change password"
        })
        

# ya Support ka leya hai ka leya hai 
class User_support(generics.ListCreateAPIView):
    serializer_class = SerializerSupport
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        
        if user.is_superuser:
            return Support.objects.all()
        
        if user.is_staff:
            return Support.objects.filter(admin=user) 
        else:
            return Support.objects.filter(client_profile__user=user)
    
    def perform_create(self, serializer):
        login_user = self.request.user
        # admin report create kar raha hai 
        if login_user.is_staff or login_user.is_superuser:
            # yaha par client_user ya related name hai client_user model 
            try:

                client_ID = login_user.client_user
            except:
                client_ID = None

            serializer.save(user=login_user , client_profile = client_ID , admin=login_user )
    #    client report create kar raha hai 
        else:
            try:
                client_profile = login_user.client_user
            except:
                client_profile = None
            admin_user = None

            if client_profile and client_profile.admin:
                admin_user = client_profile.admin
                
            serializer.save(
                user=login_user,
                client_profile=client_profile,
                admin=admin_user 
            )    
            


class Destroy_support(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SerializerSupport
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Support.objects.all()
        if user.is_staff:
            return Support.objects.filter(admin=user)
        return Support.objects.filter(client_profile__user=user)
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        user = request.user

        # Superuser
        if user.is_superuser:
            if not instance.superuser_read:
                instance.superuser_read = True
                instance.save(update_fields=["superuser_read"])

        # Admin
        elif user.is_staff:
            if not instance.admin_read:
                instance.admin_read = True
                instance.save(update_fields=["admin_read"])

        # Client
        else:
            if not instance.client_read:
                instance.client_read = True
                instance.save(update_fields=["client_read"])

        return super().retrieve(request, *args, **kwargs)

# ya support ki specific id ko show karny ka ley hai 
class supportID(generics.ListCreateAPIView):
    serializer_class = SerializerSupport
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user=self.request.user
        status = self.request.query_params.get('problem_status')
        if user.is_superuser:
            queryset = Support.objects.all()

        elif user.is_staff:
            queryset = Support.objects.filter(admin=user)
        else:
            queryset = Support.objects.filter(client_profile__user=user)

        if status is not None:
            queryset = Support.objects.filter(problem_status__iexact=status)
        return queryset
    

# ya message ka leya hai 
class CreateMessage(generics.ListCreateAPIView):
    serializer_class = SerializerMessage
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        sender=self.request.user
        ticket_id = self.request.query_params.get('id')

        if sender.is_superuser:
            if ticket_id:
                return Message.objects.filter(support_id=ticket_id)
            return Message.objects.all()
        
        if sender.is_staff:
            if ticket_id:
                return Message.objects.filter(support_id=ticket_id)
            return Message.objects.filter(support__admin=sender)
        if ticket_id:
            return Message.objects.filter(support_id=ticket_id, support__client_profile__user=sender)
        return Message.objects.filter(support__client_profile__user=sender)
    
    def perform_create(self, serializer):
        # is ma admin model ki id hai ya usernaem hai 
        login_user = self.request.user
        # is ma client model ki id hai
        client_id = getattr(login_user,'client_user',None)
        # acha to yaha par sender likha na wo 
        serializer.save(sender=login_user , client_profile=client_id)

class DestroyMessage(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SerializerMessage
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

    def get_queryset(self):
        sender=self.request.user
        if sender.is_superuser or sender.is_staff:
            return Message.objects.all()
        else:
             return Message.objects.filter(sender=sender)

# ya part Notificatoin ka hai 
class LC_Notification (generics.ListCreateAPIView):
    serializer_class = serializerNotification
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.is_superuser:
            return Notification.objects.all()

        return Notification.objects.filter(
            receiver=user
        )
       
        
class DUR_Notification (generics.RetrieveUpdateDestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = serializerNotification
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
       receiver=self.request.user
       if receiver.is_staff or receiver.is_superuser:
            return Notification.objects.filter(receiver=receiver)
       else:
            return Notification.objects.filter(receiver=receiver)


# ya client create karny ka leya hai
class Creat_User(generics.ListCreateAPIView):
    serializer_class = SerializerClientUser
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        login_user = self.request.user

        return Client_User.objects.filter(user=login_user)


class Destory_User(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SerializerClientUser
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        login_user = self.request.user

        if login_user.is_superuser:
            return Client_User.objects.all()

        return Client_User.objects.filter(user=login_user)

    def perform_update(self, serializer):
        serializer.save()
 
# # ya login ka part  hai
# @api_view (['POST'])
# def Adminapi (request):
#     username = request.data.get('username')
#     password = request.data.get('password')
#     user = authenticate(username=username, password=password)

#     if user is not None and user.is_staff:
#         return Response({
#             'message':'welcome back' ,
#             'username':user.username
#         },status=200)
#     else :
#         return Response ({
#             'message':'wrong password and user'
#         },status=400)