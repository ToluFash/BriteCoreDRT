from django.urls import path, re_path
from . import views

app_name = 'BriteCoreDRTs'
urlpatterns = [
    path('', views.AllRiskTypeView.as_view(), name='index'),
    path('<str:taipe>/', views.RiskTypeView.as_view(), name='get_risk_type')
]
