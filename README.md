# BriteCoreDRT
A test deployment for Dynamic Insurance Risks Type

# Installation
In your project folder
```
virtualenv env
source ve/scripts/activate
pip install -r requirements.txt
django-admin startproject <projectname>
cd <projectname>test
```
If issues with mysqlclient library suitable for you system, download the mysqlclient wheel package and install manually with
```
pip install mysqlclient****.whl
```
THEN
```
pip install django-bcdrt
```
* Add "bcdrt" to your INSTALLED_APPS settings
```
    INSTALLED_APPS = [
        ...
        'bcdrt',
    ]
```
* Modify your urls file
```
from django.urls import path, include

urlpatterns = [
    ---
    path('', include('bcdrt.urls')),
    ---
]
```
Make Migrations to database
```
python manage.py makemigrations
python manage.py migrate
```
* Run Localhost
```
python manage.py runserver
```
App Installation is Complete
1. Create new Risk Types in the Django Admin app
2. Visit http://127.0.0.1:8000/ to subscribe to a risk type.
3. Visit http://127.0.0.1:8000/risks/ to get a specific risktype in Json
4. Visit http://127.0.0.1:8000/risks/(risktype) to get a specific risktype in Json

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

## Deployment (Zappa)
* Add AWS User Credentials (AWS CLI) [Note: Ensure that the roles as specified here are assigned to the user]
```
aws configure
AWS Access Key ID [****************GVEA]: <YOUR_AWS_ACCESS_KEY>
AWS Secret Access Key [****************VxPd]: <YOUR_AWS_SECRET_KEY>
Default region name [us-west-2]: 
Default output format [None]:
```
* Initialize Zappa
```
zappa init

What do you want to call this environment (default 'dev'): dev

AWS Lambda and API Gateway are only available in certain regions. Let's check to make sure you have a profile set up in one that will work.
We found the following profiles: eb-cli, cfe, and default. Which would you like us to use? (default 'default'): default

Your Zappa deployments will need to be uploaded to a private S3 bucket.
If you don't have a bucket yet, we'll create one for you too.
What do you want to call your bucket? (default 'zappa-*****'):

It looks like this is a Django application!
What is the module path to your projects's Django settings?
We discovered: *****.settings
Where are your project's settings? (default 'zapdj.settings'): 

You can optionally deploy to all available regions in order to provide fast global service.
If you are using Zappa for the first time, you probably don't want to do this!
Would you like to deploy this application globally? (default 'n') [y/n/(p)rimary]: n

Okay, here's your zappa_settings.json:

{
    "dev": {
        "aws_region": "us-west-2",
        "django_settings": "*****.settings",
        "profile_name": "default",
        "project_name": "*****",
        "runtime": "python3.*",
        "s3_bucket": "zappa-*****"
    }
}

Does this look okay? (default 'y') [y/n]: y
```
Deploy Project
```
zappa deploy dev
```
You'll need to your settings file and include the endpoint url in the Allowed Hosts List
```
ALLOWED_HOSTS = ['**************.us-west-2.amazonaws.com']
```
Update Project
```
zappa update dev
```
## Uploading Statics
* https://romandc.com/zappa-django-guide/walk_static/
## Using Deployment with Database
* https://www.codingforentrepreneurs.com/blog/rds-database-serverless-django-zappa-aws-lambda
## References
* Django: https://www.djangoproject.com/
* Using Amazon S3 to Store your Django Site's Static and Media Files: https://www.caktusgroup.com/blog/2014/11/10/Using-Amazon-S3-to-store-your-Django-sites-static-and-media-files/
* Static files - Django Official Documentation: https://docs.djangoproject.com/en/2.1/howto/static-files/
* Django - Zappa Guide: https://edgarroman.github.io/zappa-django-guide/
* Zappa : https://github.com/Miserlou/Zappa
* Django static asset w Zappa: https://docs.djangoproject.com/en/2.1/howto/static-files/

## Live Version
  - https://fd0osgpwb5.execute-api.us-west-2.amazonaws.com/bcdrt/