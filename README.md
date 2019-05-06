# BriteCoreDRT
A test deployment for Dynamic Insurance Risks Type

# Installation
In your project folder
```
virtualenv env
source env\scripts\activate
pip install -r requirements.txt
django-admin startproject <projectname>
cd <projectname>
```
If issues with mysqlclient, find the mysqlclient library suitable for your system, download the mysqlclient wheel package and install manually with
```
pip install mysqlclient****.whl
pip install -r requirements.txt
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
python manage.py createsuperuser
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
Prepare AWS IAM User, Role, and Policies for Zappa and Serverless Python
* https://www.codingforentrepreneurs.com/blog/aws-iam-user-role-policies-zappa-serverless-python

Add AWS User Credentials (AWS CLI) [Note: Ensure that the roles as specified here are assigned to the user]
```
aws configure
AWS Access Key ID [****************GVEA]: <YOUR_AWS_ACCESS_KEY>
AWS Secret Access Key [****************VxPd]: <YOUR_AWS_SECRET_KEY>
Default region name [us-west-2]: 
Default output format [None]:
```
Initialize Zappa
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
You'll need to edit your settings file and include the endpoint url in the Allowed Hosts List
```
ALLOWED_HOSTS = ['**************.us-west-2.amazonaws.com']
```
Update Project
```
zappa update dev
```
## Uploading Statics
Install Django S3 Storage
```
pip install django-s3-storage
```
Edit your settings.py file to include django-s3-storage
```
INSTALLED_APPS = (
          ...,
          'django_s3_storage',
     )
```
Configure Django-S3-Storage in settings.py
```
YOUR_S3_BUCKET = "name of bucket"

STATICFILES_STORAGE = "django_s3_storage.storage.StaticS3Storage"
AWS_S3_BUCKET_NAME_STATIC = YOUR_S3_BUCKET

# These next two lines will serve the static files directly 
# from the s3 bucket
AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % YOUR_S3_BUCKET
STATIC_URL = "https://%s/" % AWS_S3_CUSTOM_DOMAIN
```
Push your static files to the cloud
```
zappa update dev
zappa manage dev "collectstatic --noinput"
```
## Using Deployment with Database
Create RDS Database
* Go to AWS RDS
* Click "Create database"
* Select the option "Only enable options eligible for RDS Free Usage Tier" -- it should be at the bottom of the page
* Choose MySQL as the bindings for Django are simple.
* Ensure Free tier is selected. As of now, it's the db.t2.micro DB instance class. Using the Free tier while testing is highly recommended.

Add database settings
* DB instance identifier: zapdjangodb

* Master username: zapdjangouser

* Master password: 15422715-547f-4eec-93b5-faa4f90e1d48

* Confirm password: 15422715-547f-4eec-93b5-faa4f90e1d48

>>> The creation process will take several minutes
While it's creating, look for the following settings in the tab Details:

Get the following information after creation
* VPC:
* SECURITY GROUP:
* SUBNETS(Bottom 3): []
* ENDPOINT

Add the Security Group to Lambda
* Go to AWS Lamda
* Ensure your in the right region (I am using us-west-2 so it says Oregon in the top right next to Support and my name)
* Open sidebar, click Functions
* Navigate to your Zappa Deployment. 
* Scroll down to Network
* In VPC select the VPC of your RDS DB (done above)
* Add your Subnets (again from above).
* In Security groups be sure to use the same value as your Security groups above.
* Save settings.

Add Inbound/Outbound Rule to Security Group
* Go to AWS RDS
* Open sidebar, click Instances
* Select your db instance, ours is zapdjangodb
* Scroll to Details, under Security groups select your security group, ours is rds-launch-wizard-1 (sg-0cab7e25f83e3e46b)

* After that opens, click Inbound tab

* Click Edit
* Click Add Rule
* Fill in the Following
    * TYPE: All Traffic, 
    * Protocol: All, 
    * Port Range: All, 
    * Destination: ::/0
 * Repeat for Outbound Tab
 
Update Project Settings
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'name of database',
        'USER': 'username',
        'PASSWORD': 'password',
        'HOST': 'endpoint',
        'PORT': 3306,
    }
}
```

Add Zappa Django Utils to Project Settings
``` 
pip install zappa-django-utils
INSTALLED_APPS += ['zappa_django_utils']
```
Update zappa_settings.json
``` 
 {
    "dev": {
        """"",
        "vpc_config" : {
            "SubnetIds": ["subnet1", "subnet2", "subnet3"],
            "SecurityGroupIds": [ "securitygroup" ]
        }
    }
}
```
Update Deployment
``` 
zappa update dev
```

Run Migrations
``` 
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

## References
* Django: https://www.djangoproject.com/
* Using Amazon S3 to Store your Django Site's Static and Media Files: https://www.caktusgroup.com/blog/2014/11/10/Using-Amazon-S3-to-store-your-Django-sites-static-and-media-files/
* Static files - Django Official Documentation: https://docs.djangoproject.com/en/2.1/howto/static-files/
* Static files 2 - https://romandc.com/zappa-django-guide/walk_static/
* Django - Zappa Guide: https://edgarroman.github.io/zappa-django-guide/
* Zappa : https://github.com/Miserlou/Zappa
* Django static asset w Zappa: https://docs.djangoproject.com/en/2.1/howto/static-files/
* Database : https://www.codingforentrepreneurs.com/blog/rds-database-serverless-django-zappa-aws-lambda

## Live Version
  - https://fd0osgpwb5.execute-api.us-west-2.amazonaws.com/bcdrt/