
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import *



admin.site.unregister(User)

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    add_fieldsets = (
        (None, { 
            'fields': ('username','email', 'password1', 'password2', 'is_staff',),
        }),
    )
    fieldsets = UserAdmin.fieldsets
    list_display = UserAdmin.list_display

admin.site.register(Client_User)

admin.site.register(Reser_Product)

#ya product ka leya hai add new
@admin.register(Product)
class AdminProduct (admin.ModelAdmin):
    list_display=[
        'keyword',
        'brand_name',
        'amz_seller',
        'country',
        'chiness_seller',
        'category',
        'product_t',
        'min_value',
        'adver_commission',
        'selle_limit',
        'overall_salle_limit',
    ]

# ya order ma submit form ka leya hai Order create
@admin.register(SubmitForm)
class AdminSubmit (admin.ModelAdmin):
    list_display = [
        "or_nu",
        "cus_em_ad",
        "amz_re_li",
    ]

#ya suppor ka leya hai 
@admin.register(Support)
class Adminsupport(admin.ModelAdmin):
    list_display=[
        "id",
        "order",
        "problem_status"
    ]

admin.site.register(Message)
admin.site.register(Notification)
admin.site.register(UserRemark)
