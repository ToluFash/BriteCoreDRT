# BriteCoreDRT
A test deployment for Dynamic Insurance Risks Type
#Installation
In your project folder
```
virtualenv env
pip install -r requirements.txt
django-admin startproject <projectname>
```
If issues with mysqlclient library suitable for you system, download the mysqlclient wheel package and install manually with
```
pip install mysqlclient****.whl
```
THEN
```
pip install django-bcdrt
```
Add "bcdrt" to your INSTALLED_APPS settings
```
    INSTALLED_APPS = [
        ...
        'bcdrt',
    ]
```
Make Migrations to database
```.env
python manage.py makemigrations
python manage.py migrate
```
App  Installation is Complete
1. Visit http://127.0.0.1:8000/ to subscribe to a risk type.
2. Visit http://127.0.0.1:8000/risks/ to get a specific risktype in Json
3. Visit http://127.0.0.1:8000/risks/(risktype) to get a specific risktype in Json

Note: Ensure that your template and static Directories are properly set up
```.env


TEMPLATES = [
    {
        ---
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        ---
]


STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static")
]
```

## Live Version
  - https://fd0osgpwb5.execute-api.us-west-2.amazonaws.com/bcdrt/