from django.test import TestCase,Client
from .models import RiskType, Field, TextField, NumberField, DateField
import datetime
import json


class RiskTypeModelTests(TestCase):
    def setUp(self):
        RiskType.objects.create(title='Insurance1', slug='insurance_1')
        RiskType.objects.create(title='Insurance2', slug='insurance_2')
        Field.objects.create(title='Field 1', slug='field_1', field_type='Text',
                             risk_type=RiskType.objects.get(slug='insurance_1'))
        Field.objects.create(title='Field 2', slug='field_2', field_type='Number',
                             risk_type=RiskType.objects.get(slug='insurance_1'))
        Field.objects.create(title='Field 3', slug='field_3', field_type='Date',
                             risk_type=RiskType.objects.get(slug='insurance_1'))
        Field.objects.create(title='Field 1', slug='field_1', field_type='Text',
                             risk_type=RiskType.objects.get(slug='insurance_2'))
        Field.objects.create(title='Field 2', slug='field_2', field_type='Number',
                             risk_type=RiskType.objects.get(slug='insurance_2'))
        Field.objects.create(title='Field 3', slug='field_3', field_type='Date',
                             risk_type=RiskType.objects.get(slug='insurance_2'))



    def testRiskTypeWithNoFieldComposition(self):
        """
        Tests RiskType with no Fields
        """
        risk1 =RiskType.objects.get(slug='insurance_1')
        risk2 =RiskType.objects.get(slug='insurance_2')
        self.assertEqual(risk1.title, 'Insurance1')
        self.assertEqual(risk2.title, 'Insurance2')
        self.assertEqual(risk1.slug, 'insurance_1')
        self.assertEqual(risk2.slug, 'insurance_2')

    def testRiskTypeWithFieldComposition(self):
        """
        Tests RiskType with Fields
        """
        risk1 =RiskType.objects.get(slug='insurance_1')
        risk2 =RiskType.objects.get(slug='insurance_2')
        self.assertEqual(risk1.title, 'Insurance1')
        self.assertEqual(risk1.slug, 'insurance_1')
        for x in Field.objects.filter(risk_type=risk1):
            self.assertEqual(x.risk_type, risk1)
            self.assertNotEqual(x.risk_type, risk2)
        for x in Field.objects.filter(risk_type=risk2):
            self.assertEqual(x.risk_type, risk2)
            self.assertNotEqual(x.risk_type, risk1)

    def testRiskTypeWithFieldandFieldTypeComposition(self):
        """
        Tests RiskType with Fields and Field Types
        """
        risk1 =RiskType.objects.get(slug='insurance_1')
        risk2 =RiskType.objects.get(slug='insurance_2')
        TextField.objects.create(
            field=Field.objects.get(slug='field_1', risk_type=RiskType.objects.get(slug='insurance_1')), value='Hello')
        NumberField.objects.create(
            field=Field.objects.get(slug='field_2', risk_type=RiskType.objects.get(slug='insurance_1')), value=1)
        DateField.objects.create(
            field=Field.objects.get(slug='field_3', risk_type=RiskType.objects.get(slug='insurance_1')), value=datetime.date(2018, 12, 1))
        TextField.objects.create(
            field=Field.objects.get(slug='field_1', risk_type=RiskType.objects.get(slug='insurance_2')), value='Hello')
        NumberField.objects.create(
            field=Field.objects.get(slug='field_2', risk_type=RiskType.objects.get(slug='insurance_2')), value=1)
        DateField.objects.create(
            field=Field.objects.get(slug='field_3', risk_type=RiskType.objects.get(slug='insurance_2')), value=datetime.date(2018, 12, 1))
        self.assertEqual(risk1.title, 'Insurance1')
        self.assertEqual(risk1.slug, 'insurance_1')
        for x in Field.objects.filter(risk_type=risk1):
            self.assertEqual(x.risk_type, risk1)
            self.assertNotEqual(x.risk_type, risk2)
            for y in TextField.objects.filter(field=x):
                self.assertEqual(y.field, x)
                self.assertEqual(y.field.risk_type, risk1)
                self.assertNotEqual(y.field.risk_type, risk2)
                self.assertEqual(y.value, 'Hello')
            for y in NumberField.objects.filter(field=x):
                self.assertEqual(y.field, x)
                self.assertEqual(y.field.risk_type, risk1)
                self.assertNotEqual(y.field.risk_type, risk2)
                self.assertEqual(y.value, 1)
            for y in DateField.objects.filter(field=x):
                self.assertEqual(y.field, x)
                self.assertEqual(y.field.risk_type, risk1)
                self.assertNotEqual(y.field.risk_type, risk2)
                self.assertEqual(y.value, datetime.date(2018, 12, 1))
        for x in Field.objects.filter(risk_type=risk2):
            self.assertEqual(x.risk_type, risk2)
            self.assertNotEqual(x.risk_type, risk1)
            for y in TextField.objects.filter(field=x):
                self.assertEqual(y.field, x)
                self.assertEqual(y.field.risk_type, risk2)
                self.assertNotEqual(y.field.risk_type, risk1)
                self.assertEqual(y.value, 'Hello')
            for y in NumberField.objects.filter(field=x):
                self.assertEqual(y.field, x)
                self.assertEqual(y.field.risk_type, risk2)
                self.assertNotEqual(y.field.risk_type, risk1)
                self.assertEqual(y.value, 1)
            for y in DateField.objects.filter(field=x):
                self.assertEqual(y.field, x)
                self.assertEqual(y.field.risk_type, risk2)
                self.assertNotEqual(y.field.risk_type, risk1)
                self.assertEqual(y.value, datetime.date(2018, 12, 1))


class AllRiskTypeViewTests(TestCase):
    def setUp(self):
        RiskType.objects.create(title='Insurance1', slug='insurance_1')
        RiskType.objects.create(title='Insurance2', slug='insurance_2')
        Field.objects.create(title='Field 1', slug='field_1', field_type='Text',  risk_type=RiskType.objects.get(slug='insurance_1'))
        Field.objects.create(title='Field 2', slug='field_2', field_type='Number', risk_type=RiskType.objects.get(slug='insurance_1'))
        Field.objects.create(title='Field 3', slug='field_3', field_type='Date',  risk_type=RiskType.objects.get(slug='insurance_1'))
        Field.objects.create(title='Field 1', slug='field_1', field_type='Text',  risk_type=RiskType.objects.get(slug='insurance_2'))
        Field.objects.create(title='Field 2', slug='field_2', field_type='Number',  risk_type=RiskType.objects.get(slug='insurance_2'))
        Field.objects.create(title='Field 3', slug='field_3', field_type='Date',  risk_type=RiskType.objects.get(slug='insurance_2'))

    def testgetAllRiskType(self):
        c = Client()
        response = c.get('/risks/')
        self.assertIs(response.status_code, 200)


    def testpostRiskTypeWithNoFields(self):
        c = Client()
        response = c.post('/risks/', {'title': 'Insurance 1', 'slug': 'insurance_1', 'fields': []}, 'application/json')
        self.assertIs(response.status_code, 200)

    def testpostRiskTypeWithNoRisksTypePresent(self):
        c = Client()
        response = c.post('/risks/', {'title': 'Insurance 4', 'slug': 'insurance_4',
                                      'fields': [{'title': 'Field1', 'slug': 'field_1',
                                                  'field_type': 'Text', 'value': 'aa'}]}, 'application/json')
        self.assertEqual(response.status_code, 404)

    def testpostRiskTypeWithNoRisksTypeFieldsPresent(self):
        c = Client()
        response = c.post('/risks/', {'title': 'Insurance 1', 'slug': 'insurance_1',
                                      'fields': [{'title': 'Field6', 'slug': 'field_6',
                                                  'field_type': 'Text', 'value': 'aa'}]}, 'application/json')
        self.assertEqual(response.status_code, 404)

    def testpostRiskTypeWithTextFields(self):
        c = Client()
        response = c.post('/risks/', {'title': 'Insurance 1', 'slug': 'insurance_1',
                                      'fields': [{'title': 'Field1', 'slug': 'field_1',
                                                  'field_type': 'Text', 'value': 'aa'}]}, 'application/json')
        self.assertIs(response.status_code, 200)



    def testpostRiskTypeWithNumberFields(self):
        c = Client()
        response = c.post('/risks/', {'title': 'Insurance 1', 'slug': 'insurance_1',
                                      'fields': [{'title': 'Field2', 'slug': 'field_2',
                                                  'field_type': 'Number', 'value': 25}]}, 'application/json')
        self.assertIs(response.status_code, 200)



    def testpostRiskTypeWithDateFields(self):
        c = Client()
        response = c.post('/risks/', {'title': 'Insurance 1', 'slug': 'insurance_1',
                                      'fields': [{'title': 'Field3', 'slug': 'field_3',
                                                  'field_type': 'Date', 'value': '2012-05-12'}]}, 'application/json')
        self.assertIs(response.status_code, 200)



class RiskTypeViewTests(TestCase):

    def setUp(self):
        self.risk1 = RiskType.objects.create(title='Risk 1', slug='risk1')
        self.risk2 = RiskType(title='Risk 2', slug='risk2')

    def testgetRiskTypeValue(self):
        c = Client()
        response = c.get('/risks/'+self.risk1.slug+'/')
        self.assertEqual(response.json()['title'], self.risk1.title)
        self.assertEqual(response.json()['slug'], self.risk1.slug)
        print(response.json())

    def testgetRiskTypewithFields(self):
        field1 = Field(title='Field 1', slug='field_1', risk_type=self.risk1, field_type='Text')
        field2 = Field(title='Field 2', slug='field_2', risk_type=self.risk1, field_type='Number')
        field3 = Field(title='Field 3', slug='field_3', risk_type=self.risk1, field_type='Date')
        field1.save()
        field2.save()
        field3.save()
        c = Client()
        response = c.get('/risks/'+self.risk1.slug+'/')
        print(response.json())
        self.assertEqual(response.json()['title'], self.risk1.title)
        self.assertEqual(response.json()['slug'], self.risk1.slug)
        self.assertEqual(response.json(), {'id': 1, 'title': 'Risk 1', 'slug': 'risk1',
                                           'fields': [
                                               {'title': 'Field 1', 'slug': 'field_1', 'field_type': 'Text'},
                                               {'title': 'Field 2', 'slug': 'field_2', 'field_type': 'Number'},
                                               {'title': 'Field 3', 'slug': 'field_3', 'field_type': 'Date'}
                                           ]})


    def testgetRiskTypeNotAvailable(self):
        c = Client()
        response = c.get('/risks/'+self.risk2.slug+'/')
        self.assertEqual(response.status_code, 404)



