from django.urls import path
from .views import *
# CreatUpOrder,DestoryUpOrder
from rest_framework_simplejwt.views import TokenRefreshView



urlpatterns = [
    path('login/token/' , CustomTokenObtainView.as_view(),name="TokenObtainPairView"),
    path('token/refresh/',TokenRefreshView.as_view(),name="TokenRefreshView"),
    
    # ya part product category ko filter kar ka  show kary ka leya hai
    path('filterProduct/',FilterProduct.as_view(),name="FilterProduct"),

    # ya product ka leya hai
    path('product/', DefaultProductpage.as_view(), name='DefaultProductpage'),
    
    #ya product enable or disable karny ka leya hai ki api link hai
    path('api/', createApi.as_view(), name='createApi'),
    path('api/<int:pk>/', destoryApi.as_view(), name='destoryApi'),
    
    # ya product ky dtail show karwany ka leya hai
    path('details/<int:pk>/', ID_Details.as_view(), name='ID_Details'),
    
     #   ya reservation ka leya  hai 
    path('reservation/', CreateReservation.as_view(), name='CreateReservation'),
    path('reservation/<int:pk>/', DestroyReservation.as_view(), name='DestroyReservation'),
    
     # ya create order ka page hai
    path('submit/', createSubmitApi.as_view(), name='createSubmitApi'),
    path('submit/<int:pk>/', destorySubmitApi.as_view(), name='destorySubmitApi'),
    #  ya dashboard ka leya hai 
    path('dashboard/',Dashboard.as_view(), name="Dashboard"),
    #    ya part order ki secific id ko get karnay ka leya ha
    path('submitID/<int:pk>/', SubmitIDApi.as_view(), name='SubmitIDApi'),

    # ya part ordere ki category ko show karny ka liya hai 
    path('orderfilter/', FilterOrder.as_view(), name='FilterOrder'),

    # ya suppot ka leya ha 
    path('support/', User_support.as_view(), name='User_support'),
    path('support/<int:pk>/', Destroy_support.as_view(), name='Destroy_support'),
    # sepcific support id get karny ka leya 
    path('supportID/',supportID.as_view(),name="supportID"),
    # ya part message ka leya hai 
    path('message/', CreateMessage.as_view(), name='CreateMessage'),
    path('message/<int:pk>/', DestroyMessage.as_view(), name='DestroyMessage'),
    
    # ya Creat_User create karny ka leya hai 
    path('creat_user/', Creat_User.as_view(), name='Creat_User'),
    path('creat_user/<int:pk>/', Destory_User.as_view(), name='Destory_User'),
    
    # password update ka leya hai
    path('upDate/',Update_password.as_view(),name='Update_password'),

    # ya Notificaton ka leya hai 
    path('notificatoin/', LC_Notification.as_view(), name='LC_Notification'),
    path('notificatoin/<int:pk>/', DUR_Notification.as_view(), name='DUR_Notification'),

        
    #  path('login/', Adminapi , name='Adminapi'), 
]
