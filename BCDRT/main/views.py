from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.views import View
from django.core import serializers
from .models import RiskType, Field, NumberField, DateField, TextField
import json
from django.http import JsonResponse
import datetime


class IndexView(View):

    def get(self, request):
        return render(request, 'BriteCore/index.html')

class RiskTypeView(View):

    def get(self, request, taipe):
        risk_type = get_object_or_404(RiskType, slug=taipe).getDict()
        risk_type['fields'] = []
        for x in Field.objects.filter(risk_type=risk_type['id']):
            risk_type['fields'].append(x.getDict())
        return JsonResponse(risk_type)


class AllRiskTypeView(View):

    def get(self,request):
        risk_types = json.loads(serializers.serialize('json', RiskType.objects.all().exclude(slug='')))
        for x in risk_types:
            x['fields']['fields'] = json.loads(serializers.serialize('json', Field.objects.filter(risk_type=x['pk'])))
            fields = x['fields']
            fields2 = x['fields']['fields']
            fields['fields'] = []
            for y in fields2:
                del y['fields']['risk_type']
                fields['fields'].append(y['fields'])
            x.clear()
            x.update(fields)

        return JsonResponse(risk_types, safe=False)

    def post(self,request):
        post_data = json.loads(request.body)
        risk_type= get_object_or_404(RiskType, slug=post_data['slug'])
        new_risk_type = RiskType(title=risk_type.title)
        new_risk_type.save()
        for x in post_data['fields']:
            field_object = get_object_or_404(Field, slug=x['slug'], field_type=x['field_type'], risk_type=risk_type)
            new_field_object = Field(title=field_object.title, risk_type=new_risk_type, field_type=field_object.field_type)
            new_field_object.save()
            value = ""
            if field_object.field_type == 'Text':
                value = TextField(field=new_field_object, value=x['value'])

            if field_object.field_type == 'Number':
                value = NumberField(field=new_field_object, value=x['value'])

            if field_object.field_type == 'Date':
                value = DateField(field=new_field_object, value=x['value'])
            value.save()

        return HttpResponse('')





