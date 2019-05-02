from django.contrib import admin
from .models import RiskType
from .models import Field


class FieldInline(admin.TabularInline):
    model = Field
    extra = 1


class RiskTypeAdmin(admin.ModelAdmin):
    search_fields = ['title']
    list_filter = ['title']
    fieldsets = [
        ('General Information', {'fields': ['title', 'slug']})
    ]
    inlines = [FieldInline]


admin.site.register(RiskType, RiskTypeAdmin)
